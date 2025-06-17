import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, Globe, MessageSquare, Pencil, Radio, LayoutDashboard, Database } from 'lucide-react'
import FeatureDetailsModal from '../components/features/FeatureDetailsModal'

interface Feature {
  id: string
  name: string
  description: string
  icon: any
  status: string
  route: string
  details: {
    overview: string
    functionality: string[]
    benefits: string[]
    example?: string
  }
}

const features = [
  {
    id: 'persona-chat',
    name: 'Persona Chat',
    description: 'Interact with personas through natural conversation',
    icon: MessageSquare,
    status: 'active',
    route: '/dashboard',
    details: {
      overview: 'Engage in natural conversations with AI-powered personas to gain deep insights into customer motivations, test messaging, and build empathy.',
      functionality: [
        'Natural language interface for persona interaction',
        'Multi-turn conversation support',
        'Context-aware responses',
        'Scenario simulation capabilities',
        'Group chat with multiple personas'
      ],
      benefits: [
        'Develop deeper understanding of customer needs',
        'Test and refine marketing messages quickly',
        'Build team empathy with customer segments',
        'Validate assumptions through direct interaction'
      ],
      example: 'Chat with a persona to understand their concerns about a new product and test different value propositions in real-time.'
    }
  },
  {
    id: 'persona-generation',
    name: 'Persona Generation',
    description: 'Create dynamic, AI-powered personas from multiple data sources',
    icon: Brain,
    status: 'coming-soon',
    route: '/persona-generation',
    details: {
      overview: 'Our core feature automatically creates Living Personas from diverse data sources, leveraging AI to analyze patterns and synthesize comprehensive, dynamic persona profiles.',
      functionality: [
        'Automated data ingestion from CRM, marketing automation, web analytics, and social listening',
        'AI-powered persona creation using advanced language models',
        'Continuous refinement based on new data and feedback',
        'From-scratch persona generation with AI guidance',
        'Import & transform existing static personas into dynamic profiles'
      ],
      benefits: [
        'Save time and resources compared to traditional persona creation',
        'Ensure personas stay current with latest market data',
        'Gain comprehensive understanding of customer segments',
        'Enable personalization at scale'
      ],
      example: 'Generate a detailed persona profile within hours by analyzing data from multiple sources, creating a living representation of your target audience.'
    }
  },
  {
    id: 'persona-localization',
    name: 'Persona Localization',
    description: 'Adapt personas for specific regions and cultural contexts',
    icon: Globe,
    status: 'coming-soon',
    route: '/persona-localization',
    details: {
      overview: 'Adapt existing Living Personas to specific regions and cultural contexts, going beyond simple translation to incorporate cultural nuances and local market trends.',
      functionality: [
        'Intelligent language translation and cultural adaptation',
        'Integration of local market data and trends',
        'Cultural context analysis and modification',
        'Expert review system for local validation',
        'Regional behavior pattern analysis'
      ],
      benefits: [
        'Ensure marketing resonates with local audiences',
        'Improve campaign effectiveness in international markets',
        'Reduce risk of cultural missteps',
        'Create truly localized customer understanding'
      ],
      example: 'Transform a global persona into a culturally-relevant APAC version, incorporating regional values and behaviors.'
    }
  },
  {
    id: 'content-studio',
    name: 'Content Studio',
    description: 'Create and manage persona-optimized content',
    icon: Pencil,
    status: 'coming-soon',
    route: '/content-studio',
    details: {
      overview: 'A comprehensive suite of tools for creating, managing, and optimizing content specifically tailored to your personas.',
      functionality: [
        'AI-powered content recommendations',
        'Tone and voice guidance system',
        'Pre-built persona-specific templates',
        'Content effectiveness scoring',
        'CMS integration with major platforms'
      ],
      benefits: [
        'Improve content relevance and engagement',
        'Ensure consistent messaging across channels',
        'Streamline content creation workflow',
        'Increase content marketing ROI'
      ],
      example: 'Generate blog post ideas tailored to a specific persona, with guidance on tone, style, and optimal content structure.'
    }
  },
  {
    id: 'social-listening',
    name: 'Social Listening',
    description: 'Monitor conversations and trends for each persona',
    icon: Radio,
    status: 'coming-soon',
    route: '/social-listening',
    details: {
      overview: 'Advanced social media monitoring focused on your specific personas, providing real-time insights into conversations, trends, and behaviors.',
      functionality: [
        'Targeted social media monitoring',
        'AI-powered sentiment analysis',
        'Trend identification and tracking',
        'Vector-based semantic analysis',
        'Real-time reporting and alerts'
      ],
      benefits: [
        'Gain real-time insights into customer opinions',
        'Identify emerging trends and opportunities',
        'Enable proactive customer engagement',
        'Inform content and marketing strategies'
      ],
      example: "Monitor healthcare professionals' conversations in APAC to understand their concerns and information preferences."
    }
  },
  {
    id: 'command-center',
    name: 'Command Center',
    description: 'Centralized dashboard for persona insights and management',
    icon: LayoutDashboard,
    status: 'coming-soon',
    route: '/command-center',
    details: {
      overview: "A centralized dashboard providing real-time insights into your personas' world, including thoughts, feelings, activities, and key trends.",
      functionality: [
        'Real-time activity monitoring',
        'Dynamic persona visualization',
        'Integrated social listening feeds',
        'Trend analysis and alerting',
        'Customizable insight dashboards'
      ],
      benefits: [
        'Maintain comprehensive persona understanding',
        'Enable rapid, informed decision making',
        'Monitor persona evolution over time',
        'Identify emerging opportunities quickly'
      ],
      example: 'View real-time updates about what your personas are thinking, doing, and feeling across different channels and contexts.'
    }
  },
  {
    id: 'data-management',
    name: 'Data Management',
    description: 'Manage templates, datasets, and persona records',
    icon: Database,
    status: 'coming-soon',
    route: '/data-management',
    details: {
      overview: 'Comprehensive tools for managing all aspects of your persona data, including schemas, templates, and records.',
      functionality: [
        'Unified persona schema management',
        'Data source configuration',
        'Quality monitoring and alerts',
        'Template management system',
        'User roles and permissions'
      ],
      benefits: [
        'Ensure data integrity and consistency',
        'Simplify platform administration',
        'Maintain compliance with data policies',
        'Enable efficient persona management'
      ],
      example: 'Easily manage persona templates, connect new data sources, and maintain data quality across your organization.'
    }
  }
] as Feature[]

