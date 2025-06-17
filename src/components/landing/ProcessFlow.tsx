import { Search, GitMerge, Globe, Boxes, Code, RefreshCw, Sparkles } from 'lucide-react'

interface ProcessFlowProps {
  onStartQuiz: () => void
}

export default function ProcessFlow({ onStartQuiz }: ProcessFlowProps) {
  return (
    <section className="w-full relative overflow-hidden py-32 px-6 bg-gradient-to-br from-white via-gray-50/20 to-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-10 rotate-180" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-primary-50/10 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary-50/10 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      
      <div className="max-w-5xl mx-auto relative">
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent px-4">
            Our Process
          </h2>
          <p className="text-gray-600 max-w-2xl px-4 text-sm sm:text-base">
            How we build intelligent customer experiences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-4">
          {steps.map((step, index) => (
            <div key={index} className="group relative p-6 rounded-xl border border-gray-200/50 bg-white/80 backdrop-blur-sm hover:border-indigo-500/30 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-primary-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-primary-400">{step.icon}</div>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-sm font-medium text-primary-400">Step {index + 1}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Iterate Step */}
        <div className="mt-4 sm:mt-6 px-4">
          <div className="p-6 rounded-xl border border-gray-200/50 bg-white/80 backdrop-blur-sm hover:border-indigo-500/30 hover:shadow-xl transition-all duration-500 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <RefreshCw className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-primary-400">Continuous</span>
                  <h3 className="text-lg font-semibold text-gray-900">Iterate & Improve</h3>
                </div>
                <p className="text-gray-600 text-sm mt-1">Constantly refine and adapt based on real customer interactions and feedback</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 text-center">
          <button
            onClick={onStartQuiz}
            className="group px-8 py-4 bg-gradient-to-r from-primary-300 to-primary-400 text-white rounded-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-xl shadow-primary-300/20 hover:shadow-2xl hover:shadow-primary-300/30 text-lg font-medium mx-auto"
          >
            Start Now
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    icon: <Search className="w-6 h-6 text-primary-400" />,
    title: "Discover",
    description: "Gather rich insights from multiple data sources including social listening and behavioral patterns"
  },
  {
    icon: <GitMerge className="w-6 h-6 text-primary-400" />,
    title: "Synthesize",
    description: "Build semantic understanding of customer behaviors and preferences"
  },
  {
    icon: <Globe className="w-6 h-6 text-primary-400" />,
    title: "Contextualize",
    description: "Create meaningful experiences by anchoring responses in verified knowledge and context"
  }
]