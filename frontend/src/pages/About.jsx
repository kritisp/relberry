import React from 'react';
import { Diamond, Layers, Sparkles, ShieldCheck } from 'lucide-react';
import Reveal from '../components/Reveal';

const AboutView = ({ navigate }) => {
  return (
    <div className="w-full bg-[#0F0F0F] overflow-hidden min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=2000&q=80" 
            alt="Relberry Culture" 
            className="w-full h-full object-cover object-center opacity-40 animate-[heroZoom_20s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/80 via-[#0F0F0F]/50 to-[#0F0F0F] z-10" />
        </div>
        
        <Reveal className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.4em] mb-6 block">The Brand Story</span>
          <h1 className="text-7xl md:text-[7rem] lg:text-[8.5rem] heading-caveat text-white capitalize mb-12 mt-6 drop-shadow-2xl leading-[0.9] gold-hover cursor-pointer">
            More Than Tees. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f6e27a] to-[#ffd700] filter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              It's Expression.
            </span>
          </h1>
          <p className="text-white/70 text-base md:text-lg font-medium tracking-wide max-w-2xl mx-auto">
            Relberry is built for those who wear their identity. We don't follow culture; we print it.
          </p>
        </Reveal>
      </section>

      {/* Brand Story Split Layout */}
      <section className="py-24 md:py-32 max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal direction="right" className="order-2 lg:order-1 relative group">
          <div className="aspect-[4/5] bg-[#111] rounded-lg overflow-hidden border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <img 
              src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1000&q=80" 
              alt="Streetwear Heritage" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-[#d4af37] rounded-lg -z-10 group-hover:-bottom-4 group-hover:-left-4 transition-all duration-500" />
        </Reveal>
        
        <div className="order-1 lg:order-2 space-y-10">
          <Reveal delay={100}>
            <h2 className="text-6xl md:text-[5.5rem] heading-caveat text-white capitalize leading-none pb-4 drop-shadow-lg gold-hover cursor-pointer">
              Born in the <br/> Underground.
            </h2>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-white/60 text-lg leading-relaxed font-medium">
              Relberry was founded on a simple principle: your clothing should speak before you do. We cater to Gen Z streetwear enthusiasts who view their wardrobe as a blank canvas for bold expression.
            </p>
          </Reveal>
          
          <Reveal delay={300}>
            <p className="text-white/60 text-lg leading-relaxed font-medium">
              We reject the generic. Every print is meticulously curated, dropping in limited batches to ensure you stand out. We don't just sell t-shirts; we craft armor for the modern streets.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 md:py-32 bg-[#0A0A0A] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37]/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <Reveal className="text-center mb-20">
            <h2 className="text-6xl md:text-[6rem] heading-caveat text-white capitalize drop-shadow-lg gold-hover cursor-pointer pb-2">The Relberry Standard</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Diamond, title: "Premium 240 GSM", desc: "Heavyweight combed cotton that drops perfectly and lasts forever." },
              { icon: Layers, title: "High-Density Prints", desc: "Puff and screen prints engineered to resist cracking and fading." },
              { icon: Sparkles, title: "Trend-Driven Drops", desc: "Limited edition capsules inspired by global street culture." },
              { icon: ShieldCheck, title: "Built for Comfort", desc: "Pre-shrunk, bio-washed, and tailored for the ultimate oversized fit." }
            ].map((value, i) => (
              <Reveal key={i} delay={i * 150} direction="up">
                <div className="bg-[#111] p-8 rounded-lg border border-white/5 hover:border-[#d4af37]/50 transition-colors duration-300 group h-full">
                  <div className="w-14 h-14 bg-[#0F0F0F] border border-white/10 rounded-full flex items-center justify-center text-white group-hover:text-[#0F0F0F] group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-all duration-300 mb-6">
                    <value.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-black uppercase tracking-wide text-lg mb-3">{value.title}</h3>
                  <p className="text-white/50 text-sm font-medium leading-relaxed">{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 text-center relative overflow-hidden">
        <Reveal>
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <h2 className="text-6xl md:text-[6rem] heading-caveat text-white capitalize drop-shadow-lg gold-hover cursor-pointer mb-10 mt-6">
              Join the Fam
            </h2>
            <p className="text-white/60 text-lg font-medium mb-12">
              Ready to upgrade your rotation? Dive into our latest drops and wear your vibe.
            </p>
            <button 
              onClick={() => navigate('shop')}
              className="px-12 py-5 bg-gold-metallic text-[#0F0F0F] font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm hover:-translate-y-1 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
            >
              Shop The Collection
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default AboutView;
