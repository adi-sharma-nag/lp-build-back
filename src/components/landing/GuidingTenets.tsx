import { Shield, Sparkles, Layers, ArrowRight } from 'lucide-react'

interface GuidingTenetsProps {
  onStartQuiz: () => void
}

export default function GuidingTenets({ onStartQuiz }: GuidingTenetsProps) {
  return (
    <section className="w-full relative overflow-hidden py-32 px-6 bg-gradient-to-br from-white via-primary-100/10 to-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-20" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-primary-50/20 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-gray-100/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-20 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent px-4 py-2">
            Guiding Tenets
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg mt-4 md:mt-6 px-4">
            Our core principles for building intelligent and trustworthy AI experiences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 md:gap-12 max-w-5xl mx-auto px-4">
          {tenets.map((tenet, index) => (
            <div 
              key={index}
              className="relative p-4 sm:p-6 md:p-8 rounded-xl border border-gray-200/50 bg-white/90 backdrop-blur-sm hover:border-primary-300/30 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-primary-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-primary-400">{tenet.icon}</div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">{tenet.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tenet.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <button
            onClick={onStartQuiz}
            className="group px-8 py-4 bg-white text-gray-900 rounded-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md border border-gray-200 hover:border-primary-100 text-lg font-medium mx-auto"
          >
            Try It Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

const tenets = [
  {
    icon: <Shield className="w-6 h-6 text-primary-400" />,
    title: "Compliance and Security",
    description: "Enterprise-grade security and compliance to protect customer data and maintain trust at every step."
  },
  {
    icon: <Sparkles className="w-6 h-6 text-primary-400" />,
    title: "Prompt Engineering and Process Expertise",
    description: "Precision-engineered prompts that deliver consistent, relevant, and strategically aligned responses."
  },
  {
    icon: <Layers className="w-6 h-6 text-primary-400" />,
    title: "Layered AI Scalability",
    description: "Progressive AI implementation from basic prompts to advanced fine-tuning for optimal results."
  }
]