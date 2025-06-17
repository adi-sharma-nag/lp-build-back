import { env } from '../config'
import type { ChatMessage } from '../gemini'

interface SuggestionResponse {
  suggestions: string[]
  metadata?: {
    confidence?: number
    processingTime?: number
  }
}

export class SuggestionsService {
  private apiKey: string | undefined
  private model: any // Gemini model instance

  constructor() {
    this.initModel()
  }

  private async initModel() {
    this.apiKey = env.VITE_GEMINI_API_KEY
    if (!this.apiKey) {
      console.warn('Gemini API key not found - suggestions will use fallback data')
      return
    }

    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const genAI = new GoogleGenerativeAI(this.apiKey!)
      
      this.model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 1.4,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        }
      })

      // Create a chat session
      this.model = this.model.startChat({
        history: [],
        generationConfig: {
          temperature: 1.4,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        }
      })
    } catch (error) {
      console.error('Failed to initialize Gemini model:', error)
    }
  }

  async getSuggestions(
    lastMessage: string,
    history: ChatMessage[] = []
  ): Promise<string[]> {
    try {
      if (!this.model) {
        return this.getFallbackSuggestions()
      }

      const prompt = this.buildPrompt(lastMessage, history)
      const result = await this.model.sendMessage(prompt)
      const response = await result.response
      const text = response.text()

      // Split by newlines and clean up
      return text
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^["'\d.\s-]+/, '').trim())
        .slice(0, 5)
    } catch (error) {
      // Log error but don't expose details to console
      console.debug('Using fallback suggestions due to API error')
      return this.getFallbackSuggestions()
    }
  }

  private buildPrompt(lastMessage: string, history: ChatMessage[]): string {
    return `

## Context
"${lastMessage}"

## Purpose & Task
Generate **5 natural follow-up questions** that feel like something a curious, knowledgeable person would genuinely ask next in this conversation. Root these questions in the context provided so they serve as “smart replies,” guiding the discussion naturally as friendly interview around **digital behavior**, **market trends**, and **cultural shifts** while maintaining a conversational flow.

---

## Example Exploration Areas
- Consumer behavior & preferences  
- Market dynamics & trends  
- Cultural & social shifts  
- Personal experiences  
- Values and beliefs  
- Future implications  

---

## Depth & Data
- Incorporate both **qualitative** (e.g., “What do you feel is driving this?”) and **quantitative** (e.g., “What % of your peers...?”) angles.  
- Progress from **surface-level observations** to **root causes** to **practical implications**.  
- Balance **anecdotal experiences** with **data-backed details** (feel free to reference statistics).  
- Shift from **personal experiences** to **broader industry or societal patterns**.

---

## Requirements
Each question should:
- explore a different facet 
- function on its own, not linked to others generated at all
- be natural and context-aware
- mix casual and analytical depth
- 40-80 characters per question
- Include both personal inquires and factual driven 
- Let the conversation deepen without forcing one path

---

## Format
Provide **5 lines**, each containing exactly **one prompt** (one follow-up question).  
Each prompt must be **60-120 characters** in length.
`
  }

  private getFallbackSuggestions(): string[] {
    const suggestions = [
      "How do you evaluate the effectiveness of omnichannel strategies?",
      "What metrics best capture evolving consumer preferences?",
      "How are social commerce dynamics shifting platform engagement?",
      "What role does authenticity play in brand-consumer relationships?",
      "How do you measure the impact of digital touchpoints?",
      "What patterns emerge in cross-generational shopping behaviors?",
      "How do cultural shifts influence purchase decision frameworks?",
      "What factors drive platform adoption in different demographics?",
      "How do you assess the ROI of social commerce initiatives?"
    ]
    return suggestions.sort(() => Math.random() - 0.5).slice(0, 5)
  }
}