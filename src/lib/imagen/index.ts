const IMAGEN_API_KEY = 'AIzaSyCL8u9t3adQG_E38nJO531I4s5KZ2PHkyo'

export async function generateImage(prompt: string): Promise<string> {
  const payload = {
    instances: [{ prompt }],
    parameters: { sampleCount: 1 }
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${IMAGEN_API_KEY}`

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  const result = await response.json()
  const predictions = result?.predictions
  if (!Array.isArray(predictions) || predictions.length === 0) {
    throw new Error('Unexpected API response')
  }

  const base64 = predictions[0]?.bytesBase64Encoded || predictions[0]?.content
  if (!base64) {
    throw new Error('Failed to extract image data')
  }
  return `data:image/png;base64,${base64}`
}
