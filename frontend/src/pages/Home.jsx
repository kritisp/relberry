import React from 'react';
import { Play, ArrowRight, ChevronRight, Star, Mail } from 'lucide-react';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

const HomeView = ({ navigate, addToCart }) => {
  const trending = PRODUCTS.filter(p => p.tag === 'Bestseller' || p.price > 1400);
  const newDrops = PRODUCTS.filter(p => p.tag === 'New Drop' || p.price <= 1200);

  return (
    <div className="w-full bg-[#0F0F0F] overflow-hidden">
      
      {/* 🚀 HERO SECTION (Cinematic Upgrade) */}
      <section className="relative h-screen min-h-[700px] w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=2000&q=80" 
            alt="Streetwear Hero" 
            className="w-full h-full object-cover object-top opacity-50 scale-100 animate-[heroZoom_20s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/70 via-[#0F0F0F]/40 to-[#0F0F0F] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/80 via-transparent to-[#0F0F0F]/80 z-10" />
        </div>
        
        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center mt-20">
          <Reveal delay={100}>
            <div className="inline-block border border-[#D4AF37]/50 bg-[#D4AF37]/10 backdrop-blur-md text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full mb-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              Exclusive Printed Collection 2026
            </div>
          </Reveal>
          
          <Reveal delay={300}>
            <h1 className="text-5xl md:text-[6rem] lg:text-[8rem] font-black text-white uppercase tracking-tighter leading-[0.85] mb-8 drop-shadow-2xl">
              Prints That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D4AF37] to-yellow-700 filter drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                Speak.
              </span>
            </h1>
          </Reveal>
          
          <Reveal delay={500}>
            <p className="text-white/70 text-base md:text-lg max-w-xl mb-12 font-medium tracking-wide">
              Bold, unapologetic printed t-shirts engineered for the culture. High-density inks, heavyweight cotton, zero compromises.
            </p>
          </Reveal>
          
          <Reveal delay={700}>
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <button 
                onClick={() => navigate('shop')}
                className="group relative px-10 py-5 bg-[#D4AF37] text-[#0F0F0F] font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:-translate-y-1 active:scale-95 overflow-hidden flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center">Shop New Drops <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" /></span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Floating background elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[100px] animate-pulse-slow z-0" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow z-0" style={{ animationDelay: '2s' }} />

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce opacity-70">
          <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.3em] mb-2 font-black">Scroll</span>
          <div className="w-[2px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </div>
      </section>

      {/* 🔥 CATEGORIES (PRINTED T-SHIRTS ONLY) */}
      <section className="py-32 bg-[#0F0F0F]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <Reveal>
             <div className="text-center mb-16">
               <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em] mb-4 block">Shop By Aesthetic</span>
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none">Curated Prints</h2>
             </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Graphic Prints", desc: "Bold illustrations & art", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80" },
              { name: "Typography", desc: "Statement text designs", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80" },
              { name: "Anime Prints", desc: "Licensed & inspired art", img: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80" },
              { name: "Street Art", desc: "Raw graffiti aesthetics", img: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80" }
            ].map((cat, i) => (
              <Reveal key={i} delay={i * 150} direction="up">
                <div 
                  onClick={() => navigate('shop')}
                  className="group relative aspect-[3/4] overflow-hidden cursor-pointer rounded-lg border border-white/5 hover:border-[#D4AF37]/50 transition-colors duration-500"
                >
                  <img src={cat.img} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" alt={cat.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center z-10">
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter translate-y-6 group-hover:translate-y-0 group-hover:text-[#D4AF37] transition-all duration-500">
                      {cat.name}
                    </h3>
                    <p className="text-white/60 text-xs font-medium uppercase tracking-widest mt-3 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {cat.desc}
                    </p>
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 translate-y-6 group-hover:translate-y-0 flex items-center bg-white text-[#0F0F0F] px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Explore <ChevronRight size={14} className="ml-1" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 NEW DROPS (Grid) */}
      <section className="py-32 bg-[#0A0A0A] border-y border-white/5 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em] mb-4 block flex items-center"><div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-ping mr-3"/> Just Dropped</span>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">Fresh Prints</h2>
              </div>
              <button 
                onClick={() => navigate('shop')}
                className="hidden md:flex items-center text-white/50 hover:text-[#D4AF37] font-bold uppercase tracking-[0.15em] text-xs transition-colors group"
              >
                View All Drops <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {newDrops.map((product, i) => (
              <Reveal key={product.id} delay={i * 100}>
                <ProductCard 
                  product={product} 
                  navigate={navigate} 
                  onQuickAdd={(p) => addToCart(p, 'L', 1)} 
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 🎥 LIFESTYLE VIDEO SECTION */}
      <section className="relative h-[85vh] w-full flex items-center justify-center group overflow-hidden bg-[#0F0F0F]">
        <div className="absolute inset-0">
          {/* Using a high quality Unsplash image with extreme zoom to simulate video/lifestyle feel if real video isn't available */}
          <img 
            src="https://images.unsplash.com/photo-1523398002811-999aa8e92d0c?w=1600&q=80" 
            alt="Campaign" 
            className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[10s] ease-linear"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-[#0F0F0F]" />
          <div className="absolute inset-0 bg-[#D4AF37]/5 mix-blend-overlay" />
        </div>
        
        <Reveal>
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:scale-110 transition-all duration-500 mb-8 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]">
              <Play size={32} className="text-white group-hover:text-[#0F0F0F] translate-x-1 transition-colors" fill="currentColor" />
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-2xl">
              The Underground <br/><span className="text-[#D4AF37]">Print Series</span>
            </h2>
            <button 
              onClick={() => navigate('shop')}
              className="text-white font-black uppercase tracking-[0.3em] text-xs border-b-2 border-[#D4AF37] pb-2 hover:text-[#D4AF37] hover:tracking-[0.4em] transition-all duration-300"
            >
              Shop The Lookbook
            </button>
          </div>
        </Reveal>
      </section>

      {/* 🔥 TRENDING PRINTS (Horizontal Scroll) */}
      <section className="py-32 bg-[#0F0F0F] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="text-white/40 text-xs font-black uppercase tracking-[0.2em] mb-4 block">Most Wanted</span>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">Trending Prints</h2>
              </div>
            </div>
          </Reveal>
          
          <div className="flex overflow-x-auto gap-6 md:gap-8 pb-12 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
            {trending.map((product, i) => (
              <Reveal key={product.id} delay={i * 100} direction="left" className="w-[300px] md:w-[360px] flex-shrink-0 snap-start">
                <ProductCard 
                  product={product} 
                  navigate={navigate} 
                  onQuickAdd={(p) => addToCart(p, 'L', 1)} 
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 💎 ETHOS / WHY RELBERRY TEES */}
      <section className="py-32 bg-[#0A0A0A] border-y border-white/5 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal direction="right">
              <div className="relative group">
                <div className="aspect-square bg-[#111] rounded-lg overflow-hidden border border-white/10 relative z-10">
                  <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000&q=80" alt="Quality" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                </div>
                <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-[#D4AF37] rounded-lg -z-10 group-hover:-bottom-6 group-hover:-right-6 transition-all duration-500" />
              </div>
            </Reveal>
            
            <div className="space-y-10">
              <Reveal delay={100}>
                <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em]">Why Relberry?</span>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mt-4">
                  Prints That <br/> Outlast Trends.
                </h2>
              </Reveal>
              
              <div className="space-y-8">
                {[
                  { title: "High-Density Puff Prints", desc: "3D textured prints that crack-resistant and vibrant even after 50 washes." },
                  { title: "Heavyweight 240 GSM", desc: "Premium combed cotton. Drops perfectly, doesn't cling, pure comfort." },
                  { title: "Pre-Shrunk & Bio-Washed", desc: "Ready to wear out the box. No shrinking, zero fading." }
                ].map((item, i) => (
                  <Reveal key={i} delay={200 + (i * 100)}>
                    <div className="border-l-2 border-[#D4AF37] pl-6">
                      <h3 className="text-white font-black uppercase tracking-wide text-lg mb-2">{item.title}</h3>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 CUSTOMER VIBES (TESTIMONIALS) */}
      <section className="py-32 bg-[#0F0F0F] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">Customer Vibes</h2>
              <p className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs">Rated 4.9/5 by 10,000+ hypebeasts</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Rahul S.", text: "The puff print on the Cyber Demon tee is insane. Best pump cover I own right now.", rating: 5 },
              { name: "Vikram M.", text: "Quality matches international brands that cost 3x more. The 240GSM cotton feels heavily premium.", rating: 5 },
              { name: "Aman K.", text: "Washed my Acid Wash tee like 10 times, print hasn't faded a bit. Insane durability.", rating: 5 }
            ].map((review, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="bg-[#111] border border-white/5 p-8 rounded-lg hover:border-[#D4AF37]/30 transition-colors duration-300">
                  <div className="flex text-[#D4AF37] mb-6">
                    {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-white/80 text-base leading-relaxed mb-8 italic font-medium">"{review.text}"</p>
                  <p className="text-white font-black uppercase tracking-wider text-sm">{review.name}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Verified Buyer</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 📩 NEWSLETTER */}
      <section className="py-32 bg-[#0A0A0A] relative overflow-hidden text-center border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-[#D4AF37]/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
        <Reveal>
          <div className="max-w-2xl mx-auto px-6 relative z-10">
            <Mail size={48} className="mx-auto text-[#D4AF37] mb-8 stroke-1" />
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
              Join the Fam
            </h2>
            <p className="text-white/60 mb-12 text-sm md:text-base font-medium">
              Unlock 10% off your first printed tee. Early access to limited drops. No spam, only fire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="flex-grow bg-[#111] border border-white/10 text-white px-6 py-4 rounded-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-xs font-bold tracking-widest uppercase placeholder-white/30 text-center sm:text-left"
              />
              <button className="bg-[#D4AF37] text-[#0F0F0F] px-10 py-4 font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-300 rounded-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 sm:w-auto w-full">
                Subscribe
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default HomeView;
