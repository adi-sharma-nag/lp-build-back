import { FileText, Brain, ArrowRight, MessageSquare, Sparkles, Database } from 'lucide-react'

interface PersonaComparisonProps {
  onStartQuiz: () => void
}

function PersonaComparison({ onStartQuiz }: PersonaComparisonProps) {
  return (
    <section className="w-full relative overflow-hidden py-12 px-6 bg-gradient-to-br from-white via-gray-50/20 to-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-10" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-primary-50/20 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary-50/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent">
            The Evolution of Market Understanding
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Moving beyond static templates to dynamic, AI-powered market intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Static Personas Card */}
          <div className="group relative p-8 rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-gray-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            <div className="relative">
              <div className="aspect-[16/9] mb-4 rounded-xl overflow-hidden bg-gray-50 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/80 to-gray-50/80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-[280px] bg-white rounded-lg shadow-lg p-4">
                    <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100" />
                      <div className="space-y-1.5">
                        <div className="h-4 w-32 bg-gray-100 rounded" />
                        <div className="h-3 w-24 bg-gray-50 rounded" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-100 rounded w-full" />
                      <div className="h-3 bg-gray-100 rounded w-5/6" />
                      <div className="h-3 bg-gray-100 rounded w-4/6" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-50 to-transparent" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Static Personas
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Fixed templates that capture a single moment in time.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Point-in-Time Data</h4>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-3.5 h-3.5 text-gray-400 rotate-180" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">One-Way Communication</h4>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-3.5 h-3.5 text-gray-400 -rotate-90" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Fixed Insights</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Living Personas Card */}
          <div className="group relative p-8 rounded-2xl border border-primary-200/30 bg-white/80 backdrop-blur-sm hover:border-primary-300/50 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-primary-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            <div className="relative">
              <div className="aspect-[16/9] mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100/50 relative">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-[280px] space-y-3">
                    <div className="bg-white rounded-lg shadow-lg p-3 ml-auto max-w-[200px]">
                      <div className="space-y-1.5">
                        <div className="h-3 bg-primary-100 rounded w-full" />
                        <div className="h-3 bg-primary-100 rounded w-4/5" />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-3 max-w-[200px]">
                      <div className="space-y-1.5">
                        <div className="h-3 bg-primary-100 rounded w-full" />
                        <div className="h-3 bg-primary-100 rounded w-3/4" />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-3 ml-auto max-w-[200px]">
                      <div className="space-y-1.5">
                        <div className="h-3 bg-primary-100 rounded w-full" />
                        <div className="h-3 bg-primary-100 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-50 to-transparent" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Living Personas
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                AI-powered profiles that evolve through direct interaction.
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Real-Time Updates</h4>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-3.5 h-3.5 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Interactive Engagement</h4>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-3.5 h-3.5 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Adaptive Intelligence</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onStartQuiz}
            className="group px-8 py-4 bg-gradient-to-r from-primary-300 to-primary-400 text-white rounded-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-xl shadow-primary-300/20 hover:shadow-2xl hover:shadow-primary-300/30 text-lg font-medium mx-auto"
          >
            Try Living Personas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default PersonaComparison