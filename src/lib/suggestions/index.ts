import type { ChatMessage } from '../gemini'
import { sendToCloudFunction } from '../gemini'

export class SuggestionsService {
  constructor() {}

  async getSuggestions(
    lastMessage: string,
    _history: ChatMessage[] = []
  ): Promise<string[]> {
    try {
      const text = await sendToCloudFunction('suggestions', { query: lastMessage })

      return text
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^["'\d.\s-]+/, '').trim())
        .slice(0, 5)
    } catch (error) {
      console.debug('Using fallback suggestions due to API error')
      return this.getFallbackSuggestions()
    }
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
