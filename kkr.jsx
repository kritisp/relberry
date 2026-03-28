import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, Menu, X, Search, User, ChevronRight, 
  Truck, ShieldCheck, RefreshCw, Plus, Minus, 
  Trash2, ArrowLeft, CheckCircle2, Play, ArrowRight, Mail, Star, Loader2, LogOut
} from 'lucide-react';

// ==========================================
// DATA: PRINTED T-SHIRTS ONLY
// ==========================================
const PRODUCTS = [
  { id: 1, name: "Neo-Tokyo Cyber Demon Tee", price: 1499, originalPrice: 2999, category: "Anime Prints", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80", tag: "Bestseller", desc: "Heavyweight 240 GSM cotton. Drop shoulder fit with high-density neon puff print featuring cyber-demon artwork." },
  { id: 2, name: "Acid Wash 'Chaos' Typography", price: 1299, originalPrice: 2599, category: "Typography Tees", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80", tag: "New Drop", desc: "Vintage washed oversized tee with distressed edges and bold 'CHAOS' typography across the back." },
  { id: 3, name: "Graffiti Street Art Oversized", price: 1199, originalPrice: 2199, category: "Street Art Tees", image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80", desc: "Classic streetwear graphic tee featuring authentic alleyway graffiti prints." },
  { id: 4, name: "Abstract Renaissance Print", price: 1599, originalPrice: 3199, category: "Graphic Prints", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80", tag: "Trending", desc: "Constructed with premium combed cotton. Features a distorted renaissance painting graphic." },
  { id: 5, name: "Minimalist 'Vibe' Logo Tee", price: 899, originalPrice: 1799, category: "Minimal Prints", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80", desc: "The essential printed tee. Subtle high-density logo print on the chest. 100% cotton." },
  { id: 6, name: "Y2K Cyberpunk Metallic Print", price: 1699, originalPrice: 3499, category: "Graphic Prints", image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=800&q=80", desc: "Futuristic Y2K aesthetic with reflective metallic ink prints." },
  { id: 7, name: "Mecha-Godzilla Heavy Tee", price: 1799, originalPrice: 3599, category: "Anime Prints", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80", tag: "Limited", desc: "Ultra-heavyweight tee. Features an exclusive licensed Mecha-Godzilla back print." },
  { id: 8, name: "Vintage Rock Band Bootleg", price: 1399, originalPrice: 2799, category: "Typography Tees", image: "https://images.unsplash.com/photo-1588629511599-5636072efd02?w=800&q=80", desc: "Faded vintage black tee mimicking 90s rock band tour merchandise." }
];

// ==========================================
// ANIMATION HOOK & COMPONENT
// ==========================================
const Reveal = ({ children, className = "", delay = 0, direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate-y-0 translate-x-0 scale-100";
    switch (direction) {
      case "up": return "translate-y-12 scale-95";
      case "down": return "-translate-y-12 scale-95";
      case "left": return "translate-x-12 scale-95";
      case "right": return "-translate-x-12 scale-95";
      default: return "translate-y-12";
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isVisible ? 'opacity-100' : 'opacity-0'} ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};

// ==========================================
// COMPONENTS: UI Building Blocks
// ==========================================

// --- components/Navbar.jsx ---
const Navbar = ({ cartCount, navigate, currentView, onLogout }) => {
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

            {/* Profile Dropdown */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className={`text-white hover:text-[#39FF14] transition-all duration-200 hover:scale-110 active:scale-95 ${profileOpen ? 'text-[#39FF14]' : ''}`}
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
      <div className={`fixed inset-0 top-[72px] bg-[#0F0F0F]/95 backdrop-blur-2xl z-40 px-6 py-8 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden flex flex-col justify-between`}>
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
        <button 
          onClick={onLogout}
          className="flex items-center text-red-400 font-bold uppercase tracking-wider text-sm p-4 border border-red-500/20 rounded-lg justify-center mb-10 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={16} className="mr-2" /> Disconnect
        </button>
      </div>
    </nav>
  );
};

// --- components/Footer.jsx ---
const Footer = () => (
  <footer className="bg-[#050505] border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        <div className="col-span-1 md:col-span-4 lg:col-span-5">
          <h2 className="text-4xl font-black tracking-[0.1em] text-white uppercase mb-6 group cursor-default">
            Rel<span className="text-[#39FF14] group-hover:drop-shadow-[0_0_15px_rgba(57,255,20,0.6)] transition-all">berry</span>
          </h2>
          <p className="text-white/50 text-sm max-w-sm leading-relaxed mb-8 font-medium">
            Premium printed streetwear for the bold. Designed for the culture, engineered for the streets. Defying the ordinary since inception.
          </p>
          <div className="flex space-x-4">
            {['Instagram', 'Twitter', 'TikTok', 'YouTube'].map(social => (
              <button key={social} className="w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#39FF14] hover:text-[#0F0F0F] hover:border-[#39FF14] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(57,255,20,0.2)]">
                <span className="text-[10px] font-bold uppercase tracking-wider">{social.slice(0,2)}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-4 lg:col-span-3 lg:col-start-7">
          <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8 border-l-2 border-[#39FF14] pl-3">Prints</h3>
          <ul className="space-y-4 text-white/50 text-sm font-medium">
            {['Graphic Prints', 'Anime Series', 'Typography', 'Street Art', 'Minimalist Logo'].map(link => (
              <li key={link}><a href="#" className="hover:text-[#39FF14] hover:translate-x-2 inline-block transition-all duration-300">{link}</a></li>
            ))}
          </ul>
        </div>
        
        <div className="col-span-1 md:col-span-4 lg:col-span-3">
          <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8 border-l-2 border-[#39FF14] pl-3">Support</h3>
          <ul className="space-y-4 text-white/50 text-sm font-medium">
            {['Track Order', 'Shipping Policy', 'Returns & Exchanges', 'Size Guide', 'Contact Us'].map(link => (
              <li key={link}><a href="#" className="hover:text-[#39FF14] hover:translate-x-2 inline-block transition-all duration-300">{link}</a></li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/30 text-xs font-medium tracking-wide uppercase">© 2026 Relberry Streetwear. All rights reserved.</p>
        <div className="flex space-x-6 text-white/30 text-xs font-medium uppercase tracking-wider">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- components/ProductCard.jsx ---
const ProductCard = ({ product, navigate, onQuickAdd }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="group flex flex-col cursor-pointer bg-transparent rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2">
      <div 
        className="relative aspect-[3/4] overflow-hidden bg-[#111] rounded-lg border border-white/5 group-hover:border-[#39FF14]/30 group-hover:shadow-[0_10px_40px_rgba(57,255,20,0.1)] transition-all duration-500"
        onClick={() => navigate('product', { id: product.id })}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {product.tag && (
            <div className="bg-white text-[#0F0F0F] text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm shadow-lg">
              {product.tag}
            </div>
          )}
          {discount > 0 && (
            <div className="bg-[#39FF14] text-[#0F0F0F] text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm shadow-[0_0_15px_rgba(57,255,20,0.4)] w-max animate-pulse-slow">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
          <button 
            onClick={(e) => { e.stopPropagation(); onQuickAdd(product); }}
            className="w-full bg-[#39FF14] text-[#0F0F0F] py-3.5 font-black uppercase tracking-wider text-xs rounded-sm hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
          >
            <ShoppingCart size={14} /> Quick Add
          </button>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
      </div>
      
      <div className="pt-5 flex flex-col bg-transparent z-20 relative">
        <p className="text-[#39FF14] text-[10px] font-black uppercase tracking-[0.2em] mb-2">{product.category}</p>
        <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wide leading-snug group-hover:text-white transition-colors line-clamp-1 mb-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-white font-black text-lg">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-white/30 font-medium line-through text-xs">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// --- components/Toast.jsx ---
const Toast = ({ message }) => {
  if (!message) return null;
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-fade-in-up pointer-events-none">
      <div className="bg-[#111]/90 backdrop-blur-md text-white border border-[#39FF14]/50 px-6 py-4 rounded-full shadow-[0_10px_40px_rgba(57,255,20,0.2)] flex items-center space-x-3 font-bold text-xs tracking-widest uppercase">
        <CheckCircle2 size={18} className="text-[#39FF14]" />
        <span>{message}</span>
      </div>
    </div>
  );
};

// ==========================================
// PAGES: Main Views
// ==========================================

// --- pages/AuthView.jsx (THE ENHANCED HYPEBEAST ENTRY) ---
const AuthView = ({ onLogin }) => {
  const [mode, setMode] = useState('login'); 
  const [isLoading, setIsLoading] = useState(false);

  // Generate a random-looking barcode pattern
  const barcodePattern = [2, 4, 1, 3, 2, 1, 5, 1, 2, 3, 1, 4, 2, 1, 1, 3, 2, 4, 1, 2, 3, 1, 5, 2, 1, 1, 3, 2, 4, 1];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-[#0F0F0F] overflow-hidden selection:bg-[#0F0F0F] selection:text-[#E8E8E8]">
      
      {/* 1. Ambient Brand Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-[#39FF14]/15 rounded-full blur-[150px] animate-pulse-slow z-0" />

      {/* 2. Kinetic Typography / Brand Quotes */}
      <div className="absolute top-[10%] w-full rotate-[-4deg] scale-110 opacity-20 pointer-events-none z-0">
        <div className="whitespace-nowrap flex animate-[marquee_25s_linear_infinite]">
          <h1 className="text-[10vw] font-black uppercase tracking-tighter text-[#39FF14] px-8 drop-shadow-[0_0_20px_rgba(57,255,20,0.5)]">
            WEAR YOUR VIBE • NEVER ORDINARY • HEAVYWEIGHT COTTON • 
          </h1>
          <h1 className="text-[10vw] font-black uppercase tracking-tighter text-[#39FF14] px-8 drop-shadow-[0_0_20px_rgba(57,255,20,0.5)]">
            WEAR YOUR VIBE • NEVER ORDINARY • HEAVYWEIGHT COTTON • 
          </h1>
        </div>
      </div>

      <div className="absolute bottom-[10%] w-full rotate-[4deg] scale-110 opacity-20 pointer-events-none z-0">
        <div className="whitespace-nowrap flex animate-[marquee_25s_linear_infinite_reverse]">
          <h1 className="text-[10vw] font-black uppercase tracking-tighter text-transparent stroke-text px-8">
            RESTRICTED ACCESS • RELBERRY ARCHIVES • HIGH DENSITY PRINTS •
          </h1>
          <h1 className="text-[10vw] font-black uppercase tracking-tighter text-transparent stroke-text px-8">
            RESTRICTED ACCESS • RELBERRY ARCHIVES • HIGH DENSITY PRINTS •
          </h1>
        </div>
      </div>

      {/* 3. Floating T-Shirt Showcases (The "Store" Peek) */}
      <div className="absolute hidden lg:flex left-[8%] top-[15%] w-[320px] aspect-[3/4] flex-col animate-[floatLeft_8s_ease-in-out_infinite] z-10 group">
        <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent opacity-60 z-10" />
          <img src={PRODUCTS[0].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" />
          <div className="absolute bottom-6 left-6 z-20">
            <span className="bg-[#39FF14] text-[#0F0F0F] text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm shadow-[0_0_15px_rgba(57,255,20,0.4)]">
              Drop 01
            </span>
            <p className="text-white font-bold text-sm uppercase tracking-wide mt-3 drop-shadow-lg">{PRODUCTS[0].name}</p>
          </div>
        </div>
      </div>

      <div className="absolute hidden lg:flex right-[8%] bottom-[15%] w-[280px] aspect-[3/4] flex-col animate-[floatRight_9s_ease-in-out_infinite_reverse] z-10 group">
        <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent opacity-60 z-10" />
          <img src={PRODUCTS[1].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" />
          <div className="absolute top-6 right-6 z-20">
            <span className="bg-white text-[#0F0F0F] text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm shadow-lg">
              Limited
            </span>
          </div>
          <div className="absolute bottom-6 left-6 z-20 pr-6">
            <p className="text-white font-bold text-sm uppercase tracking-wide mt-3 drop-shadow-lg">{PRODUCTS[1].name}</p>
          </div>
        </div>
      </div>

      {/* 4. The Hanging "Care Tag" Form */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[12vh] md:h-[20vh] bg-[#39FF14] origin-top animate-[swing_6s_ease-in-out_infinite] z-20 shadow-[0_0_15px_#39FF14]" />
      
      <div className="relative z-30 w-full max-w-[400px] px-4 animate-[dropIn_1s_ease-out_forwards,swing_6s_ease-in-out_infinite_1s] origin-[50%_-12vh] md:origin-[50%_-20vh]">
        
        {/* The Tag Body */}
        <div className="bg-[#E8E8E8] text-[#0F0F0F] rounded-b-3xl rounded-t-2xl shadow-[0_30px_80px_rgba(0,0,0,0.9)] relative overflow-hidden flex flex-col items-center pt-10 pb-8 px-8 border border-[#D0D0D0]">
          
          {/* Subtle paper texture overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] pointer-events-none" />

          {/* The Punched Hole (Where the neon string attaches) */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#0F0F0F] shadow-inner border-[1.5px] border-black/30" />
          <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-10 h-[2px] bg-black/10" />

          {/* Header Typography */}
          <h1 className="text-5xl font-black uppercase tracking-tighter text-[#0F0F0F] mt-6 mb-1">
            RELBERRY
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/50 mb-6">
            Printed Garments // FW26
          </p>

          {/* Barcode Graphic */}
          <div className="flex h-14 w-full justify-between items-end mb-6 opacity-80 mix-blend-multiply">
            {barcodePattern.map((width, i) => (
              <div key={i} className="bg-[#0F0F0F] h-full" style={{ width: `${width}px`, height: i % 3 === 0 ? '100%' : '75%' }} />
            ))}
          </div>

          <div className="w-full border-b-2 border-dashed border-[#0F0F0F]/30 mb-8" />

          {/* Form Header */}
          <div className="w-full mb-6 text-center">
            <h2 className="text-2xl font-black uppercase tracking-tight text-[#0F0F0F] leading-none mb-1">
              Authentication
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/50">
              Required for Store Access
            </p>
          </div>

          {/* Toggle Mode */}
          <div className="flex w-full gap-4 mb-8 justify-center">
            <label className="flex items-center cursor-pointer group">
              <div className={`w-3.5 h-3.5 border-[2px] flex items-center justify-center mr-2 transition-colors ${mode === 'login' ? 'border-[#0F0F0F] bg-[#0F0F0F]' : 'border-[#0F0F0F]/30 group-hover:border-[#0F0F0F]/60'}`}>
                {mode === 'login' && <div className="w-1.5 h-1.5 bg-[#E8E8E8]" />}
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest" onClick={() => setMode('login')}>Existing</span>
            </label>
            <label className="flex items-center cursor-pointer group ml-4">
              <div className={`w-3.5 h-3.5 border-[2px] flex items-center justify-center mr-2 transition-colors ${mode === 'signup' ? 'border-[#0F0F0F] bg-[#0F0F0F]' : 'border-[#0F0F0F]/30 group-hover:border-[#0F0F0F]/60'}`}>
                {mode === 'signup' && <div className="w-1.5 h-1.5 bg-[#E8E8E8]" />}
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest" onClick={() => setMode('signup')}>New Issue</span>
            </label>
          </div>

          {/* Brutalist Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-6 relative z-10">
            
            <div className="relative">
              <label className="block text-[10px] font-black uppercase tracking-widest text-black/60 mb-1">
                ID [ EMAIL ]
              </label>
              <input 
                type="email" 
                className="w-full bg-transparent border-b-[2px] border-[#0F0F0F] px-0 py-2 text-base font-mono font-bold text-[#0F0F0F] outline-none placeholder-black/20 focus:border-[#39FF14] transition-colors rounded-none"
                placeholder="USER@DOMAIN.COM"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] font-black uppercase tracking-widest text-black/60 mb-1 flex justify-between">
                <span>PIN [ PASSKEY ]</span>
                {mode === 'login' && <span className="text-black/40 hover:text-black cursor-pointer">FORGOT?</span>}
              </label>
              <input 
                type="password" 
                className="w-full bg-transparent border-b-[2px] border-[#0F0F0F] px-0 py-2 text-base font-mono font-bold text-[#0F0F0F] outline-none placeholder-black/20 focus:border-[#39FF14] transition-colors rounded-none tracking-widest"
                placeholder="••••••••"
                required
              />
            </div>

            {mode === 'signup' && (
              <div className="relative animate-fade-in-up">
                <label className="block text-[10px] font-black uppercase tracking-widest text-black/60 mb-1">
                  VERIFY PIN
                </label>
                <input 
                  type="password" 
                  className="w-full bg-transparent border-b-[2px] border-[#0F0F0F] px-0 py-2 text-base font-mono font-bold text-[#0F0F0F] outline-none placeholder-black/20 focus:border-[#39FF14] transition-colors rounded-none tracking-widest"
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#0F0F0F] text-[#E8E8E8] py-5 font-black uppercase tracking-[0.2em] text-sm hover:bg-[#39FF14] hover:text-[#0F0F0F] hover:shadow-[0_10px_30px_rgba(57,255,20,0.4)] transition-all duration-300 flex justify-center items-center active:scale-95 disabled:opacity-50 mt-6"
            >
              {isLoading ? (
                <Loader2 className="animate-spin text-current" size={18} />
              ) : (
                <>{mode === 'login' ? 'AUTHORIZE' : 'ISSUE PASS'}</>
              )}
            </button>
          </form>

          <div className="w-full border-b-2 border-dashed border-[#0F0F0F]/30 my-8" />

          {/* Care Instructions / Guest Mode */}
          <div className="w-full text-center relative z-10">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/60 leading-relaxed mb-5">
              WASH COLD • DO NOT BLEACH <br/> DO NOT IRON OVER PRINT
            </p>
            <button 
              type="button"
              onClick={() => { setIsLoading(true); setTimeout(() => onLogin(), 1000); }}
              className="text-[11px] font-black uppercase tracking-widest text-[#0F0F0F] border-b-[2px] border-[#0F0F0F] hover:text-[#39FF14] hover:border-[#39FF14] transition-colors pb-1"
            >
              TEAR HERE FOR GUEST ACCESS
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};


// --- pages/Home.jsx ---
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
            <div className="inline-block border border-[#39FF14]/50 bg-[#39FF14]/10 backdrop-blur-md text-[#39FF14] text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full mb-8 shadow-[0_0_20px_rgba(57,255,20,0.2)]">
              Exclusive Printed Collection 2026
            </div>
          </Reveal>
          
          <Reveal delay={300}>
            <h1 className="text-5xl md:text-[6rem] lg:text-[8rem] font-black text-white uppercase tracking-tighter leading-[0.85] mb-8 drop-shadow-2xl">
              Prints That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#39FF14] to-emerald-500 filter drop-shadow-[0_0_30px_rgba(57,255,20,0.4)]">
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
                className="group relative px-10 py-5 bg-[#39FF14] text-[#0F0F0F] font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm hover:shadow-[0_0_40px_rgba(57,255,20,0.6)] hover:-translate-y-1 active:scale-95 overflow-hidden flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center">Shop New Drops <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" /></span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Floating background elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#39FF14]/10 rounded-full blur-[100px] animate-pulse-slow z-0" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow z-0" style={{ animationDelay: '2s' }} />

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce opacity-70">
          <span className="text-[#39FF14] text-[9px] uppercase tracking-[0.3em] mb-2 font-black">Scroll</span>
          <div className="w-[2px] h-12 bg-gradient-to-b from-[#39FF14] to-transparent" />
        </div>
      </section>

      {/* 🔥 CATEGORIES (PRINTED T-SHIRTS ONLY) */}
      <section className="py-32 bg-[#0F0F0F]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <Reveal>
             <div className="text-center mb-16">
               <span className="text-[#39FF14] text-xs font-black uppercase tracking-[0.2em] mb-4 block">Shop By Aesthetic</span>
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
                  className="group relative aspect-[3/4] overflow-hidden cursor-pointer rounded-lg border border-white/5 hover:border-[#39FF14]/50 transition-colors duration-500"
                >
                  <img src={cat.img} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" alt={cat.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center z-10">
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter translate-y-6 group-hover:translate-y-0 group-hover:text-[#39FF14] transition-all duration-500">
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#39FF14]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-[#39FF14] text-xs font-black uppercase tracking-[0.2em] mb-4 block flex items-center"><div className="w-2 h-2 bg-[#39FF14] rounded-full animate-ping mr-3"/> Just Dropped</span>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">Fresh Prints</h2>
              </div>
              <button 
                onClick={() => navigate('shop')}
                className="hidden md:flex items-center text-white/50 hover:text-[#39FF14] font-bold uppercase tracking-[0.15em] text-xs transition-colors group"
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
          <img 
            src="https://images.unsplash.com/photo-1523398002811-999aa8e92d0c?w=1600&q=80" 
            alt="Campaign" 
            className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[10s] ease-linear"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-[#0F0F0F]" />
          <div className="absolute inset-0 bg-[#39FF14]/5 mix-blend-overlay" />
        </div>
        
        <Reveal>
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#39FF14] group-hover:border-[#39FF14] group-hover:scale-110 transition-all duration-500 mb-8 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(57,255,20,0.5)]">
              <Play size={32} className="text-white group-hover:text-[#0F0F0F] translate-x-1 transition-colors" fill="currentColor" />
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-2xl">
              The Underground <br/><span className="text-[#39FF14]">Print Series</span>
            </h2>
            <button 
              onClick={() => navigate('shop')}
              className="text-white font-black uppercase tracking-[0.3em] text-xs border-b-2 border-[#39FF14] pb-2 hover:text-[#39FF14] hover:tracking-[0.4em] transition-all duration-300"
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
                <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-[#39FF14] rounded-lg -z-10 group-hover:-bottom-6 group-hover:-right-6 transition-all duration-500" />
              </div>
            </Reveal>
            
            <div className="space-y-10">
              <Reveal delay={100}>
                <span className="text-[#39FF14] text-xs font-black uppercase tracking-[0.2em]">Why Relberry?</span>
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
                    <div className="border-l-2 border-[#39FF14] pl-6">
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
              <p className="text-[#39FF14] font-bold uppercase tracking-widest text-xs">Rated 4.9/5 by 10,000+ hypebeasts</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Rahul S.", text: "The puff print on the Cyber Demon tee is insane. Best pump cover I own right now.", rating: 5 },
              { name: "Vikram M.", text: "Quality matches international brands that cost 3x more. The 240GSM cotton feels heavily premium.", rating: 5 },
              { name: "Aman K.", text: "Washed my Acid Wash tee like 10 times, print hasn't faded a bit. Insane durability.", rating: 5 }
            ].map((review, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="bg-[#111] border border-white/5 p-8 rounded-lg hover:border-[#39FF14]/30 transition-colors duration-300">
                  <div className="flex text-[#39FF14] mb-6">
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-[#39FF14]/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
        <Reveal>
          <div className="max-w-2xl mx-auto px-6 relative z-10">
            <Mail size={48} className="mx-auto text-[#39FF14] mb-8 stroke-1" />
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
                className="flex-grow bg-[#111] border border-white/10 text-white px-6 py-4 rounded-sm outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] transition-all text-xs font-bold tracking-widest uppercase placeholder-white/30 text-center sm:text-left"
              />
              <button className="bg-[#39FF14] text-[#0F0F0F] px-10 py-4 font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-300 rounded-sm hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] active:scale-95 sm:w-auto w-full">
                Subscribe
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

// --- pages/Shop.jsx ---
const ShopView = ({ navigate, addToCart }) => {
  return (
    <div className="w-full bg-[#0F0F0F] min-h-screen pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="mb-16">
            <h1 className="text-5xl md:text-[6rem] font-black text-white uppercase tracking-tighter mb-8 leading-none drop-shadow-lg">All Prints</h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-8 gap-6">
              <p className="text-white/50 text-xs font-bold uppercase tracking-[0.1em]">{PRODUCTS.length} Styles found</p>
              <div className="flex items-center space-x-4">
                <span className="text-white/50 text-xs font-bold uppercase tracking-[0.1em]">Sort By</span>
                <select className="bg-transparent border-none text-white font-bold uppercase tracking-wider text-sm outline-none focus:ring-0 cursor-pointer appearance-none bg-[#0F0F0F]">
                  <option>Featured Drops</option>
                  <option>New Arrivals</option>
                  <option>Price: Low-High</option>
                  <option>Price: High-Low</option>
                </select>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-32 space-y-12">
              <Reveal delay={100} direction="right">
                <div>
                  <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-6 border-l-2 border-[#39FF14] pl-3">Aesthetic</h3>
                  <ul className="space-y-4">
                    {['All Prints', 'Graphic Tees', 'Anime Art', 'Typography', 'Street Art'].map((cat, i) => (
                      <li key={cat} className={`text-sm font-bold uppercase tracking-wider cursor-pointer transition-colors hover:translate-x-2 duration-300 ${i === 0 ? 'text-[#39FF14]' : 'text-white/50 hover:text-white'}`}>
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={200} direction="right">
                <div>
                  <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-6 border-l-2 border-[#39FF14] pl-3">Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <button key={size} className="border border-white/5 bg-[#111] text-white/50 py-3 text-xs font-bold hover:border-[#39FF14] hover:text-[#39FF14] hover:bg-[#39FF14]/5 transition-all duration-300 rounded-sm active:scale-95">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="flex-grow">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
              {PRODUCTS.map((product, i) => (
                <Reveal key={product.id} delay={i * 50}>
                  <ProductCard 
                    product={product} 
                    navigate={navigate} 
                    onQuickAdd={(p) => addToCart(p, 'L', 1)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- pages/ProductDetail.jsx ---
const ProductDetailView = ({ product, navigate, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  return (
    <div className="w-full bg-[#0F0F0F] min-h-screen pt-24 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        <Reveal direction="down">
          <button 
            onClick={() => navigate('shop')}
            className="flex items-center text-white/50 hover:text-[#39FF14] mb-8 transition-colors text-xs font-bold uppercase tracking-[0.1em] group"
          >
            <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-2 transition-transform" /> Back To Shop
          </button>
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          <div className="w-full lg:w-[55%] flex flex-col gap-6">
            {[product.image, product.image].map((img, idx) => (
              <Reveal key={idx} delay={idx * 150} direction="right">
                <div className="w-full aspect-[4/5] bg-[#111] overflow-hidden rounded-lg relative border border-white/5 group cursor-zoom-in">
                   {idx === 0 && (
                     <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
                       {product.tag && (
                        <div className="bg-[#39FF14] text-[#0F0F0F] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                          {product.tag}
                        </div>
                       )}
                       {discount > 0 && (
                        <div className="bg-white text-[#0F0F0F] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 shadow-lg w-max">
                          {discount}% OFF
                        </div>
                       )}
                     </div>
                  )}
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" />
                </div>
              </Reveal>
            ))}
          </div>

          <div className="w-full lg:w-[45%]">
            <div className="lg:sticky top-32 py-4">
              <Reveal delay={100} direction="left">
                <p className="text-[#39FF14] text-xs font-black uppercase tracking-[0.2em] mb-4 drop-shadow-[0_0_10px_rgba(57,255,20,0.3)]">{product.category}</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-[0.9]">
                  {product.name}
                </h1>
                
                <div className="flex items-baseline space-x-4 mb-8">
                  <span className="text-3xl md:text-4xl font-black text-white">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-white/30 line-through text-xl font-medium">₹{product.originalPrice}</span>
                  )}
                </div>

                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-12 font-medium">
                  {product.desc} Constructed with precise attention to detail. Heavyweight 240GSM combed cotton, drop shoulder fit, and high-density cracking-resistant print. Engineered for the streets.
                </p>
              </Reveal>

              <Reveal delay={200} direction="left">
                <div className="mb-10">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-white text-xs font-black uppercase tracking-[0.15em]">Select Size</span>
                    <button className="text-white/40 hover:text-[#39FF14] text-xs font-bold underline tracking-wider transition-colors">Size Guide</button>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {['S', 'M', 'L', 'XL'].map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`relative py-4 text-sm font-black uppercase tracking-wider transition-all duration-300 rounded-sm border ${
                          selectedSize === size 
                            ? 'border-[#39FF14] bg-[#39FF14]/10 text-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.2)] scale-105' 
                            : 'border-white/10 bg-[#111] text-white/50 hover:border-white/30 hover:text-white hover:bg-white/5 active:scale-95'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-12">
                  <span className="text-white text-xs font-black uppercase tracking-[0.15em] block mb-4">Quantity</span>
                  <div className="flex items-center w-32 border border-white/20 bg-[#111] rounded-sm">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-12 flex items-center justify-center text-white/60 hover:text-[#39FF14] transition-colors"><Minus size={16} /></button>
                    <div className="flex-1 h-12 flex items-center justify-center text-white font-black text-sm">{quantity}</div>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-12 flex items-center justify-center text-white/60 hover:text-[#39FF14] transition-colors"><Plus size={16} /></button>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={300} direction="left">
                <div className="flex flex-col gap-4 hidden md:flex">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full border border-[#39FF14] bg-[#39FF14]/5 text-[#39FF14] py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-[#39FF14] hover:text-[#0F0F0F] transition-all duration-300 rounded-sm hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] active:scale-[0.98]"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => { handleAddToCart(); navigate('checkout'); }}
                    className="w-full bg-white text-[#0F0F0F] py-5 font-black uppercase tracking-[0.2em] text-xs rounded-sm hover:bg-[#EAEAEA] transition-colors hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98]"
                  >
                    Buy Now
                  </button>
                </div>
              </Reveal>

              <Reveal delay={400} direction="left">
                <div className="mt-12 space-y-5 pt-8 border-t border-white/10 bg-[#111] p-6 rounded-lg border-l-2 border-l-[#39FF14]">
                  <div className="flex items-center text-white/70 text-xs font-bold uppercase tracking-widest">
                    <Truck size={18} className="mr-4 text-[#39FF14] stroke-[1.5]" /> Free shipping over ₹2000
                  </div>
                  <div className="flex items-center text-white/70 text-xs font-bold uppercase tracking-widest">
                    <ShieldCheck size={18} className="mr-4 text-[#39FF14] stroke-[1.5]" /> High-Density Print Guarantee
                  </div>
                  <div className="flex items-center text-white/70 text-xs font-bold uppercase tracking-widest">
                    <RefreshCw size={18} className="mr-4 text-[#39FF14] stroke-[1.5]" /> 7-Day hassle-free returns
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bottom CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0F0F0F]/90 backdrop-blur-xl border-t border-white/10 p-4 z-50 animate-fade-in-up">
         <div className="flex gap-3">
            <button 
              onClick={handleAddToCart}
              className="flex-1 border border-[#39FF14] text-[#39FF14] py-4 font-black uppercase tracking-wider text-xs rounded-sm active:bg-[#39FF14]/20"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => { handleAddToCart(); navigate('checkout'); }}
              className="flex-1 bg-[#39FF14] text-[#0F0F0F] py-4 font-black uppercase tracking-wider text-xs rounded-sm shadow-[0_0_15px_rgba(57,255,20,0.3)] active:scale-[0.98]"
            >
              Buy Now
            </button>
         </div>
      </div>
    </div>
  );
};

// --- pages/Cart.jsx ---
const CartView = ({ cart, updateQuantity, removeFromCart, navigate }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + (cart.length > 0 ? shipping : 0);

  return (
    <div className="w-full bg-[#0F0F0F] min-h-screen pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Reveal>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-12 leading-none">Your Cart</h1>
        </Reveal>
        
        {cart.length === 0 ? (
          <Reveal delay={100}>
            <div className="py-32 border border-white/10 bg-[#111] rounded-lg text-center shadow-2xl">
              <ShoppingCart size={48} className="mx-auto text-white/20 mb-6" strokeWidth={1} />
              <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-6">Your cart is empty</h2>
              <button 
                onClick={() => navigate('shop')}
                className="bg-[#39FF14] text-[#0F0F0F] px-8 py-4 font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-300 rounded-sm shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:scale-105"
              >
                Continue Shopping
              </button>
            </div>
          </Reveal>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="flex-grow">
              <div className="border-b border-white/10 pb-6 hidden md:grid grid-cols-12 text-white/40 font-bold uppercase tracking-[0.15em] text-xs">
                <div className="col-span-6">Printed Tee</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>
              
              <div className="divide-y divide-white/10 border-b border-white/10">
                {cart.map((item, i) => (
                  <Reveal key={`${item.id}-${item.size}`} delay={i * 100}>
                    <div className="py-8 flex flex-col md:grid md:grid-cols-12 gap-6 items-center relative group">
                      <button 
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="absolute top-8 right-0 text-white/30 hover:text-[#39FF14] md:hidden transition-colors"
                      >
                        <X size={20} />
                      </button>

                      <div className="col-span-6 flex items-center w-full">
                        <div className="w-24 h-32 flex-shrink-0 bg-[#111] rounded-sm overflow-hidden mr-6 border border-white/5 group-hover:border-[#39FF14]/30 transition-colors">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-base md:text-lg uppercase tracking-wide leading-tight mb-2 pr-8 md:pr-0 group-hover:text-[#39FF14] transition-colors">{item.name}</h3>
                          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Size: <span className="text-white">{item.size}</span></p>
                          <p className="text-white font-black md:hidden">₹{item.price}</p>
                        </div>
                      </div>
                      
                      <div className="col-span-3 w-full md:w-auto flex justify-between md:justify-center items-center mt-2 md:mt-0">
                        <div className="flex items-center border border-white/20 bg-[#111] rounded-sm">
                          <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-[#39FF14] transition-colors"><Minus size={14} /></button>
                          <div className="w-10 h-10 flex items-center justify-center text-white font-black text-sm">{item.quantity}</div>
                          <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-[#39FF14] transition-colors"><Plus size={14} /></button>
                        </div>
                      </div>

                      <div className="col-span-3 text-right hidden md:flex flex-col items-end justify-center">
                        <span className="text-white font-black text-xl mb-4">₹{item.price * item.quantity}</span>
                        <button 
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-white/30 hover:text-[#39FF14] text-[10px] font-black uppercase tracking-[0.2em] transition-colors flex items-center border-b border-transparent hover:border-[#39FF14]"
                        >
                           <Trash2 size={12} className="mr-1.5" /> Remove
                        </button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-[420px] flex-shrink-0">
              <Reveal delay={200} direction="left">
                <div className="bg-[#111] p-8 md:p-10 rounded-lg lg:sticky top-32 border border-white/10 shadow-2xl">
                  <h2 className="text-xl font-black text-white uppercase tracking-[0.1em] mb-8 border-b border-white/10 pb-6 border-l-4 border-l-[#39FF14] pl-3">Order Summary</h2>
                  
                  <div className="space-y-5 mb-8 text-sm font-bold uppercase tracking-wider">
                    <div className="flex justify-between text-white/60">
                      <span>Subtotal</span>
                      <span className="text-white">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Shipping</span>
                      <span className="text-[#39FF14]">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>
                    {shipping > 0 && (
                      <div className="bg-[#39FF14]/10 border border-[#39FF14]/20 p-3 rounded-sm">
                         <p className="text-[#39FF14] text-[10px] tracking-widest uppercase text-center">Add ₹{2000 - subtotal} more for free shipping</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-white/10 pt-6 mb-10 flex justify-between items-end">
                    <span className="text-white text-sm font-black uppercase tracking-[0.2em]">Total</span>
                    <span className="text-4xl font-black text-white leading-none">₹{total}</span>
                  </div>
                  
                  <button 
                    onClick={() => navigate('checkout')}
                    className="w-full bg-[#39FF14] text-[#0F0F0F] py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-300 rounded-sm shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] active:scale-95 hover:-translate-y-1"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- pages/Checkout.jsx ---
const CheckoutView = ({ cart, navigate }) => {
  const [paymentMethod, setPaymentMethod] = useState('online');
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully! (This is a dummy action)");
    navigate('home');
  };

  if (cart.length === 0) {
    return (
      <div className="w-full bg-[#0F0F0F] min-h-screen flex items-center justify-center">
        <button onClick={() => navigate('shop')} className="text-[#39FF14] font-black uppercase tracking-[0.2em] border-b-2 border-[#39FF14] pb-1 hover:text-white hover:border-white transition-colors">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0F0F0F] min-h-screen pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        <Reveal>
          <button 
            onClick={() => navigate('cart')}
            className="flex items-center text-white/50 hover:text-white mb-10 transition-colors text-xs font-bold uppercase tracking-[0.1em] group"
          >
            <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-1 transition-transform" /> Back to Cart
          </button>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-16 leading-none">Checkout</h1>
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-grow">
            <Reveal delay={100} direction="right">
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-12">
                
                <div className="space-y-8 bg-[#111] p-8 md:p-10 border border-white/5 rounded-lg shadow-xl">
                  <h2 className="text-lg font-black text-[#39FF14] uppercase tracking-[0.15em] border-b border-white/10 pb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['First Name', 'Last Name'].map((label, i) => (
                      <div key={i}>
                        <input required type="text" placeholder={label} className="w-full bg-transparent border-b border-white/20 px-2 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#39FF14] focus:bg-white/5 transition-all font-medium text-sm rounded-t-sm" />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <input required type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/20 px-2 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#39FF14] focus:bg-white/5 transition-all font-medium text-sm rounded-t-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <input required type="text" placeholder="Street Address" className="w-full bg-transparent border-b border-white/20 px-2 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#39FF14] focus:bg-white/5 transition-all font-medium text-sm rounded-t-sm" />
                    </div>
                    {['City', 'PIN Code'].map((label, i) => (
                      <div key={i}>
                        <input required type="text" placeholder={label} className="w-full bg-transparent border-b border-white/20 px-2 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#39FF14] focus:bg-white/5 transition-all font-medium text-sm rounded-t-sm" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8 bg-[#111] p-8 md:p-10 border border-white/5 rounded-lg shadow-xl">
                  <h2 className="text-lg font-black text-[#39FF14] uppercase tracking-[0.15em] border-b border-white/10 pb-4">Payment Method</h2>
                  <div className="space-y-4">
                    <label className={`flex items-center p-6 border transition-all duration-300 cursor-pointer rounded-sm ${paymentMethod === 'online' ? 'border-[#39FF14] bg-[#39FF14]/5 shadow-[0_0_15px_rgba(57,255,20,0.15)] scale-[1.02]' : 'border-white/10 hover:border-white/30 bg-[#0F0F0F]'}`}>
                      <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} className="accent-[#39FF14] w-5 h-5 mr-6" />
                      <div>
                        <p className="text-white font-black uppercase tracking-wide text-sm mb-1">Online Payment</p>
                        <p className="text-white/40 text-xs uppercase tracking-widest font-bold">UPI / Cards / Netbanking</p>
                      </div>
                    </label>
                    <label className={`flex items-center p-6 border transition-all duration-300 cursor-pointer rounded-sm ${paymentMethod === 'cod' ? 'border-[#39FF14] bg-[#39FF14]/5 shadow-[0_0_15px_rgba(57,255,20,0.15)] scale-[1.02]' : 'border-white/10 hover:border-white/30 bg-[#0F0F0F]'}`}>
                      <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-[#39FF14] w-5 h-5 mr-6" />
                      <div>
                        <p className="text-white font-black uppercase tracking-wide text-sm mb-1">Cash on Delivery</p>
                        <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Pay upon receipt</p>
                      </div>
                    </label>
                  </div>
                </div>

              </form>
            </Reveal>
          </div>

          <div className="w-full lg:w-[450px] flex-shrink-0">
             <Reveal delay={200} direction="left">
               <div className="bg-[#111] p-8 md:p-10 rounded-lg lg:sticky top-32 border border-white/10 shadow-2xl">
                  <h2 className="text-lg font-black text-white uppercase tracking-[0.15em] mb-8 border-b border-white/10 pb-4">Your Order</h2>
                  
                  <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-4 hide-scrollbar">
                    {cart.map(item => (
                      <div key={`${item.id}-${item.size}`} className="flex items-center gap-6 group">
                        <div className="relative flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-sm bg-[#0F0F0F] border border-white/5" />
                          <span className="absolute -top-2 -right-2 bg-[#39FF14] text-[#0F0F0F] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-grow">
                          <p className="text-white font-bold text-sm uppercase tracking-wide leading-tight line-clamp-2 mb-1 group-hover:text-[#39FF14] transition-colors">{item.name}</p>
                          <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Size: {item.size}</p>
                        </div>
                        <div className="text-white font-black text-sm whitespace-nowrap">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-6 space-y-4 mb-8 text-sm font-bold uppercase tracking-wider">
                    <div className="flex justify-between text-white/60">
                      <span>Subtotal</span>
                      <span className="text-white">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Shipping</span>
                      <span className="text-[#39FF14]">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between items-end pt-6 border-t border-white/10">
                      <span className="text-white font-black">Total</span>
                      <span className="text-3xl font-black text-[#39FF14] leading-none drop-shadow-[0_0_10px_rgba(57,255,20,0.3)]">₹{total}</span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    form="checkout-form"
                    className="w-full bg-[#39FF14] text-[#0F0F0F] py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 rounded-sm active:scale-95 hover:-translate-y-1"
                  >
                    {paymentMethod === 'cod' ? 'Confirm Order' : 'Proceed to Pay'}
                  </button>
               </div>
             </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// MAIN APP COMPONENT (Entry Point & State)
// ==========================================

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Auth State
  const [currentView, setCurrentView] = useState('home'); 
  const [params, setParams] = useState({}); 
  const [cart, setCart] = useState([]);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, params, isLoggedIn]);

  const navigate = (view, newParams = {}) => {
    setCurrentView(view);
    setParams(newParams);
  };

  const showToast = (message) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]);
  };

  const addToCart = (product, size, quantity) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.size === size) 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, size, quantity }];
    });
    showToast(`Added ${product.name} to cart`);
  };

  const updateQuantity = (id, size, newQty) => {
    if (newQty < 1) return;
    setCart(prev => prev.map(item => 
      (item.id === id && item.size === size) ? { ...item, quantity: newQty } : item
    ));
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const renderView = () => {
    if (!isLoggedIn) {
      return <AuthView onLogin={handleLogin} />;
    }

    switch (currentView) {
      case 'home':
        return <HomeView navigate={navigate} addToCart={addToCart} />;
      case 'shop':
        return <ShopView navigate={navigate} addToCart={addToCart} />;
      case 'product':
        const product = PRODUCTS.find(p => p.id === params.id);
        return <ProductDetailView product={product} navigate={navigate} addToCart={addToCart} />;
      case 'cart':
        return <CartView cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} navigate={navigate} />;
      case 'checkout':
        return <CheckoutView cart={cart} navigate={navigate} />;
      default:
        return <HomeView navigate={navigate} addToCart={addToCart} />;
    }
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="font-sans text-zinc-50 bg-[#0F0F0F] min-h-screen flex flex-col selection:bg-[#39FF14] selection:text-[#0F0F0F] antialiased scroll-smooth">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #0F0F0F; overflow-x: hidden; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Premium Custom Keyframes */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes dropIn {
          0% { transform: translateY(-100vh) rotate(-10deg); opacity: 0; }
          60% { transform: translateY(20px) rotate(5deg); opacity: 1; }
          80% { transform: translateY(-10px) rotate(-2deg); }
          100% { transform: translateY(0) rotate(0deg); opacity: 1; }
        }
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          75% { transform: rotate(-2deg); }
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee_reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes floatLeft {
          0%, 100% { transform: translateY(0) rotate(-12deg); }
          50% { transform: translateY(-20px) rotate(-8deg); }
        }
        @keyframes floatRight {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(16deg); }
        }
        
        /* Utility Classes */
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
          color: transparent;
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-pulse-slow { animation: pulseGlow 4s ease-in-out infinite; }
        .animate-pulse-fast { animation: pulseGlow 1.5s ease-in-out infinite; }
        .animate-[marquee_25s_linear_infinite] { animation: marquee 25s linear infinite; }
        .animate-[marquee_25s_linear_infinite_reverse] { animation: marquee_reverse 25s linear infinite; }
      `}} />

      {isLoggedIn && (
        <Navbar 
          cartCount={totalCartItems} 
          navigate={navigate} 
          currentView={currentView} 
          onLogout={handleLogout} 
        />
      )}
      
      <main className="flex-grow w-full">
        {renderView()}
      </main>
      
      {isLoggedIn && <Footer />}
      
      <Toast message={toastMsg} />
    </div>
  );
}