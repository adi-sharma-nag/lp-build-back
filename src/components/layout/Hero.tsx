import React from 'react'
import { useState, useEffect } from 'react'
import { ArrowRight, Sparkles, Brain, MessageSquare, Gamepad, Share2 } from 'lucide-react'
import Message from '../chat/Message'

interface HeroProps {
  onStartQuiz: () => void
}

function Hero({ onStartQuiz }: HeroProps) {

  return (
    <header className="relative px-4 sm:px-6 py-16 md:py-24 w-full min-h-[100dvh] flex items-center overflow-y-auto will-change-transform translate-z-0 overscroll-behavior-y: contain">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden translate-z-0">
        <div className="absolute top-0 right-0 w-full aspect-square max-w-[800px] bg-gradient-to-br from-primary-100/30 via-primary-200/20 to-primary-300/10 blur-[160px] will-change-transform" />
        <div className="absolute -bottom-40 -left-40 w-full aspect-square max-w-[800px] bg-gradient-to-tr from-primary-200/20 via-primary-300/15 to-primary-400/10 blur-[130px] will-change-transform" />
        <div className="absolute top-1/2 left-1/4 w-full aspect-square max-w-[600px] bg-gradient-to-br from-primary-50/20 via-primary-100/15 to-transparent blur-[100px] will-change-transform" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-20 translate-z-0" />
      </div>

  <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-16 pt-8 lg:pt-0 translate-z-0">
        <div className="w-full lg:w-3/5 text-center lg:text-left">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-8 justify-center lg:justify-start translate-z-0">
            <div className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/90 border border-primary-300/30 shadow-xl shadow-primary-300/20 backdrop-blur-sm">
             <Sparkles className="w-5 h-5 text-primary-400 animate-pulse" />
             <span className="text-primary-400 font-semibold tracking-wider">Digital Cultural Intelligence</span>
           </div>
          </div>
          

          {/* Main Headline */}
          <h1 className="relative overflow-visible translate-z-0 will-change-transform">
            <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.2] tracking-tight animate-gradient bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent bg-300% py-4">
              Unlock the Power of{' '}
              Living Personas
            </span>
          </h1>

        {/* Supporting Text */}
        <p className="relative text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 lg:max-w-none lg:pr-12 mb-8 leading-relaxed mt-4 translate-z-0 will-change-transform">
          Bring social listening and digital insights to life, creating tailored interactions and game-changing engagement with your audience.
        </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start translate-z-0 will-change-transform">
            <button 
              onClick={onStartQuiz}
              className="group w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-primary-300 to-primary-400 text-white rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-primary-300/30 hover:shadow-2xl hover:shadow-primary-300/40 text-lg font-semibold active:scale-95 active:shadow-lg translate-z-0 touch-manipulation"
              style={{ touchAction: 'manipulation' }}
            >
              Chat Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group w-full sm:w-auto px-8 py-5 bg-white/95 text-gray-900 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl border border-gray-200 hover:border-primary-200 text-lg font-semibold backdrop-blur-sm active:scale-95 active:shadow-md translate-z-0 touch-manipulation"
              style={{ touchAction: 'manipulation' }}
              role="button"
              tabIndex={0}
              aria-label="Learn More"
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full max-w-md lg:w-2/5 translate-z-0 will-change-transform">
          <div className="rounded-2xl border border-gray-200/60 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden hover:border-primary-300/50 transition-all duration-500 hover:shadow-primary-300/20 transform hover:translate-y-[-2px]">
            <div className="p-4 border-b border-gray-100/50 flex items-center gap-3 bg-gradient-to-r from-white/80 to-white/60">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400"
                  alt="Avery"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white translate-z-0"
                  loading="eager"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-white flex items-center justify-center">
                  <Gamepad className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Avery</h3>
                  <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-400 text-xs font-medium">Gen Z</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    Online
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    150+ Data Sources
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden relative">
              <div className="space-y-8 animate-scroll">
              <Message
                sender="persona"
                content="hey! welcome to my digital world! 85% of us discover brands through social! 👋"
                timestamp={new Date()}
              />
              <Message
                sender="user"
                content="what's trending in your world right now?"
                timestamp={new Date()}
              />
              <Message
                sender="persona"
                content="omg so much! y2k fashion is having a moment, dark academia aesthetics are everywhere, and we're all about that sustainable lifestyle! 70% of us only support eco-friendly brands 🌱"
                timestamp={new Date()}
              />
              <Message
                sender="user"
                content="tell me about your interests and values"
                timestamp={new Date()}
              />
              <Message
                sender="persona"
                content="i'm super passionate about sustainability, mental health awareness, and authentic self-expression! we're the most socially conscious gen - 86% of us actively support brands that align with our values ✨"
                timestamp={new Date()}
              />
              <Message
                sender="user"
                content="how do you discover new trends?"
                timestamp={new Date()}
              />
              <Message
                sender="persona"
                content="tiktok is the main character fr! 45% of our purchases start there. we love seeing real people share their authentic experiences. plus the algorithm just gets us 💫"
                timestamp={new Date()}
              />
              <Message
                sender="user"
                content="what makes you connect with a brand?"
                timestamp={new Date()}
              />
              <Message
                sender="persona"
                content="transparency is everything! we need to see the real story - sustainability practices, employee treatment, social impact. 80% of us research before buying, and we're not afraid to call out greenwashing 🔍"
                timestamp={new Date()}
              />
              <Message
                sender="user"
                content="what's your shopping style like?"
                timestamp={new Date()}
              />
              <Message
                sender="persona"
                content="hybrid shopping is the move! 80% of us check reviews and compare prices in-store. we're all about that seamless online-offline experience, especially for fashion and beauty 🛍️"
                timestamp={new Date()}
              />
              <Message
                sender="user"
                content="any specific aesthetics you're into?"
                timestamp={new Date()}
              />
              <Message
                sender="persona"
                content="obsessed with mixing aesthetics rn! one day it's dark academia with a twist, next day it's y2k meets cottagecore. we love expressing different sides of ourselves through style 🎭"
              />
              </div>
            </div>
         </div>
        </div>
      </div>
   </header>
  )
}


export default Hero