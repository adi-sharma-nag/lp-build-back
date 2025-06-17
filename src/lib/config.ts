import { z } from 'zod'

const envSchema = z.object({
  VITE_GEMINI_API_KEY: z.string().default('AIzaSyCL8u9t3adQG_E38nJO531I4s5KZ2PHkyo')
})

export const env = envSchema.parse({
  VITE_GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY
})

export const config = {
  llm: {
    model: 'gpt-4-turbo-preview',
    temperature: 0.7,
    maxTokens: 1000,
  },
  embedding: {
    model: 'text-embedding-3-small',
    dimensions: 1536,
  },
  memory: {
    maxDocuments: 5,
    relevanceThreshold: 0.7,
  },
} as const