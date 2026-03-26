import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import Reveal from '../components/Reveal';

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
            className="flex items-center text-white/50 hover:text-[#D4AF37] mb-8 transition-colors text-xs font-bold uppercase tracking-[0.1em] group"
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
                        <div className="bg-[#D4AF37] text-[#0F0F0F] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
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
                <p className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em] mb-4 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">{product.category}</p>
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
                    <button className="text-white/40 hover:text-[#D4AF37] text-xs font-bold underline tracking-wider transition-colors">Size Guide</button>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {['S', 'M', 'L', 'XL'].map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`relative py-4 text-sm font-black uppercase tracking-wider transition-all duration-300 rounded-sm border ${
                          selectedSize === size 
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)] scale-105' 
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
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-12 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors"><Minus size={16} /></button>
                    <div className="flex-1 h-12 flex items-center justify-center text-white font-black text-sm">{quantity}</div>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-12 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors"><Plus size={16} /></button>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={300} direction="left">
                <div className="flex flex-col gap-4 hidden md:flex">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full border border-[#D4AF37] bg-[#D4AF37]/5 text-[#D4AF37] py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-[#D4AF37] hover:text-[#0F0F0F] transition-all duration-300 rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] active:scale-[0.98]"
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
                <div className="mt-12 space-y-5 pt-8 border-t border-white/10 bg-[#111] p-6 rounded-lg border-l-2 border-l-[#D4AF37]">
                  <div className="flex items-center text-white/70 text-xs font-bold uppercase tracking-widest">
                    <span className="mr-4 text-[#D4AF37]">🚚</span> Free shipping over ₹2000
                  </div>
                  <div className="flex items-center text-white/70 text-xs font-bold uppercase tracking-widest">
                    <span className="mr-4 text-[#D4AF37]">🛡️</span> High-Density Print Guarantee
                  </div>
                  <div className="flex items-center text-white/70 text-xs font-bold uppercase tracking-widest">
                    <span className="mr-4 text-[#D4AF37]">↻</span> 7-Day hassle-free returns
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
              className="flex-1 border border-[#D4AF37] text-[#D4AF37] py-4 font-black uppercase tracking-wider text-xs rounded-sm active:bg-[#D4AF37]/20"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => { handleAddToCart(); navigate('checkout'); }}
              className="flex-1 bg-[#D4AF37] text-[#0F0F0F] py-4 font-black uppercase tracking-wider text-xs rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.3)] active:scale-[0.98]"
            >
              Buy Now
            </button>
         </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
