import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';

const Navbar = ({ cartCount, navigate, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Graphic Prints', view: 'shop' },
    { name: 'Anime Tees', view: 'shop' },
    { name: 'Typography', view: 'shop' },
    { name: 'All Prints', view: 'shop' }
  ];

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)]' : 'bg-gradient-to-b from-[#0F0F0F]/80 to-transparent py-6'}`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden w-1/4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[#39FF14] hover:scale-110 active:scale-90 transition-all"
            >
              {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Logo */}
          <div 
            className="w-2/4 lg:w-1/4 flex justify-center lg:justify-start cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <h1 className="text-2xl md:text-3xl font-black tracking-[0.15em] text-white uppercase leading-none group-hover:scale-105 transition-transform duration-500">
              Rel<span className="text-[#39FF14] drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">berry</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex w-2/4 justify-center space-x-12">
            {navLinks.map((link, i) => (
              <button
                key={link.name}
                onClick={() => navigate(link.view)}
                className={`relative text-xs font-bold uppercase tracking-[0.2em] py-2 transition-colors duration-300
                  text-white/70 hover:text-white group overflow-hidden
                  ${currentView === link.view && link.name === 'All Prints' ? 'text-white' : ''}
                `}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#39FF14] transition-all duration-300 ease-out
                  ${currentView === link.view && link.name === 'All Prints' ? 'w-full' : 'w-0 group-hover:w-full'}
                `} />
              </button>
            ))}
          </div>

          {/* Icons & Search */}
          <div className="flex items-center justify-end w-1/4 space-x-5 md:space-x-8">
            <div className={`hidden md:flex items-center bg-[#1A1A1A]/80 border border-white/10 rounded-full px-4 py-2 transition-all duration-500 focus-within:border-[#39FF14] focus-within:shadow-[0_0_15px_rgba(57,255,20,0.2)] ${searchOpen ? 'w-64 bg-[#0F0F0F]' : 'w-48 hover:bg-[#222]'}`}>
              <Search size={16} className="text-[#39FF14]" />
              <input 
                type="text" 
                placeholder="Search prints..." 
                className="bg-transparent border-none outline-none text-white text-xs ml-3 w-full placeholder-white/40"
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
              />
            </div>
            
            <button className="text-white hover:text-[#39FF14] md:hidden transition-colors hover:scale-110 active:scale-95 duration-200">
              <Search size={22} strokeWidth={1.5} />
            </button>
            <button className="text-white hover:text-[#39FF14] hidden sm:block transition-colors hover:scale-110 active:scale-95 duration-200">
              <User size={22} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => navigate('cart')}
              className="text-white hover:text-[#39FF14] relative transition-all duration-300 hover:scale-110 active:scale-95 group"
            >
              <ShoppingCart size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#39FF14] text-[#0F0F0F] text-[10px] font-black rounded-full h-[18px] w-[18px] flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.6)] animate-pulse-fast">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          </div>
      </div>

      {/* Mobile Menu Full Screen Overlay */}
      <div className={`fixed inset-0 top-[72px] bg-[#0F0F0F]/95 backdrop-blur-2xl z-40 px-6 py-8 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="flex flex-col space-y-8 mt-10">
          {navLinks.map((link, idx) => (
            <button
              key={link.name}
              onClick={() => { navigate(link.view); setIsMobileMenuOpen(false); }}
              className={`text-left text-4xl font-black uppercase tracking-tighter text-white hover:text-[#39FF14] transition-all duration-500 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
              style={{ transitionDelay: `${100 + idx * 100}ms` }}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
