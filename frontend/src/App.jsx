import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomeView from './pages/Home';
import ShopView from './pages/Shop';
import ProductDetailView from './pages/ProductDetail';
import CartView from './pages/Cart';
import CheckoutView from './pages/Checkout';
import AuthView from './pages/Auth';
import AboutView from './pages/About';
import WishlistView from './pages/Wishlist';
import { PRODUCTS } from './data/products';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [params, setParams] = useState({});
  const [cart, setCart] = useState([]);
  const [toastMsg, setToastMsg] = useState('');

  // Wishlist State with localStorage Persistence
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('relberry_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Sync wishlist to localStorage on change
  useEffect(() => {
    localStorage.setItem('relberry_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, params, isAuthenticated]);

  const navigate = (view, newParams = {}) => {
    setCurrentView(view);
    setParams(newParams);
  };

  const showToast = (message) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(''), 3000);
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

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        showToast(`Removed from Wishlist`);
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Added to Wishlist`);
        return [...prev, product];
      }
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCart([]);
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
    switch (currentView) {
      case 'home':
        return <HomeView navigate={navigate} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />;
      case 'shop':
        return <ShopView navigate={navigate} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />;
      case 'product':
        const product = PRODUCTS.find(p => p.id === params.id);
        return <ProductDetailView product={product} navigate={navigate} addToCart={addToCart} />;
      case 'wishlist':
        return <WishlistView wishlist={wishlist} navigate={navigate} addToCart={addToCart} toggleWishlist={toggleWishlist} />;
      case 'about':
        return <AboutView navigate={navigate} />;
      case 'cart':
        return <CartView cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} navigate={navigate} />;
      case 'checkout':
        return <CheckoutView cart={cart} navigate={navigate} />;
      default:
        return <HomeView navigate={navigate} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <AuthView onLogin={() => setIsAuthenticated(true)} />
    );
  }

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="font-sans text-zinc-50 bg-[#0F0F0F] min-h-screen flex flex-col selection:bg-[#d4af37] selection:text-[#0F0F0F] antialiased scroll-smooth">
      <style dangerouslySetInnerHTML={{
        __html: `
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
          0% { transform: scale(1.05); }
          100% { transform: scale(1.2); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee_reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}} />

      <Navbar 
        cartCount={totalCartItems} 
        wishlistCount={wishlist.length} 
        navigate={navigate} 
        currentView={currentView} 
        onLogout={handleLogout} 
      />

      <main className="flex-grow w-full">
        {renderView()}
      </main>

      <Footer />

      <Toast message={toastMsg} />
    </div>
  );
}
