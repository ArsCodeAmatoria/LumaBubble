import HeroScene from "@/components/HeroScene";
import Link from "next/link";
import { Play, BookOpen, HelpCircle, Atom } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <HeroScene />
        
        {/* Call to Action */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 pointer-events-auto">
          <Link
            href="/simulator"
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          >
            <Play size={20} />
            <span>Start Simulation</span>
          </Link>
          <Link
            href="/about"
            className="group flex items-center gap-2 px-6 py-3 space-card text-slate-300 hover:text-cyan-400 transition-all duration-300"
          >
            <BookOpen size={20} />
            <span>Learn More</span>
          </Link>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Unlock the Mystery of 
                <span className="hero-text"> Sonoluminescence</span>
              </h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Sonoluminescence is one of physics&apos; most fascinating phenomena - tiny bubbles in water 
                emit brilliant flashes of light when collapsed by sound waves. The temperatures inside 
                these collapsing bubbles can reach those found in the core of stars.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/simulator"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-lg hover:from-green-400 hover:to-cyan-400 transition-all duration-300"
                >
                  <Atom size={20} />
                  Try Simulator
                </Link>
                <Link
                  href="/faq"
                  className="flex items-center gap-2 px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
                >
                  <HelpCircle size={20} />
                  FAQ
                </Link>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                  <h3 className="text-xl font-semibold text-white">Extreme Physics</h3>
                </div>
                <p className="text-slate-300">
                  Bubble collapse generates temperatures exceeding 1 million Kelvin - 
                  hotter than the sun&apos;s surface.
                </p>
              </div>
              
              <div className="space-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                  <h3 className="text-xl font-semibold text-white">Unsolved Mystery</h3>
                </div>
                <p className="text-slate-300">
                  Despite decades of research, the exact mechanism behind 
                  light emission remains one of physics&apos; great puzzles.
                </p>
              </div>
              
              <div className="space-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                  <h3 className="text-xl font-semibold text-white">Interactive Learning</h3>
                </div>
                <p className="text-slate-300">
                  Our Haskell-powered WebAssembly simulation lets you explore 
                  bubble dynamics in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Explore with <span className="hero-text">LumaBubble</span>
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Our advanced simulation platform combines cutting-edge physics with 
            interactive visualization to bring sonoluminescence to life.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                <Atom size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Real-time Simulation</h3>
              <p className="text-slate-300">
                Watch bubble collapse dynamics unfold with our high-performance 
                Haskell simulation compiled to WebAssembly.
              </p>
            </div>
            
            <div className="space-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-cyan-500 flex items-center justify-center">
                <Play size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Interactive Controls</h3>
              <p className="text-slate-300">
                Adjust frequency, pressure, and bubble radius to see how 
                parameters affect the sonoluminescence phenomenon.
              </p>
            </div>
            
            <div className="space-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <BookOpen size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Educational Content</h3>
              <p className="text-slate-300">
                Learn the physics behind this mysterious phenomenon with 
                comprehensive explanations and visual guides.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
