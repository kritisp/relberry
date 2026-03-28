import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';

const WishlistView = ({ wishlist, navigate, addToCart, toggleWishlist }) => {
  return (
    <div className="w-full bg-[#0F0F0F] min-h-screen pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="mb-16 border-b border-white/10 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="text-7xl md:text-[8rem] heading-caveat text-white capitalize leading-none drop-shadow-lg gold-hover cursor-pointer pt-6">Wishlist</h1>
              <p className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.1em] mt-4 flex items-center">
                <Heart size={14} className="mr-2 fill-[#d4af37]" /> {wishlist.length} Saved Items
              </p>
            </div>
            <button 
              onClick={() => navigate('shop')}
              className="text-white/50 hover:text-white font-bold uppercase tracking-[0.15em] text-xs transition-colors flex items-center group"
            >
              Continue Shopping <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </Reveal>

        {wishlist.length === 0 ? (
          <Reveal delay={100}>
            <div className="py-32 border border-white/10 bg-[#111] rounded-lg text-center shadow-2xl flex flex-col items-center">
              <Heart size={56} className="text-white/10 mb-6" strokeWidth={1} />
              <h2 className="text-5xl md:text-[4.5rem] heading-caveat text-white capitalize mb-4 drop-shadow-lg gold-hover cursor-pointer">No saved tees yet.</h2>
              <p className="text-white/50 text-sm font-medium mb-8 max-w-md">
                Your wishlist is empty. Tap the heart icon on any product to save it for later.
              </p>
              <button 
                onClick={() => navigate('shop')}
                className="bg-gold-metallic text-[#0F0F0F] px-10 py-4 font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95"
              >
                Explore Tees
              </button>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
            {wishlist.map((product, i) => (
              <Reveal key={product.id} delay={i * 50}>
                <ProductCard 
                  product={product} 
                  navigate={navigate} 
                  onQuickAdd={(p) => addToCart(p, 'L', 1)}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistView;