export default function AppHome() {
  const navigate = useNavigate()
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Living Personas Platform</h1>
              <p className="mt-1 text-sm text-gray-500">Select a feature to get started</p>
            </div>
            <nav className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')}
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                Home
              </button>
              <button
                className="px-4 py-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors font-medium"
              >
                Documentation
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Feature Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => {
                if (feature.status === 'active') {
                  navigate(feature.route)
                } else {
                  setSelectedFeature(feature)
                }
              }}
              className={`group relative p-6 rounded-xl border transition-all duration-500 hover:shadow-xl text-left ${
                feature.status === 'active' 
                  ? 'bg-green-50/80 border-green-200 hover:border-green-300/50' 
                  : 'bg-white border-gray-200 hover:border-primary-300/30'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-xl ${
                feature.status === 'active'
                  ? 'from-green-100/30 via-green-50/20 to-transparent'
                  : 'from-primary-50/30 via-primary-100/20 to-transparent'
              }`} />
              <div className="relative">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                  feature.status === 'active'
                    ? 'bg-gradient-to-br from-green-50 to-green-100'
                    : 'bg-gradient-to-br from-primary-50 to-primary-100'
                }`}>
                  <feature.icon className={`w-6 h-6 ${
                    feature.status === 'active' ? 'text-green-600' : 'text-primary-600'
                  }`} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                  {feature.status === 'coming-soon' && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                      Coming Soon
                    </span>
                  )}
                  {feature.status === 'active' && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{feature.description}</p>
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedFeature(feature)
                  }}
                  className="mt-4 text-sm text-primary-500 hover:text-primary-600 font-medium"
                >
                  Learn More →
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Feature Details Modal */}
      <FeatureDetailsModal
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
    </div>
  )
}