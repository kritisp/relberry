import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Reveal from '../components/Reveal';

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

export default CheckoutView;
