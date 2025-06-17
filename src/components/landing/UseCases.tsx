import { Brain, MessageSquare, Database } from 'lucide-react'

interface UseCasesProps {
  onStartQuiz: () => void
}

function UseCases({ onStartQuiz }: UseCasesProps) {
  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-br from-white via-primary-50/10 to-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-10" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-primary-50/20 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-gray-50/30 to-transparent" />
      <div className="px-6 py-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent">
              Core Use Cases
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Unlock deeper insights and build stronger connections with your target audience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm hover:border-primary-300/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-primary-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <div className="text-primary-400">{useCase.icon}</div>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{useCase.title}</h3>
                    {useCase.inDevelopment && (
                      <span className="px-2 py-0.5 bg-primary-100/50 text-primary-500 text-xs font-medium rounded-full">
                        In Development
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">{useCase.description}</p>
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-300" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const useCases = [
  {
    icon: <Brain className="w-7 h-7" />,
    title: "Deep Customer Immersion",
    description: "Build genuine empathy with your target segments through dynamic, data-driven interactions that reveal authentic behaviors and motivations.",
    benefits: [
      "Real-time behavioral insights",
      "Authentic voice and perspectives",
      "Deep emotional understanding",
      "Cultural context awareness"
    ]
  },
  {
    icon: <MessageSquare className="w-7 h-7" />,
    title: "Early Message Testing",
    description: "Validate messaging and positioning strategies with AI personas trained on real market data before investing in full campaigns.",
    benefits: [
      "Rapid feedback cycles",
      "Authentic response patterns",
      "Contextual reactions",
      "Value proposition testing"
    ]
  },
  {
    icon: <Database className="w-7 h-7" />,
    title: "Living Market Data",
    inDevelopment: true,
    description: "Access continuously updated insights that evolve with your market, moving beyond static personas to capture real-time trends and shifts.",
    benefits: [
      "Real-time trend tracking",
      "Dynamic preference updates",
      "Behavioral pattern analysis",
      "Emerging opportunity alerts"
    ]
  }
]

export default UseCases