import { useEffect, useState } from 'react'
import { getChatHistory, getChatHistoryContent } from '../lib/gemini'

export default function ChatHistory() {
  const [files, setFiles] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [content, setContent] = useState<any>(null)

  useEffect(() => {
    getChatHistory()
      .then(res => setFiles(res.chats || []))
      .catch(err => console.error(err))
  }, [])

  const loadContent = async (file: string) => {
    setSelected(file)
    try {
      const res = await getChatHistoryContent(file)
      setContent(res)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">Chat History</h1>
      <ul className="space-y-2">
        {files.map(f => (
          <li key={f}>
            <button className="text-blue-600" onClick={() => loadContent(f)}>{f}</button>
          </li>
        ))}
      </ul>
      {content && (
        <pre className="mt-4 bg-gray-100 p-4 rounded overflow-auto text-sm">
          {JSON.stringify(content, null, 2)}
        </pre>
      )}
    </div>
  )
}
