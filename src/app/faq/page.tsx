"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Lightbulb, Atom, Settings } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: "what-is-sonoluminescence",
    question: "What exactly is sonoluminescence?",
    answer: "Sonoluminescence is the phenomenon where tiny gas bubbles trapped in a liquid emit short bursts of light when they are rapidly collapsed by intense sound waves. The light flashes are incredibly brief (about 100 picoseconds) and the temperatures inside the bubble during collapse can exceed 1 million Kelvin - hotter than the surface of the sun.",
    category: "Physics"
  },
  {
    id: "how-discovered",
    question: "How was sonoluminescence discovered?",
    answer: "Sonoluminescence was first discovered in 1934 by H. Frenzel and H. Schultes at the University of Cologne. However, it wasn't until the 1990s that researchers like Seth Putterman at UCLA began studying it in detail using single-bubble techniques that allowed for more controlled observations.",
    category: "Physics"
  },
  {
    id: "why-mystery",
    question: "Why is sonoluminescence still a mystery?",
    answer: "Despite decades of research, scientists still don't fully understand the exact mechanism that produces the light. The extreme conditions inside the collapsing bubble - temperatures of millions of degrees and pressures of thousands of atmospheres - make it extremely difficult to study directly. Multiple theories exist, but none completely explain all observed phenomena.",
    category: "Physics"
  },
  {
    id: "temperatures-real",
    question: "Are the temperatures really that extreme?",
    answer: "Yes! Spectroscopic measurements and theoretical calculations suggest that temperatures inside the collapsing bubble can reach 1-10 million Kelvin. This is comparable to temperatures found in the cores of stars. The pressures can reach thousands of times atmospheric pressure, all concentrated in a volume smaller than the width of a human hair.",
    category: "Physics"
  },
  {
    id: "practical-applications",
    question: "Does sonoluminescence have practical applications?",
    answer: "While still largely a research phenomenon, sonoluminescence has potential applications in several areas: industrial cleaning through ultrasonic cavitation, medical treatments using focused ultrasound, materials processing, and potentially even as a way to study high-energy physics in a tabletop setting. Some researchers have even speculated about fusion applications, though this remains highly experimental.",
    category: "Physics"
  },
  {
    id: "how-simulator-works",
    question: "How does the LumaBubble simulator work?",
    answer: "Our simulator uses a physics engine written in Haskell and compiled to WebAssembly for high performance. It models the Rayleigh-Plesset equation for bubble dynamics, incorporates thermal effects, and simulates the relationship between bubble collapse and light emission based on current scientific understanding. The simulation runs in real-time at 60 FPS in your browser.",
    category: "Simulator"
  },
  {
    id: "accuracy-of-simulation",
    question: "How accurate is the simulation?",
    answer: "Our simulation is based on established physics models like the Rayleigh-Plesset equation and incorporates effects like viscosity, surface tension, and compressibility. However, it's important to note that this is a simplified model - the real phenomenon involves quantum effects, plasma physics, and other complexities that are still being researched. Our simulator is designed for educational purposes and provides a good approximation of the basic dynamics.",
    category: "Simulator"
  },
  {
    id: "parameter-ranges",
    question: "What do the different parameters control?",
    answer: "Frequency controls the sound wave frequency (typically 20-40 kHz), which determines how fast the bubble oscillates. Pressure affects the ambient pressure in the liquid, influencing bubble stability. Initial radius sets the bubble size at the start of simulation. These parameters are all interconnected - changing one affects the others and the overall dynamics of the system.",
    category: "Simulator"
  },
  {
    id: "why-webassembly",
    question: "Why use Haskell and WebAssembly?",
    answer: "Haskell provides excellent mathematical abstractions and type safety for implementing complex physics equations. Compiling to WebAssembly gives us near-native performance in the browser while maintaining memory safety. This combination allows us to run sophisticated simulations in real-time without requiring users to install additional software.",
    category: "Technical"
  },
  {
    id: "system-requirements",
    question: "What are the system requirements?",
    answer: "LumaBubble runs in any modern web browser that supports WebAssembly (Chrome, Firefox, Safari, Edge). It works on desktop computers, tablets, and smartphones. For the best experience, we recommend a device with at least 4GB of RAM and a modern graphics card, though the simulator will run on less powerful hardware at reduced frame rates.",
    category: "Technical"
  },
  {
    id: "educational-use",
    question: "Can I use this for teaching?",
    answer: "Absolutely! LumaBubble is designed to be an educational tool. Teachers and students are welcome to use it in classrooms, for homework assignments, or research projects. The interactive nature helps students understand the relationship between different physical parameters and their effects on bubble dynamics.",
    category: "Educational"
  },
  {
    id: "further-learning",
    question: "Where can I learn more about sonoluminescence?",
    answer: "Start with our About page for a comprehensive overview. For deeper study, look into research papers by Seth Putterman, Kenneth Suslick, and other researchers in the field. Key journals include Physical Review Letters, Nature, and the Journal of the Acoustical Society of America. Many universities also offer courses on acoustics and fluid dynamics that cover cavitation phenomena.",
    category: "Educational"
  }
];

const categories = ["All", "Physics", "Simulator", "Technical", "Educational"];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const filteredFAQs = activeCategory === "All" 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Physics": return <Atom size={20} className="text-cyan-400" />;
      case "Simulator": return <Settings size={20} className="text-blue-400" />;
      case "Technical": return <Settings size={20} className="text-green-400" />;
      case "Educational": return <Lightbulb size={20} className="text-purple-400" />;
      default: return <HelpCircle size={20} className="text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="hero-text">Questions</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Find answers to common questions about sonoluminescence and the LumaBubble simulator
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item) => (
            <div key={item.id} className="space-card overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getCategoryIcon(item.category)}
                  <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 uppercase tracking-wide">
                    {item.category}
                  </span>
                  {openItems.has(item.id) ? (
                    <ChevronUp size={20} className="text-slate-400" />
                  ) : (
                    <ChevronDown size={20} className="text-slate-400" />
                  )}
                </div>
              </button>
              
              {openItems.has(item.id) && (
                <div className="px-6 pb-6">
                  <div className="border-t border-slate-700 pt-4">
                    <p className="text-slate-300 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16">
          <div className="space-card p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <HelpCircle className="text-cyan-400" size={32} />
              <h2 className="text-2xl font-bold text-white">Still Have Questions?</h2>
            </div>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? We're here to help you understand 
              the fascinating world of sonoluminescence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="mailto:contact@lumabubble.com" 
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
              >
                Contact Us
              </a>
              <a 
                href="/about" 
                className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold hero-text mb-2">100+</div>
            <div className="text-slate-300">Picoseconds</div>
            <div className="text-sm text-slate-400">Flash Duration</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold hero-text mb-2">1M+</div>
            <div className="text-slate-300">Kelvin</div>
            <div className="text-sm text-slate-400">Peak Temperature</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold hero-text mb-2">90+</div>
            <div className="text-slate-300">Years</div>
            <div className="text-sm text-slate-400">Since Discovery</div>
          </div>
        </div>
      </div>
    </div>
  );
} 