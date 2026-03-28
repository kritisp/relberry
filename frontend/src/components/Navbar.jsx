import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, User, Heart, LogOut } from 'lucide-react';

const Navbar = ({ cartCount, wishlistCount, navigate, currentView, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Graphic Prints', view: 'shop' },
    { name: 'Anime Tees', view: 'shop' },
    { name: 'Typography', view: 'shop' },
    { name: 'About Us', view: 'about' }
  ];

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)]' : 'bg-gradient-to-b from-[#0F0F0F]/80 to-transparent py-6'}`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden w-1/4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gold-metallic hover:scale-110 active:scale-90 transition-all"
            >
              {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Logo */}
          <div 
            className="w-2/4 lg:w-1/4 flex justify-center lg:justify-start cursor-pointer group hover:opacity-90"
            onClick={() => navigate('home')}
          >
            <img src="/logo.png" alt="Relberry Logo" className="h-20 md:h-28 lg:h-36 object-contain group-hover:scale-105 transition-all duration-500" style={{ filter: 'drop-shadow(0 0 20px rgba(255,214,78,0.6))' }} />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex w-2/4 justify-center space-x-12">
            {navLinks.map((link, i) => (
              <button
                key={link.name}
                onClick={() => navigate(link.view)}
                className={`relative text-xs font-bold uppercase tracking-[0.2em] py-2 transition-colors duration-300
                  text-white/70 hover:text-white group overflow-hidden
                  ${currentView === link.view ? 'text-white' : ''}
                `}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-gold-metallic transition-all duration-300 ease-out
                  ${currentView === link.view ? 'w-full' : 'w-0 group-hover:w-full'}
                `} />
              </button>
            ))}
          </div>

          {/* Icons & Search */}
          <div className="flex items-center justify-end w-1/4 space-x-5 md:space-x-8">
            <div className={`hidden md:flex items-center bg-[#1A1A1A]/80 border border-white/10 rounded-full px-4 py-2 transition-all duration-500 focus-within:border-gold-metallic focus-within:shadow-[0_0_15px_rgba(255,214,78,0.2)] ${searchOpen ? 'w-64 bg-[#0F0F0F]' : 'w-48 hover:bg-[#222]'}`}>
              <Search size={16} className="text-gold-metallic" />
              <input 
                type="text" 
                placeholder="Search prints..." 
                className="bg-transparent border-none outline-none text-white text-xs ml-3 w-full placeholder-white/40"
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
              />
            </div>
            
            <button className="text-white hover:text-gold-metallic md:hidden transition-colors hover:scale-110 active:scale-95 duration-200">
              <Search size={22} strokeWidth={1.5} />
            </button>

            {/* Profile Dropdown */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className={`text-white hover:text-gold-metallic transition-all duration-200 hover:scale-110 active:scale-95 ${profileOpen ? 'text-gold-metallic' : ''}`}
              >
                <User size={22} strokeWidth={1.5} />
              </button>
              
              {profileOpen && (
                <div className="absolute right-0 mt-4 w-48 bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.8)] py-2 animate-fade-in-up origin-top-right">
                  <div className="px-4 py-3 border-b border-white/5 mb-2">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Signed in as</p>
                    <p className="text-white text-xs font-bold truncate mt-1">hypebeast@relberry.com</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                    My Orders
                  </button>
                  <button 
                    onClick={() => { setProfileOpen(false); onLogout(); }}
                    className="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center"
                  >
                    <LogOut size={14} className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => navigate('wishlist')}
              className={`text-white hover:text-gold-metallic relative transition-all duration-300 hover:scale-110 active:scale-95 group ${currentView === 'wishlist' ? 'text-gold-metallic' : ''}`}
            >
              <Heart size={22} strokeWidth={1.5} className={currentView === 'wishlist' ? 'fill-gold-metallic' : ''} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-metallic text-[#0F0F0F] text-[10px] font-black rounded-full h-[18px] w-[18px] flex items-center justify-center shadow-[0_0_15px_rgba(255,214,78,0.6)] animate-pulse-fast">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => navigate('cart')}
              className={`text-white hover:text-gold-metallic relative transition-all duration-300 hover:scale-110 active:scale-95 group ${currentView === 'cart' ? 'text-gold-metallic' : ''}`}
            >
              <ShoppingCart size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-metallic text-[#0F0F0F] text-[10px] font-black rounded-full h-[18px] w-[18px] flex items-center justify-center shadow-[0_0_15px_rgba(255,214,78,0.6)] animate-pulse-fast">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          </div>
      </div>

      {/* Mobile Menu Full Screen Overlay */}
      <div className={`fixed inset-0 top-[72px] bg-[#0F0F0F]/95 backdrop-blur-2xl z-40 px-6 py-8 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden flex flex-col justify-between`}>
        <div className="flex flex-col space-y-8 mt-10">
          {navLinks.map((link, idx) => (
            <button
              key={link.name}
              onClick={() => { navigate(link.view); setIsMobileMenuOpen(false); }}
              className={`text-left text-4xl font-black uppercase tracking-tighter text-white hover:text-gold-metallic transition-all duration-500 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
              style={{ transitionDelay: `${100 + idx * 100}ms` }}
            >
              {link.name}
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => { setIsMobileMenuOpen(false); onLogout(); }}
          className={`flex items-center text-red-400 font-bold uppercase tracking-wider text-sm p-4 border border-red-500/20 rounded-lg justify-center mb-10 hover:bg-red-500/10 transition-colors duration-500 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
          style={{ transitionDelay: `500ms` }}
        >
          <LogOut size={16} className="mr-2" /> Disconnect
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
