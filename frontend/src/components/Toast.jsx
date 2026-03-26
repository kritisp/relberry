import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Toast = ({ message }) => {
  if (!message) return null;
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-fade-in-up">
      <div className="bg-[#0A0A0A] text-white border border-[#D4AF37] px-6 py-4 rounded-sm shadow-[0_0_40px_rgba(212,175,55,0.3)] flex items-center space-x-3 font-bold text-sm tracking-wide">
        <CheckCircle2 size={20} className="text-[#D4AF37]" />
        <span className="uppercase tracking-wider">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
