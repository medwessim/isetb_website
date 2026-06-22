"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, UserRound } from 'lucide-react';
import { LEGACY_MESSAGES, type LegacyMessage } from '../../data/legacy';

// ─── Single card ─────────────────────────────────────────────────────────────
const MessageCard = ({ msg }: { msg: LegacyMessage }) => (
  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
    {/* Decorative quote mark */}
    <Quote
      size={48}
      className="absolute top-6 right-6 text-cyan-400/20 rotate-180"
      aria-hidden
    />

    {/* Pull-quote */}
    <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white leading-snug mb-6 sm:mb-8 relative z-10">
      &ldquo;{msg.quote}&rdquo;
    </p>

    {/* Full message */}
    <p className="text-sm sm:text-base text-white/65 leading-relaxed mb-8">
      {msg.message}
    </p>

    {/* Author */}
    <div className="flex items-center gap-4">
      {msg.image ? (
        <img
          src={msg.image}
          alt={msg.name}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white/20"
        />
      ) : (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600
                        flex items-center justify-center text-white flex-shrink-0 border-2 border-white/20">
          <UserRound size={24} strokeWidth={1.5} />
        </div>
      )}
      <div>
        <p className="font-bold text-white text-sm sm:text-base">{msg.name}</p>
        <p className="text-xs sm:text-sm text-white/50">{msg.role} · {msg.term}</p>
      </div>

      {/* Decorative accent bar */}
      <div className="ml-auto h-px flex-1 max-w-16 sm:max-w-24 bg-gradient-to-r from-cyan-400/40 to-transparent hidden sm:block" />
    </div>
  </div>
);

// ─── Section ─────────────────────────────────────────────────────────────────
const LegacyMessages = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  if (LEGACY_MESSAGES.length === 0) return null;

  const prev = () => { setDir(-1); setIndex(i => (i - 1 + LEGACY_MESSAGES.length) % LEGACY_MESSAGES.length); };
  const next = () => { setDir(1);  setIndex(i => (i + 1) % LEGACY_MESSAGES.length); };

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ?  60 : -60, opacity: 0 }),
    center:               ({ x: 0,         opacity: 1 }),
    exit:   (d: number) => ({ x: d > 0 ? -60 :  60, opacity: 0 }),
  };

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-widest text-white/70 uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Words from Past Leaders
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            The Legacy Speaks
          </h2>
          <p className="text-white/55 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Messages from previous executive committees — wisdom, encouragement,
            and the spirit they passed forward.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={dir} mode="wait">
            <motion.div
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <MessageCard msg={LEGACY_MESSAGES[index]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        {LEGACY_MESSAGES.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous message"
              className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white
                         hover:bg-white/20 transition-all duration-200 active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {LEGACY_MESSAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
                  aria-label={`Go to message ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-cyan-400' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next message"
              className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white
                         hover:bg-white/20 transition-all duration-200 active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LegacyMessages;
