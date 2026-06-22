'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  MapPin, Globe, Clock, Users, CalendarDays, Cpu, Trophy, ChevronDown,
} from 'lucide-react';
import styles from './HeroSection.module.css';

// ─── Animated counter ──────────────────────────────────────────────────────
function useCount(target: number, enabled: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round((1 - (1 - p) ** 3) * target));
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [enabled, target, duration]);
  return val;
}

// ─── Data ──────────────────────────────────────────────────────────────────
const STATS = [
  { icon: Users, value: 180, suffix: '+', label: 'Active Members', gradient: 'from-sky-400 to-blue-500', glow: 'rgba(56,189,248,0.18)' },
  { icon: CalendarDays, value: 45, suffix: '+', label: 'Events Organized', gradient: 'from-cyan-400 to-teal-500', glow: 'rgba(34,211,238,0.18)' },
  { icon: Cpu, value: 5, suffix: '', label: 'Technical Chapters', gradient: 'from-violet-400 to-indigo-500', glow: 'rgba(167,139,250,0.18)' },
  { icon: Trophy, value: 6, suffix: '', label: 'Years of Impact', gradient: 'from-emerald-400 to-green-500', glow: 'rgba(52,211,153,0.18)' },
];

// ─── Component ─────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const wake = setTimeout(() => setMounted(true), 80);
    setCurrentTime(new Date());
    const clock = setInterval(() => setCurrentTime(new Date()), 1000);

    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (statsRef.current) io.observe(statsRef.current);
    if (heroRef.current) observer.observe(heroRef.current);

    return () => {
      clearTimeout(wake);
      clearInterval(clock);
      io.disconnect();
      observer.disconnect();
    };
  }, []);

  const fmt = (d: Date | null) => {
    if (!d) return { h: '00', m: '00', s: '00', ampm: 'AM' };
    const raw = d.getHours();
    return {
      h: (raw % 12 || 12).toString().padStart(2, '0'),
      m: d.getMinutes().toString().padStart(2, '0'),
      s: d.getSeconds().toString().padStart(2, '0'),
      ampm: raw >= 12 ? 'PM' : 'AM',
    };
  };
  const t = fmt(currentTime);

  const c0 = useCount(STATS[0].value, statsVisible);
  const c1 = useCount(STATS[1].value, statsVisible);
  const c2 = useCount(STATS[2].value, statsVisible);
  const c3 = useCount(STATS[3].value, statsVisible);
  const counts = [c0, c1, c2, c3];

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  });

  return (
    <section className="w-full text-white pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-14 md:pb-20 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex flex-col items-center text-center">

          {/* ── Floating badge ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full
                         bg-white/10 backdrop-blur-md border border-white/20
                         text-[11px] font-semibold tracking-[0.22em] text-white/75
                         uppercase shadow-lg mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_2px_rgba(34,211,238,0.6)] animate-pulse" />
              IEEE Student Branch &nbsp;·&nbsp; Est. 2019 &nbsp;·&nbsp; Bizerte, Tunisia
            </motion.div>
          </motion.div>

          {/* ── Eyebrow label ──────────────────────────────────────────── */}
          <motion.p
            {...fadeUp(0.1)}
            className="text-[11px] font-bold tracking-[0.5em] text-white/40 uppercase mb-5"
          >
            Who Are We
          </motion.p>

          {/* ── Main letter-stagger animated title ─────────────────────── */}
          <div ref={heroRef} className={`${styles.loaderWrapper} mb-8 sm:mb-10`}>
            {isVisible &&
              'IEEE ISET Bizerte Student Branch'.split('').map((char, index) => (
                <span
                  key={index}
                  className={styles.loaderLetter}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {char}
                </span>
              ))}
            <div className={styles.loader}></div>
          </div>

          {/* ── Tagline ────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mb-8 sm:mb-10"
          >
            <p
              className="text-base mt-4 text-lg text-gray-200 md:text-xl tracking-wide font-light"
              style={{ textShadow: '0 1px 5px rgba(0,0,0,0.2)' }}
            >
              &ldquo;FORGED BY SEA&rdquo;
            </p>
          </motion.div>

          {/* ── Description ────────────────────────────────────────────── */}
          <motion.p
            {...fadeUp(1.15)}
            className="max-w-xl text-white/60 text-sm sm:text-base leading-relaxed mb-10"
          >
            Empowering the next generation of engineers and innovators at ISET Bizerte.
            We connect students through hands-on workshops, hackathons, industry talks,
            and international competitions under the global IEEE umbrella.
          </motion.p>

          {/* ── Info bar ───────────────────────────────────────────────── */}
          <motion.div
            {...fadeUp(1.6)}
            className="w-full bg-white/8 backdrop-blur-2xl rounded-2xl
                       border border-white/12 shadow-xl px-5 py-4 mb-6"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-2">

              {/* Location */}
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="flex-shrink-0 p-2 rounded-xl bg-sky-500/15 group-hover:bg-sky-500/25 transition-colors duration-300">
                  <MapPin size={15} className="text-sky-400" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Location</p>
                  <p className="text-sm font-semibold text-white/85">ISET Bizerte, Tunisia</p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-white/15" />

              {/* IEEE affiliation */}
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="flex-shrink-0 p-2 rounded-xl bg-cyan-500/15 group-hover:bg-cyan-500/25 transition-colors duration-300">
                  <Globe size={15} className="text-cyan-400" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Affiliation</p>
                  <p className="text-sm font-semibold text-white/85">IEEE Region 8 · Tunisia Section</p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-white/15" />

              {/* Active members badge */}
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="flex-shrink-0 p-2 rounded-xl bg-emerald-500/15 group-hover:bg-emerald-500/25 transition-colors duration-300">
                  <Users size={15} className="text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Members</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-sm font-semibold text-white/85">180+ Active</p>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-white/15" />

              {/* Live clock */}
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="flex-shrink-0 p-2 rounded-xl bg-violet-500/15 group-hover:bg-violet-500/25 transition-colors duration-300">
                  <Clock size={15} className="text-violet-400" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Local Time</p>
                  <p className="font-mono text-sm font-semibold text-white/85 tabular-nums">
                    {t.h}:{t.m}:{t.s} <span className="text-white/55">{t.ampm}</span>
                  </p>
                </div>
              </div>

            </div>
          </motion.div>



          {/* ── Stats grid ─────────────────────────────────────────────── */}
          <motion.div
            ref={statsRef}
            {...fadeUp(1.45)}
            className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  className="relative group bg-white/10 backdrop-blur-xl border border-white/15
                             rounded-2xl p-5 overflow-hidden cursor-default text-left"
                >
                  {/* Corner glow blob */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl
                               opacity-0 group-hover:opacity-100 transition-opacity duration-500
                               translate-x-8 -translate-y-8 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${stat.glow}, transparent 70%)` }}
                  />

                  {/* Icon */}
                  <div
                    className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-20 mb-3 shadow-inner`}
                    style={{ background: `linear-gradient(135deg, ${stat.glow}, rgba(255,255,255,0.06))` }}
                  >
                    <Icon size={18} className="text-white" />
                  </div>

                  {/* Value */}
                  <div className={`text-3xl lg:text-4xl font-black bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent tabular-nums`}>
                    {counts[i]}{stat.suffix}
                  </div>

                  {/* Label */}
                  <div className="text-[11px] font-medium text-white/45 mt-1 leading-snug">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          {/* ── CTA buttons ────────────────────────────────────────────── */}
          <motion.div
            {...fadeUp(1.3)}
            className="flex flex-col sm:flex-row items-center gap-3 mb-16"
          >
            <Link href="/Events">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(0,198,255,0.40)' }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-2xl text-sm font-semibold tracking-wide
                           bg-gradient-to-r from-cyan-500 to-blue-600 text-white
                           shadow-lg shadow-cyan-500/25 transition-shadow duration-200"
              >
                Explore Events →
              </motion.button>
            </Link>

            <Link href="/AboutUs">
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.16)' }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-2xl text-sm font-semibold tracking-wide
                           bg-white/10 text-white border border-white/25
                           backdrop-blur-md transition-colors duration-200"
              >
                About Us
              </motion.button>
            </Link>

            <Link href="/Contact">
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.16)' }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-2xl text-sm font-semibold tracking-wide
                           bg-white/10 text-white border border-white/25
                           backdrop-blur-md transition-colors duration-200"
              >
                Join Us ✦
              </motion.button>
            </Link>
          </motion.div>



          {/* ── Scroll indicator ───────────────────────────────────────── */}
          <motion.button
            {...fadeUp(1.85)}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
            aria-label="Scroll down"
          >
            <span className="text-[10px] tracking-[0.35em] text-white/25 uppercase font-semibold group-hover:text-white/45 transition-colors duration-300">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={20} className="text-white/25 group-hover:text-white/50 transition-colors duration-300" />
            </motion.div>
          </motion.button>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;