import { Atom, Zap, Lightbulb, Microscope, BookOpen, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            About <span className="hero-text">Sonoluminescence</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Explore one of physics&apos; most enigmatic phenomena - where sound waves create light 
            through bubble collapse, reaching temperatures that rival the core of stars.
          </p>
        </div>

        {/* What is Sonoluminescence */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="text-cyan-400" size={32} />
                <h2 className="text-3xl font-bold text-white">What is Sonoluminescence?</h2>
              </div>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Sonoluminescence is the phenomenon where tiny gas bubbles trapped in a liquid emit 
                short bursts of light when they are rapidly collapsed by intense acoustic waves. 
                This process involves some of the most extreme conditions found on Earth.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                First discovered in the 1930s but not studied in detail until the 1990s, 
                sonoluminescence remains one of physics&apos; greatest unsolved mysteries, 
                with light emission mechanisms still hotly debated among researchers.
              </p>
            </div>
            <div className="space-card p-8">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center animate-pulse">
                  <Atom size={48} className="text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Key Facts</h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Flash Duration:</span>
                    <span className="text-cyan-400">~100 picoseconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Peak Temperature:</span>
                    <span className="text-orange-400">~1,000,000 K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Bubble Size:</span>
                    <span className="text-green-400">2-10 micrometers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Typical Frequency:</span>
                    <span className="text-blue-400">20-40 kHz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Physics */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Microscope className="text-cyan-400" size={32} />
              <h2 className="text-3xl font-bold text-white">The Physics Behind the Mystery</h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                <h3 className="text-xl font-semibold text-white">Acoustic Cavitation</h3>
              </div>
              <p className="text-slate-300">
                Sound waves create alternating pressure regions in the liquid. During low-pressure 
                phases, gas bubbles expand dramatically. During high-pressure phases, they collapse 
                with tremendous violence.
              </p>
            </div>
            
            <div className="space-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse"></div>
                <h3 className="text-xl font-semibold text-white">Extreme Conditions</h3>
              </div>
              <p className="text-slate-300">
                The bubble collapse concentrates energy into an incredibly small volume, creating 
                temperatures exceeding those found in stellar cores and pressures comparable to 
                those inside giant planets.
              </p>
            </div>
            
            <div className="space-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <h3 className="text-xl font-semibold text-white">Light Emission</h3>
              </div>
              <p className="text-slate-300">
                The exact mechanism of light production remains unknown. Theories include blackbody 
                radiation from superheated plasma, bremsstrahlung radiation, and even quantum 
                vacuum effects.
              </p>
            </div>
          </div>
        </section>

        {/* Theories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="text-cyan-400" size={32} />
              <h2 className="text-3xl font-bold text-white">Leading Theories</h2>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Scientists have proposed several mechanisms to explain how collapsing bubbles produce light
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-card p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Plasma Theory</h3>
              <p className="text-lg text-slate-300 mb-4">
                The most widely accepted theory suggests that the extreme temperatures and pressures 
                during bubble collapse ionize the gas inside, creating a plasma state. This plasma 
                then emits light through thermal radiation (blackbody emission).
              </p>
              <div className="flex items-center gap-2 text-cyan-400">
                <Zap size={20} />
                <span className="font-semibold">Evidence:</span>
                <span className="text-slate-300">Spectral analysis shows broad-spectrum emission consistent with blackbody radiation</span>
              </div>
            </div>

            <div className="space-card p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Bremsstrahlung Radiation</h3>
              <p className="text-lg text-slate-300 mb-4">
                As electrons are accelerated and decelerated by the strong electric fields in the 
                collapsing bubble, they emit electromagnetic radiation. This process, known as 
                bremsstrahlung (German for &quot;braking radiation&quot;), could explain the light emission.
              </p>
              <div className="flex items-center gap-2 text-blue-400">
                <Atom size={20} />
                <span className="font-semibold">Evidence:</span>
                <span className="text-slate-300">X-ray emissions detected in some experiments</span>
              </div>
            </div>

            <div className="space-card p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Quantum Vacuum Effects</h3>
              <p className="text-lg text-slate-300 mb-4">
                Some researchers propose that the rapid bubble collapse may temporarily distort 
                spacetime enough to extract energy from quantum vacuum fluctuations, though this 
                remains highly speculative and controversial.
              </p>
              <div className="flex items-center gap-2 text-purple-400">
                <Lightbulb size={20} />
                <span className="font-semibold">Status:</span>
                <span className="text-slate-300">Theoretical - lacks experimental verification</span>
              </div>
            </div>
          </div>
        </section>

        {/* About LumaBubble */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="text-cyan-400" size={32} />
              <h2 className="text-3xl font-bold text-white">About LumaBubble</h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Our Mission</h3>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                LumaBubble was created to make the fascinating world of sonoluminescence accessible 
                to students, researchers, and curious minds everywhere. Through interactive simulations 
                and educational content, we aim to illuminate this dark corner of physics.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Our advanced simulation engine, powered by Haskell and compiled to WebAssembly, 
                provides real-time visualization of bubble dynamics based on current scientific 
                understanding of the phenomenon.
              </p>
            </div>
            
            <div className="space-card p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Technical Features</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  <span className="text-slate-300">Real-time physics simulation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-slate-300">Interactive parameter controls</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-slate-300">Live data visualization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <span className="text-slate-300">WebAssembly performance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                  <span className="text-slate-300">Educational content</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Links */}
        <section>
          <div className="space-card p-8 text-center">
            <h3 className="text-2xl font-semibold text-white mb-6">Continue Learning</h3>
            <p className="text-lg text-slate-300 mb-8">
              Explore more about sonoluminescence through research papers, experimental data, and academic resources
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#" 
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
              >
                Research Papers
              </a>
              <a 
                href="#" 
                className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
              >
                Experimental Data
              </a>
              <a 
                href="#" 
                className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
              >
                Academic Resources
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 