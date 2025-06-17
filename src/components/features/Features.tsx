import { Brain, MessageSquare, Sparkles, Heart, ArrowRight, GitBranch } from 'lucide-react'

interface FeaturesProps {
  onStartQuiz: () => void
}

function Features({ onStartQuiz }: FeaturesProps) {
  return (
    <section id="features" className="w-full relative overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-10" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-gray-50/30 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary-50/20 to-transparent" />
      <div className="px-6 py-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent">
                Transform Your Market Understanding
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto px-4 text-sm sm:text-base">
                Get actionable insights from AI personas that understand your consumers' behavior
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-6xl mx-auto relative px-4">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-gradient-to-br from-purple-600/5 to-pink-500/5 rounded-full blur-3xl" />
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm hover:border-primary-300/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-primary-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <div className="text-primary-400">{feature.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <button
                onClick={onStartQuiz}
                className="group px-8 py-4 bg-gradient-to-r from-primary-300 to-primary-400 text-white rounded-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-xl shadow-primary-300/20 hover:shadow-2xl hover:shadow-primary-300/30 text-lg font-medium mx-auto"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Living Digital Personas",
    description: "Make confident decisions with AI personas that evolve with your market, revealing authentic customer behavior"
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Human Centric Data in Action",
    description: "More than just statistics - engage and build empathy with your audience"
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Behavior Intelligence",
    description: "Understand how customers really think and make decisions by mapping authentic digital behavior"
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: "Discover Opportuntities to Grow",
    description: "Discover untapped and nuanced insights about your most valuable customer segments"
  }
];

export default Features