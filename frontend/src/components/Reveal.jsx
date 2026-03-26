import React, { useState, useEffect, useRef } from 'react';

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

export default Reveal;
