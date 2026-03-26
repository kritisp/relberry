import React from 'react';

const Footer = () => (
  <footer className="bg-[#050505] border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        <div className="col-span-1 md:col-span-4 lg:col-span-5">
          <h2 className="text-4xl font-black tracking-[0.1em] text-white uppercase mb-6 group cursor-default">
            Rel<span className="text-[#D4AF37] group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.6)] transition-all">berry</span>
          </h2>
          <p className="text-white/50 text-sm max-w-sm leading-relaxed mb-8 font-medium">
            Premium printed streetwear for the bold. Designed for the culture, engineered for the streets. Defying the ordinary since inception.
          </p>
          <div className="flex space-x-4">
            {['Instagram', 'Twitter', 'TikTok', 'YouTube'].map(social => (
              <button key={social} className="w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#D4AF37] hover:text-[#0F0F0F] hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(212,175,55,0.2)]">
                <span className="text-[10px] font-bold uppercase tracking-wider">{social.slice(0,2)}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-4 lg:col-span-3 lg:col-start-7">
          <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8 border-l-2 border-[#D4AF37] pl-3">Prints</h3>
          <ul className="space-y-4 text-white/50 text-sm font-medium">
            {['Graphic Prints', 'Anime Series', 'Typography', 'Street Art', 'Minimalist Logo'].map(link => (
              <li key={link}><a href="#" className="hover:text-[#D4AF37] hover:translate-x-2 inline-block transition-all duration-300">{link}</a></li>
            ))}
          </ul>
        </div>
        
        <div className="col-span-1 md:col-span-4 lg:col-span-3">
          <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8 border-l-2 border-[#D4AF37] pl-3">Support</h3>
          <ul className="space-y-4 text-white/50 text-sm font-medium">
            {['Track Order', 'Shipping Policy', 'Returns & Exchanges', 'Size Guide', 'Contact Us'].map(link => (
              <li key={link}><a href="#" className="hover:text-[#D4AF37] hover:translate-x-2 inline-block transition-all duration-300">{link}</a></li>
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

export default Footer;
