import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export const CoupleDetails: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-brand-lavender/15 to-transparent rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="text-center mb-16 sm:mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img
            src="/WhatsApp_Image_2026-10-14_at_20.56.04__1_-removebg-preview.png"
            alt="Ishanka & Bhagya monogram"
            className="w-44 sm:w-56 h-auto mx-auto mb-4 drop-shadow-sm"
          />
          <div className="inline-flex items-center gap-4 mb-6 mt-4">
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-brand-plum/60" />
            <span className="text-brand-plum uppercase tracking-[0.5em] text-[11px] font-semibold font-sans drop-shadow-sm">The Protagonists</span>
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-brand-plum/60" />
          </div>
          <h2 className="flex flex-col sm:flex-row items-center justify-center sm:gap-4 text-5xl sm:text-7xl font-names text-stone-800 tracking-tight drop-shadow-sm">
            <span>Ishanka</span>
            <span className="text-rose-gold font-['Great_Vibes',_cursive] font-normal text-6xl sm:text-8xl leading-none px-2">&</span>
            <span>Bhagya</span>
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8 relative z-10">
        {/* Groom Details (Left on Desktop, Bottom on Mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="text-center lg:text-right flex-1 lg:pr-10 order-4 lg:order-1 relative w-full"
        >
          {/* Mobile Background Image attached only to this text section */}
          <div className="absolute -top-60 sm:-top-72 inset-x-0 z-0 lg:hidden pointer-events-none flex justify-center items-center opacity-80 overflow-visible">
            <img 
              src="/ChatGPT Image Sep 3, 2026, 03_47_52 AM.png" 
              alt="Mobile Background" 
              className="w-full max-w-md scale-125 sm:scale-150 h-auto object-contain mix-blend-multiply"
            />
          </div>

          <div className="mb-4 flex flex-col items-center lg:items-end relative z-10">
            <span className="text-[#8C6455] uppercase tracking-[0.4em] text-[10px] font-bold mb-3 block">The Groom</span>
            <h3 className="text-4xl sm:text-5xl font-['Cormorant_Garamond',_serif] text-stone-800 mb-2 drop-shadow-sm">Bhagya</h3>
            <p className="text-stone-700 font-century text-xs mb-2"></p>
            <p className="text-stone-500/90 font-serif italic text-base sm:text-lg">Loving Son of Mr. B.P. Keerthirathna &amp; Mrs. Kumudini Piyadigama</p>
          </div>
          <div className="hidden lg:flex justify-end mt-8 relative z-10">
            <Heart className="w-6 h-6 text-brand-lavender/60 fill-brand-lavender/20 transform hover:scale-110 transition-transform cursor-pointer" />
          </div>
        </motion.div>

        {/* Center Couple Image Collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full max-w-sm sm:max-w-md lg:w-[35%] aspect-[4/5] mx-auto order-1 lg:order-2 flex-shrink-0 z-20 mb-12 lg:mb-0"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-radial from-brand-lavender/30 to-transparent blur-3xl -z-10" />
          
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 p-2 sm:p-4">
            {/* Top Left - Arch top */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2, zIndex: 10 }}
              className="relative w-full h-full rounded-t-full rounded-bl-3xl rounded-br-lg overflow-hidden shadow-[0_15px_30px_rgba(181,128,111,0.2)] border-[3px] border-white transform transition-all duration-500"
            >
              <img src="/pre/WhatsApp Image 2026-10-15 at 09.35.11.jpeg" alt="Couple" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-plum/10 mix-blend-overlay"></div>
            </motion.div>

            {/* Top Right - Offset down slightly */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2, zIndex: 10 }}
              className="relative w-full h-full rounded-t-full rounded-br-3xl rounded-bl-lg overflow-hidden shadow-[0_15px_30px_rgba(181,128,111,0.2)] border-[3px] border-white transform translate-y-6 sm:translate-y-8 transition-all duration-500"
            >
              <img src="/pre/WhatsApp Image 2026-10-15 at 09.35.12.jpeg" alt="Couple" className="absolute inset-0 w-full h-full object-cover object-[center_40%]" />
              <div className="absolute inset-0 bg-brand-plum/10 mix-blend-overlay"></div>
            </motion.div>

            {/* Bottom Left - Arch bottom */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -1, zIndex: 10 }}
              className="relative w-full h-full rounded-b-full rounded-tl-3xl rounded-tr-lg overflow-hidden shadow-[0_15px_30px_rgba(181,128,111,0.2)] border-[3px] border-white transform -translate-y-4 sm:-translate-y-6 transition-all duration-500"
            >
              <img src="/pre/WhatsApp Image 2026-10-16 at 22.20.27 (1).jpeg" alt="Couple" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-plum/10 mix-blend-overlay"></div>
            </motion.div>

            {/* Bottom Right - Arch bottom */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 3, zIndex: 10 }}
              className="relative w-full h-full rounded-b-full rounded-tr-3xl rounded-tl-lg overflow-hidden shadow-[0_15px_30px_rgba(181,128,111,0.2)] border-[3px] border-white transform transition-all duration-500"
            >
              <img src="/pre/WhatsApp Image 2026-10-16 at 22.20.27.jpeg" alt="Couple" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-plum/10 mix-blend-overlay"></div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <Sparkles className="absolute top-1/2 -left-6 w-6 h-6 text-brand-plum/40 animate-pulse" />
          <Sparkles className="absolute top-1/4 -right-4 w-5 h-5 text-brand-rose/60 animate-pulse delay-75" />
          <Heart className="absolute bottom-1/4 -left-2 w-4 h-4 text-brand-lavender/80 animate-bounce" />
        </motion.div>
        {/* Bride Details (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="text-center lg:text-left flex-1 lg:pl-10 order-2 lg:order-3"
        >
          <div className="mb-4 flex flex-col items-center lg:items-start">
            <span className="text-[#8C6455] uppercase tracking-[0.4em] text-[10px] font-bold mb-3 block mt-28 sm:mt-36 lg:mt-0">The Bride</span>
            <h3 className="text-4xl sm:text-5xl font-['Cormorant_Garamond',_serif] text-stone-800 mb-2 drop-shadow-sm">Ishanka</h3>
            <p className="text-stone-700 font-century text-xs mb-2"></p>
            <p className="text-stone-500/90 font-serif italic text-base sm:text-lg">Loving Daughter of Mr. Lal Seelawansha &amp; Mrs. Sandhya Amarathunga</p>
          </div>
          <div className="hidden lg:flex justify-start mt-8">
            <Heart className="w-6 h-6 text-brand-lavender/60 fill-brand-lavender/20 transform hover:scale-110 transition-transform cursor-pointer" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
