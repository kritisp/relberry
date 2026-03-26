import React from 'react';
import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react';
import Reveal from '../components/Reveal';

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
                className="bg-gold-metallic text-[#0F0F0F] px-8 py-4 font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-300 rounded-sm shadow-[0_0_20px_rgba(255,214,78,0.3)] hover:scale-105"
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
                        className="absolute top-8 right-0 text-white/30 hover:text-gold-metallic md:hidden transition-colors"
                      >
                        <X size={20} />
                      </button>

                      <div className="col-span-6 flex items-center w-full">
                        <div className="w-24 h-32 flex-shrink-0 bg-[#111] rounded-sm overflow-hidden mr-6 border border-white/5 group-hover:border-gold-metallic/30 transition-colors">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-base md:text-lg uppercase tracking-wide leading-tight mb-2 pr-8 md:pr-0 group-hover:text-gold-metallic transition-colors">{item.name}</h3>
                          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Size: <span className="text-white">{item.size}</span></p>
                          <p className="text-white font-black md:hidden">₹{item.price}</p>
                        </div>
                      </div>
                      
                      <div className="col-span-3 w-full md:w-auto flex justify-between md:justify-center items-center mt-2 md:mt-0">
                        <div className="flex items-center border border-white/20 bg-[#111] rounded-sm">
                          <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-gold-metallic transition-colors"><Minus size={14} /></button>
                          <div className="w-10 h-10 flex items-center justify-center text-white font-black text-sm">{item.quantity}</div>
                          <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-gold-metallic transition-colors"><Plus size={14} /></button>
                        </div>
                      </div>

                      <div className="col-span-3 text-right hidden md:flex flex-col items-end justify-center">
                        <span className="text-white font-black text-xl mb-4">₹{item.price * item.quantity}</span>
                        <button 
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-white/30 hover:text-gold-metallic text-[10px] font-black uppercase tracking-[0.2em] transition-colors flex items-center border-b border-transparent hover:border-gold-metallic"
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
                  <h2 className="text-xl font-black text-white uppercase tracking-[0.1em] mb-8 border-b border-white/10 pb-6 border-l-4 border-l-[#d4af37] pl-3">Order Summary</h2>
                  
                  <div className="space-y-5 mb-8 text-sm font-bold uppercase tracking-wider">
                    <div className="flex justify-between text-white/60">
                      <span>Subtotal</span>
                      <span className="text-white">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Shipping</span>
                      <span className="text-gold-metallic">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>
                    {shipping > 0 && (
                      <div className="bg-gold-metallic/10 border border-gold-metallic/20 p-3 rounded-sm">
                         <p className="text-gold-metallic text-[10px] tracking-widest uppercase text-center">Add ₹{2000 - subtotal} more for free shipping</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-white/10 pt-6 mb-10 flex justify-between items-end">
                    <span className="text-white text-sm font-black uppercase tracking-[0.2em]">Total</span>
                    <span className="text-4xl font-black text-white leading-none">₹{total}</span>
                  </div>
                  
                  <button 
                    onClick={() => navigate('checkout')}
                    className="w-full bg-gold-metallic text-[#0F0F0F] py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-300 rounded-sm shadow-[0_0_20px_rgba(255,214,78,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] active:scale-95 hover:-translate-y-1"
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

export default CartView;
