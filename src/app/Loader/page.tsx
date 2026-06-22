'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const DISPLAY_MS = 3200;

const Loader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('ieee-loader-seen');
    if (hasSeen) {
      setShow(false);
      return;
    }

    document.body.classList.add('loading-active');

    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('ieee-loader-seen', '1');
      document.body.classList.remove('loading-active');
    }, DISPLAY_MS);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('loading-active');
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #00091a 0%, #001f3f 45%, #003d6b 80%, #005a87 100%)',
          }}
        >
          {/* Ambient glow blobs */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #0077b6 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 blur-2xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #00b4d8 0%, transparent 70%)' }}
          />

          {/* ── Logo + spinning ring ── */}
          <div className="relative flex items-center justify-center mb-10">
            {/* Outer slow ring */}
            <svg
              className="absolute w-52 h-52 opacity-20"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="47" fill="none" stroke="#90e0ef" strokeWidth="0.4" />
            </svg>

            {/* Fast spinning arc */}
            <motion.svg
              className="absolute w-52 h-52"
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            >
              <defs>
                <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00b4d8" stopOpacity="0" />
                  <stop offset="70%" stopColor="#00d4ff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#90e0ef" stopOpacity="1" />
                </linearGradient>
              </defs>
              <circle
                cx="50" cy="50" r="47"
                fill="none"
                stroke="url(#arc-grad)"
                strokeWidth="1.8"
                strokeDasharray="80 216"
                strokeLinecap="round"
              />
            </motion.svg>

            {/* Slow counter-spinning arc */}
            <motion.svg
              className="absolute w-44 h-44"
              viewBox="0 0 100 100"
              animate={{ rotate: -360 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke="#48cae4"
                strokeWidth="0.6"
                strokeDasharray="30 260"
                strokeLinecap="round"
                opacity="0.5"
              />
            </motion.svg>

            {/* IEEE Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-36 h-24"
            >
              <Image
                src="/logos/IEEE x ISETB_white.png"
                alt="IEEE ISET Bizerte"
                fill
                className="object-contain drop-shadow-[0_0_20px_rgba(0,180,216,0.4)]"
                priority
              />
            </motion.div>
          </div>

          {/* ── Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center select-none"
          >
            <h1 className="text-white font-bold tracking-[0.35em] text-xl sm:text-2xl uppercase drop-shadow-lg">
              IEEE ISET Bizerte
            </h1>
            <p
              className="mt-1.5 text-[11px] sm:text-xs tracking-[0.55em] uppercase font-light"
              style={{ color: 'rgba(144, 224, 239, 0.75)' }}
            >
              Student Branch
            </p>
          </motion.div>

          {/* ── Loading bar ── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 w-44 sm:w-56 h-px rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <motion.div
              className="h-full w-1/3 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
              }}
              animate={{ x: ['calc(-100%)', 'calc(300%)'] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.8,
              }}
            />
          </motion.div>

          {/* ── Pulsing dots ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex gap-2 mt-5"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#48cae4' }}
                animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.4, delay: i * 0.25, repeat: Infinity }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
