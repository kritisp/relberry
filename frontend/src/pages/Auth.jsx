import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, Sparkles, Loader2 } from 'lucide-react';
import Reveal from '../components/Reveal';
import { PRODUCTS } from '../data/products';

const AuthView = ({ onLogin }) => {
  const [mode, setMode] = useState('login'); 
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(); 
    }, 1500);
  };

  // Duplicate products for flawless infinite scroll illusion
  const col1 = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS, ...PRODUCTS];
  const col2 = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS, ...PRODUCTS].reverse();

  return (
    <div className="min-h-screen w-full relative lg:flex lg:flex-row bg-[#050505] overflow-hidden selection:bg-[#d4af37] selection:text-[#0F0F0F]">
      
      {/* Self-contained keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee_reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* SCROLLING BACKGROUND — full screen on mobile, left 55% on desktop */}
      <div className="absolute inset-0 lg:relative lg:w-[55%] lg:h-screen overflow-hidden bg-[#0F0F0F] z-0">
        {/* Glow */}
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] lg:w-[40vw] lg:h-[40vw] bg-[#d4af37]/20 rounded-full blur-[120px] pointer-events-none z-0" />
        
        {/* Overlay Text — desktop only */}
        <div className="absolute inset-0 z-20 hidden lg:flex flex-col items-center justify-center pointer-events-none bg-black/50 p-6 text-center">
          <img src="/logo.png" alt="Relberry" className="h-[180px] object-contain mb-10 drop-shadow-[0_0_40px_rgba(255,215,0,0.8)]" />
          <h1 className="text-4xl xl:text-5xl font-black uppercase tracking-[0.2em] text-white opacity-80 drop-shadow-xl">
            THE VAULT
          </h1>
          <p className="text-white/60 font-bold tracking-[0.5em] uppercase text-xs mt-6 border-b border-white/30 pb-2 drop-shadow-lg">Exclusive Access Only</p>
        </div>

        {/* Scrolling Grid */}
        <div className="absolute inset-0 z-10 opacity-50 rotate-[-6deg] lg:rotate-[-4deg] scale-125 lg:scale-110 flex gap-4 lg:gap-8 px-4 lg:px-10 justify-center">
          <div className="flex flex-col gap-4 lg:gap-8 w-1/2 md:w-5/12" style={{ animation: 'scrollUp 18s linear infinite' }}>
            {col1.map((p, i) => (
              <div key={`c1-${i}`} className="w-full aspect-[3/4] rounded-lg overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex-shrink-0">
                <img src={p.image} className="w-full h-full object-cover grayscale opacity-80" />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 lg:gap-8 w-1/2 md:w-5/12" style={{ animation: 'scrollDown 18s linear infinite' }}>
            {col2.map((p, i) => (
              <div key={`c2-${i}`} className="w-full aspect-[3/4] rounded-lg overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex-shrink-0">
                <img src={p.image} className="w-full h-full object-cover grayscale opacity-80" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AUTH FORM — solid on desktop, glass card on mobile */}
      <div className="relative min-h-screen lg:min-h-0 w-full lg:w-[45%] flex-grow flex flex-col items-center justify-center px-6 py-12 lg:px-12 z-10 bg-transparent lg:bg-[#0A0A0A] lg:shadow-[-20px_0_50px_rgba(0,0,0,0.9)]">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none hidden lg:block" />

        {/* Mobile logo */}
        <div className="absolute top-8 left-0 right-0 flex justify-center lg:hidden pointer-events-none z-10">
          <img src="/logo.png" alt="Relberry" className="h-16 object-contain drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]" />
        </div>

        <div className="w-full max-w-[400px] relative mt-16 lg:mt-0">

          {/* Glass card wraps form on mobile only */}
          <div className="bg-[#0A0A0A]/80 backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-none rounded-2xl lg:rounded-none border border-white/10 lg:border-0 p-6 lg:p-0">

            <Reveal direction="up" delay={100}>

              <div className="mb-8 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-2">
                  {mode === 'login' ? 'Welcome Back' : 'Join The Culture'}
                </h2>
                <p className="text-white/50 text-xs sm:text-sm font-medium tracking-wide">
                  {mode === 'login' ? 'Enter your credentials to access the drop.' : 'Create an account to unlock exclusive prints.'}
                </p>
              </div>

              {/* Toggle */}
              <div className="flex p-1 bg-[#111] rounded-lg mb-8 border border-white/10 relative overflow-hidden">
                <div className={`absolute inset-y-1 w-[calc(50%-4px)] bg-[#0F0F0F] rounded-md transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] border border-white/5 shadow-[0_0_15px_rgba(212,175,55,0.15)] z-0 ${mode === 'login' ? 'left-1' : 'left-[calc(50%+3px)]'}`} />
                <button onClick={() => setMode('login')} className={`relative z-10 flex-1 py-3 text-xs font-black uppercase tracking-wider transition-all duration-300 ${mode === 'login' ? 'text-[#d4af37]' : 'text-white/40 hover:text-white'}`}>
                  Sign In
                </button>
                <button onClick={() => setMode('signup')} className={`relative z-10 flex-1 py-3 text-xs font-black uppercase tracking-wider transition-all duration-300 ${mode === 'signup' ? 'text-[#d4af37]' : 'text-white/40 hover:text-white'}`}>
                  Register
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-[#d4af37] transition-colors">
                    <Mail size={18} />
                  </div>
                  <input required type="email" placeholder="EMAIL ADDRESS"
                    className="w-full bg-[#111] border border-white/10 text-white px-4 py-4 pl-12 rounded-lg outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-xs font-bold tracking-widest uppercase placeholder-white/20" />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-[#d4af37] transition-colors">
                    <Lock size={18} />
                  </div>
                  <input required type="password" placeholder="PASSWORD"
                    className="w-full bg-[#111] border border-white/10 text-white px-4 py-4 pl-12 rounded-lg outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-xs font-bold tracking-widest uppercase placeholder-white/20" />
                </div>

                {mode === 'signup' && (
                  <div className="relative group animate-fade-in-up">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-[#d4af37] transition-colors">
                      <Lock size={18} />
                    </div>
                    <input required type="password" placeholder="VERIFY PASSWORD"
                      className="w-full bg-[#111] border border-white/10 text-white px-4 py-4 pl-12 rounded-lg outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all text-xs font-bold tracking-widest uppercase placeholder-white/20" />
                  </div>
                )}

                {mode === 'login' && (
                  <div className="flex justify-end">
                    <button type="button" className="text-white/40 text-[10px] font-bold uppercase tracking-wider hover:text-[#d4af37] transition-colors">Forgot Password?</button>
                  </div>
                )}

                <button type="submit" disabled={isLoading}
                  className="w-full bg-gold-metallic text-[#0F0F0F] py-4 rounded-lg font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-300 flex justify-center items-center active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 mt-2 border border-[#ffd700]">
                  {isLoading ? (
                    <Loader2 className="animate-spin text-[#0F0F0F]" size={20} />
                  ) : (
                    <span className="flex items-center gap-2">
                      {mode === 'login' ? 'Access Vault' : 'Create Account'} <ArrowRight size={16} />
                    </span>
                  )}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
                <div className="relative flex justify-center"><span className="bg-transparent px-4 text-white/30 text-[10px] font-bold uppercase tracking-widest">OR</span></div>
              </div>

              <button type="button" onClick={() => { setIsLoading(true); setTimeout(() => onLogin(), 1000); }}
                className="w-full bg-[#111] border border-white/10 text-white hover:border-[#d4af37] hover:text-[#d4af37] py-4 rounded-lg font-black uppercase tracking-[0.15em] text-xs transition-colors group flex items-center justify-center gap-2">
                Continue as Guest <Sparkles size={14} className="group-hover:animate-pulse" />
              </button>

            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
