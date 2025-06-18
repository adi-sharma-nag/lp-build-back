import { sendToCloudFunction } from '../gemini'

export async function generateImage(prompt: string): Promise<string> {
  const result = await sendToCloudFunction('generate-image', { prompt })
  const image = result?.image
  if (!image) {
    throw new Error('Unexpected API response')
  }
  return image
}
