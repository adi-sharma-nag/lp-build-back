import React from 'react'
import { Brain, MessageSquare, Sparkles, GitBranch } from 'lucide-react'
import FeatureCard from './FeatureCard'

function FeaturesGrid() {
  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={<Brain className="w-8 h-8 text-indigo-600" />}
          title="Dynamic Personality"
          description="Unique personas with evolving traits and memories that shape interactions"
        />
        <FeatureCard
          icon={<MessageSquare className="w-8 h-8 text-indigo-600" />}
          title="Contextual Awareness"
          description="Responses adapt to social context, environment, and relationship dynamics"
        />
        <FeatureCard
          icon={<Sparkles className="w-8 h-8 text-indigo-600" />}
          title="Memory Integration"
          description="Long-term memory storage with intelligent retrieval and emotional context"
        />
        <FeatureCard
          icon={<GitBranch className="w-8 h-8 text-indigo-600" />}
          title="Research Tools"
          description="Advanced analytics and insights for interaction patterns and behaviors"
        />
      </div>
    </section>
  )
}

export default FeaturesGrid