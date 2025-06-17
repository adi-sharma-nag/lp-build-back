import Hero from '../components/layout/Hero'
import Features from '../components/features/Features'
import UseCases from '../components/landing/UseCases'
import PersonaComparison from '../components/landing/PersonaComparison'
import DemoPreview from '../components/chat/DemoPreview'
import GuidingTenets from '../components/landing/GuidingTenets'
import ProcessFlow from '../components/landing/ProcessFlow'
import Header from '../components/layout/Header'
import GradientMesh from '../components/ui/GradientMesh'
import Footer from '../components/layout/Footer'
import BackToTop from '../components/ui/BackToTop'

interface LandingProps {
  onStartQuiz: () => void
}

function Landing({ onStartQuiz }: LandingProps) {
  return (
    <div className="min-h-screen w-full bg-white text-gray-900 relative">
      <GradientMesh />
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header onStartQuiz={onStartQuiz} />
      </div>
      <div className="snap-container pt-16 overflow-y-auto">
        <div className="snap-section">
          <Hero onStartQuiz={onStartQuiz} />
        </div>
        <div className="snap-section">
          <PersonaComparison onStartQuiz={onStartQuiz} />
        </div>
        <div className="snap-section">
          <Features onStartQuiz={onStartQuiz} />
        </div>
        <div className="snap-section">
          <UseCases onStartQuiz={onStartQuiz} />
        </div>
        <div className="snap-section">
          <GuidingTenets onStartQuiz={onStartQuiz} />
        </div>
        <div className="snap-section">
          <ProcessFlow onStartQuiz={onStartQuiz} />
        </div>
        <div className="snap-section">
          <DemoPreview onStartQuiz={onStartQuiz} />
        </div>
        <div className="snap-section min-h-[20vh]">
          <Footer onStartQuiz={onStartQuiz} />
        </div>
      </div>
      <BackToTop />
    </div>
  )
}

export default Landing