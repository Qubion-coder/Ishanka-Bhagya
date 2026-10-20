import React from 'react';
import { motion } from 'motion/react';

const events = [
  { time: '08:30', period: 'AM', title: 'Celebration Begins', desc: 'Welcome and seating' },
  { time: '08:42', period: 'AM', title: 'Poruwa Ceremony', desc: 'Traditional ceremony' },
  { time: '03:30', period: 'PM', title: 'Celebration Ends', desc: 'Send off the newlyweds' },
];

export const Timeline = () => {
  return (
    <div className="bg-gradient-to-b from-brand-blush via-[#F8F1E5] to-brand-blush pt-24 pb-48 sm:pt-32 sm:pb-64 relative overflow-hidden flex justify-center w-full">
      {/* Corner florals */}
      <img
        src="/decor/floral-corner.webp"
        alt=""
        loading="lazy"
        className="absolute bottom-0 left-0 w-60 sm:w-96 opacity-80 pointer-events-none z-0"
      />
      <img
        src="/decor/floral-corner.webp"
        alt=""
        loading="lazy"
        className="absolute top-0 right-0 w-44 sm:w-72 opacity-50 rotate-180 pointer-events-none z-0"
      />

      <div className="w-full max-w-2xl mx-auto px-6 relative z-10 flex flex-col items-center">

        {/* Rings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <img
            src="/decor/rings.webp"
            alt="Wedding rings"
            loading="lazy"
            className="w-20 sm:w-24 h-auto"
          />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-14 flex flex-col items-center"
        >
          <span className="uppercase tracking-[0.5em] text-[10px] sm:text-[11px] font-semibold text-[#8C6455] mb-3">
            Friday · 11 December 2026
          </span>
          <h2 className="text-4xl sm:text-5xl font-names text-rose-gold tracking-wide mb-5">The Day</h2>
          <div className="rg-divider"><span /></div>
        </motion.div>

        {/* Timeline */}
        <div className="relative w-full max-w-md mx-auto">
          {/* Vertical rose gold thread */}
          <div className="absolute left-[4.75rem] sm:left-[6rem] top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-[#B5806F]/50 to-transparent" />

          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="relative flex items-center mb-8 last:mb-0"
            >
              {/* Time */}
              <div className="w-16 sm:w-20 flex-shrink-0 text-right">
                <span className="block font-['Cormorant_Garamond',_serif] text-xl sm:text-2xl text-[#2A2416] tabular-nums font-semibold leading-none">
                  {event.time}
                </span>
                <span className="block text-[9px] tracking-[0.3em] text-[#8C6455] font-semibold mt-1">{event.period}</span>
              </div>

              {/* Diamond marker */}
              <div className="flex-shrink-0 w-6 sm:w-8 flex justify-center relative z-10">
                <span className="w-2.5 h-2.5 rotate-45 bg-gradient-to-br from-[#F3E2CC] to-[#B5806F] ring-4 ring-[#F6EEE0]" />
              </div>

              {/* Content */}
              <div className="rg-card flex-1 px-5 py-4 sm:px-6 sm:py-5">
                <h3 className="font-['Cormorant_Garamond',_serif] text-xl sm:text-2xl text-[#2A2416] mb-0.5 font-medium">{event.title}</h3>
                <p className="text-[11px] sm:text-xs text-[#8C6455]/80 font-sans tracking-wide">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};
