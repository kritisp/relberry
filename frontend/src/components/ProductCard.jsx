import React from 'react';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, navigate, onQuickAdd }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="group flex flex-col cursor-pointer bg-transparent rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2">
      <div 
        className="relative aspect-[3/4] overflow-hidden bg-[#111] rounded-lg border border-white/5 group-hover:border-[#D4AF37]/30 group-hover:shadow-[0_10px_40px_rgba(212,175,55,0.1)] transition-all duration-500"
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
            <div className="bg-[#D4AF37] text-[#0F0F0F] text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.4)] w-max animate-pulse-slow">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
          <button 
            onClick={(e) => { e.stopPropagation(); onQuickAdd(product); }}
            className="w-full bg-[#D4AF37] text-[#0F0F0F] py-3.5 font-black uppercase tracking-wider text-xs rounded-sm hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
          >
            <ShoppingCart size={14} /> Quick Add
          </button>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
      </div>
      
      <div className="pt-5 flex flex-col bg-transparent z-20 relative">
        <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] mb-2">{product.category}</p>
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

export default ProductCard;
