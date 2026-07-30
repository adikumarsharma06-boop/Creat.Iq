import React from 'react';
import { motion } from 'motion/react';
import logoImg from '../assets/images/ciq_pro_vector_logo_1785396236827.jpg';

interface CiqLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  animated?: boolean;
  className?: string;
}

export const CiqLogo: React.FC<CiqLogoProps> = ({
  size = 'md',
  showText = false,
  animated = true,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 rounded-lg',
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-16 h-16 rounded-2xl',
    xl: 'w-24 h-24 rounded-3xl',
    '2xl': 'w-32 h-32 sm:w-36 sm:h-36 rounded-3xl',
  };

  const textSizes = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    '2xl': 'text-4xl',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Outer Glowing Frame with Dark Blue & Neon Purple + Cyan Blend */}
      <div className={`relative ${sizeClasses[size]} group`}>
        {/* Animated Background Aura Glow */}
        {animated && (
          <motion.div
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.65, 0.98, 0.65],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -inset-1 rounded-[18px] bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 blur-md pointer-events-none opacity-85"
          />
        )}

        {/* Outer Metallic Border with Dark Blue + Purple + Cyan Mix */}
        <div className={`relative w-full h-full p-[1.5px] bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 rounded-[inherits] shadow-xl shadow-indigo-950/60 overflow-hidden flex items-center justify-center`}>
          <div className="w-full h-full bg-slate-950 rounded-[inherit] overflow-hidden relative flex items-center justify-center">
            {/* The Custom c.iq Logo Asset */}
            <img
              src={logoImg}
              alt="c.iq Logo"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover rounded-[inherit] transform group-hover:scale-110 transition-transform duration-300`}
            />

            {/* Glowing Corner Specular Highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/15 to-purple-500/25 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Optional Brand Text Next to Logo */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-tight text-white ${textSizes[size]}`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-mono">c.iq</span>
              <span className="text-white"> AI</span>
            </span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              v3.0
            </span>
          </div>
          <span className="text-[10px] text-indigo-300/80 font-mono tracking-wider uppercase -mt-0.5">
            Dark Blue & Purple Engine
          </span>
        </div>
      )}
    </div>
  );
};
