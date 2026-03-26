import React from 'react';
import { PRODUCTS } from '../data/products';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';

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

export default ShopView;
