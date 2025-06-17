import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FeatureDetailsModalProps {
  feature: Feature | null
  onClose: () => void
}

interface Feature {
  id: string
  name: string
  description: string
  icon: any
  status: string
  details: {
    overview: string
    functionality: string[]
    benefits: string[]
    example?: string
  }
}

export default function FeatureDetailsModal({ feature, onClose }: FeatureDetailsModalProps) {
  if (!feature) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        />

        {/* Modal */}
        <div className="min-h-screen px-4 text-center">
          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="inline-block w-full max-w-2xl my-8 text-left align-middle transition-all transform bg-white rounded-2xl shadow-xl relative"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Header */}
            <div className="p-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.name}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Overview */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Overview</h4>
                <p className="text-gray-600">{feature.details.overview}</p>
              </div>

              {/* Functionality */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Key Functionality</h4>
                <ul className="space-y-2">
                  {feature.details.functionality.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Benefits</h4>
                <ul className="space-y-2">
                  {feature.details.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Example */}
              {feature.details.example && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Example</h4>
                  <p className="text-sm text-gray-600">{feature.details.example}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 pt-0">
              {feature.status === 'coming-soon' ? (
                <button
                  className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  disabled
                >
                  Coming Soon
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="w-full px-4 py-2 bg-gradient-to-r from-primary-400 to-primary-500 text-white rounded-lg hover:from-primary-500 hover:to-primary-600 transition-all font-medium shadow-lg shadow-primary-400/20 hover:shadow-xl hover:shadow-primary-400/30"
                >
                  Get Started
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}