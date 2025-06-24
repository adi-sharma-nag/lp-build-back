from google.cloud import storage
import google.generativeai as genai
import functions_framework
import json
import base64
import datetime

genai.configure(api_key="AIzaSyCL8u9t3adQG_E38nJO531I4s5KZ2PHkyo")

def get_user_chat_history(username):
    folder_prefix = f"chats/{username}/"
    client = storage.Client()
    bucket = client.bucket("personas-bucket-test")

    # List blobs with the prefix (simulates folder check)
    blobs = list(bucket.list_blobs(prefix=folder_prefix))
    json_files = [blob.name for blob in blobs if blob.name.endswith(".json")]

    if json_files:
        return {"chats": json_files}
    else:
        return {"chats": []}

def read_file_from_gcs(bucketName,fileName):
    # Initialize GCS client
    client = storage.Client()
    bucket = client.bucket(bucketName)
    blob = bucket.blob(fileName)
    if blob.exists():
        try:
            return blob.download_as_text()
        except Exception as e:
            return f"Error reading file: {str(e)}", 500
    return {}

def upload_file_to_gcs(bucketName,fileName,updated_data):
    client = storage.Client()
    bucket = client.bucket(bucketName)
    blob = bucket.blob(fileName)
    blob.upload_from_string(json.dumps(updated_data, indent=2), content_type='application/json')


personaSystemInstruction = read_file_from_gcs("personas-bucket-test","avatars/avery-gen-z.txt")
FIRST_MSG = "Hey! 👋 I'm Avery. I'm a 23-year-old digital marketing professional with deep insights into Gen Z consumer behavior and hybrid shopping trends. Ask me anything or click on my profile picture to learn more about me!"


modelChat = genai.GenerativeModel(
                        model_name="gemini-1.5-pro",
                        generation_config={
                            "temperature": 1.0,
                            "top_p": 0.95,
                            "top_k": 40,
                            "max_output_tokens": 8192,
                        },
                        system_instruction=personaSystemInstruction
                    )
modelSuggest = genai.GenerativeModel(
                    model_name="gemini-1.5-flash",
                    generation_config= {
                            "temperature": 1.4,
                            "top_p": 0.95,
                            "top_k": 40,
                            "max_output_tokens": 8192,
                        }
                )
suggest = modelSuggest.start_chat(history=[])

def getFirstHistory():
    return [{
            "role": "assistant",
            "parts": [personaSystemInstruction]
        },{
            "role": "assistant",
            "parts": [FIRST_MSG]
        }]
    
def processChatRequest(username,query,historyFileName):
    outputResponse = {"chat" : "", "suggestions" : ""}
    oldHistoryChat = {}
    if query != "" : 
        fileContent = read_file_from_gcs("personas-bucket-test",f"chats/{username}/{historyFileName}")
        if (fileContent == {} or json.loads(fileContent)["chat-history"] == {}):
            oldHistoryChat = getFirstHistory()
        else :    
            record = json.loads(fileContent)
            oldHistoryChat = record["chat-history"]
        
        print(f"query {query} loaded history : {oldHistoryChat}")
        chat = modelChat.start_chat(history=oldHistoryChat)
        response = chat.send_message(query) 
        suggestionQuery = response.text
        outputResponse["chat"] = suggestionQuery
        oldHistoryChat.append({"role" : "user","parts" : [query]})
        oldHistoryChat.append({"role" : "assistant","parts" : [suggestionQuery]})

    
    else : 
        suggestionQuery = "Hey! 👋 I'm Avery. I'm a 23-year-old digital marketing professional with deep insights into Gen Z consumer behavior and hybrid shopping trends. Ask me anything or click on my profile picture to learn more about me!"
    ## getting suggestions
    suggestionsInstruction = read_file_from_gcs("personas-bucket-test","avatars/avery-suggestions-prompt.txt")
    suggestionsInstruction = suggestionsInstruction.replace("${lastMessage}",suggestionQuery)
    suggestResponse = suggest.send_message(suggestionsInstruction) 
    outputResponse["suggestions"] = suggestResponse.text
    
    historyRecord = {"chat-history" : oldHistoryChat,"suggestion-history" : suggestResponse.text}
    upload_file_to_gcs("personas-bucket-test",f"chats/{username}/{historyFileName}",historyRecord)
    return outputResponse

def returnSelectedHistory(username,historyFileName):
    return json.loads(read_file_from_gcs("personas-bucket-test",f"chats/{username}/{historyFileName}"))

def deleteSelectedHistory(username,historyFileName):
    try : 
        client = storage.Client()
        bucket = client.bucket("personas-bucket-test")
        blob = bucket.blob(f"chats/{username}/{historyFileName}")
        if blob.exists():
            blob.delete()
            return "success"
      
    except Exception as e:
        return "Error : " + str(e)
    
    return "failed"
        

def processRequest(username,request):
    print("Inside process request")
    try :
        request_json = request.get_json(silent=True)
        if request_json :
            secretKey = request_json['key']
            if secretKey != "Y7mA3rftGFrSSed87dXfK9Zq1VtPgUcY8WrQjN6e2Hxs" :
                return "Error!!! Unauthorized access."
            queryType = request_json['type'] 
            
            if (queryType == "chat") :
                query = request_json['query']
                historyFileName = request_json['historyFileName']
                return processChatRequest(username,query,historyFileName)
            elif (queryType == "history") :
                return get_user_chat_history(username)
            elif (queryType == "historyChatContent") :
                historyFileName = request_json['historyFileName']
                return returnSelectedHistory(username,historyFileName)
            elif (queryType == "delete-chat") :
                historyFileName = request_json['historyFileName']
                return deleteSelectedHistory(username,historyFileName)
            else :
                return "Error !!! Invalid query type!!!"
        else:
            return "Error !!! Invalid Query parsed"
    except Exception as e:
        return f"Error while processing request {str(e)}", 500


@functions_framework.http
def hello_http(request):
    try : 
        requestType = request.method
        print("Processing request type :  ",str(requestType))
        
        #####AUTHENTICATION
        if request.method == 'OPTIONS':
            return ('', 204, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            })
        
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
        auth = request.headers.get('Authorization')
        if not auth or not auth.startswith('Basic '):
            return (json.dumps({'error': 'Missing or invalid Authorization header'}), 401, headers)
    
        encoded_credentials = auth.split(' ')[1]
        decoded_credentials = base64.b64decode(encoded_credentials).decode('utf-8')
        username, password = decoded_credentials.split(':')
    
        if username != 'srk' or password != 'test':
            return (json.dumps({'error': 'Invalid credentials'}), 403, headers)
        #####AUTHENTICATION ENDS
        
        finalResponse = processRequest(username,request)
        
        print("Sending final response : ",str(finalResponse))
        return (json.dumps({"response": finalResponse}), 200, headers)

    except Exception as e:
        return (json.dumps({"response": str(e)}), 500, headers)
