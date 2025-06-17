import { useState, useEffect } from 'react'
import { BarChart, LineChart, PieChart, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface ResearchDashboardProps {
  personaId: string
}

export default function ResearchDashboard({ personaId }: ResearchDashboardProps) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'patterns' | 'sentiment' | 'insights'>('patterns')
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">Research Dashboard</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('patterns')}
              className={`p-2 rounded-lg transition-colors ${
                activeTab === 'patterns' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <BarChart className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('sentiment')}
              className={`p-2 rounded-lg transition-colors ${
                activeTab === 'sentiment'
                  ? 'bg-primary-100 text-primary-600'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <LineChart className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`p-2 rounded-lg transition-colors ${
                activeTab === 'insights'
                  ? 'bg-primary-100 text-primary-600'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <PieChart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="space-y-4 text-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce [animation-delay:0.4s]" />
              </div>
              <p className="text-gray-500">Loading analytics...</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-300/30 transition-all hover:shadow-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Total Interactions
                </h3>
                <p className="text-3xl font-bold text-primary-600">
                  {data?.length || 0}
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-300/30 transition-all hover:shadow-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Avg. Response Time
                </h3>
                <p className="text-3xl font-bold text-primary-600">
                  {data?.length ? '1.2s' : '0s'}
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-300/30 transition-all hover:shadow-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Engagement Rate
                </h3>
                <p className="text-3xl font-bold text-primary-600">
                  {data?.length ? '94%' : '0%'}
                </p>
              </div>
            </div>

            {activeTab === 'patterns' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary-300/30 transition-all hover:shadow-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Recent Interactions
                  </h3>
                  <div className="space-y-4">
                    {data?.slice(0, 5).map((completion: any) => (
                      <div
                        key={completion.id}
                        className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-1 space-y-1">
                            <p className="text-sm text-gray-900 font-medium">
                              User: {completion.input}
                            </p>
                            <p className="text-sm text-gray-600">
                              Response: {completion.response}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(completion.created_at).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sentiment' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary-300/30 transition-all hover:shadow-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Sentiment Analysis
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm text-gray-600">Positive</div>
                      <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-400 rounded-full"
                          style={{ width: '65%' }}
                        />
                      </div>
                      <div className="w-12 text-sm text-gray-600">65%</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm text-gray-600">Neutral</div>
                      <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gray-400 rounded-full"
                          style={{ width: '25%' }}
                        />
                      </div>
                      <div className="w-12 text-sm text-gray-600">25%</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm text-gray-600">Negative</div>
                      <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-400 rounded-full"
                          style={{ width: '10%' }}
                        />
                      </div>
                      <div className="w-12 text-sm text-gray-600">10%</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary-300/30 transition-all hover:shadow-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Key Insights
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Common Topics</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">Shopping Habits</span>
                        <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">Sustainability</span>
                        <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">Social Media</span>
                        <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">Brand Values</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Key Behaviors</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary-400" />
                          High engagement with sustainability topics
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary-400" />
                          Strong preference for authentic brand communication
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary-400" />
                          Active cross-platform shopping behavior
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}