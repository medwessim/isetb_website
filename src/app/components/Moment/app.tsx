"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";

interface Moment {
  id: number;
  title: string;
  imageUrl: string;
}

interface CardStyle {
  translateX: string;
  scale: string;
  opacity: string;
  zIndex: number;
}

const moments: Moment[] = [
  { id: 1, title: "WIE ACT 4.0", imageUrl: "/images/9.jpg" },
  { id: 2, title: "IEEE DAY 2025", imageUrl: "/images/8.jpg" },
  { id: 3, title: "CODE IT UP 5.0", imageUrl: "/images/3.png" },
  { id: 11, title: "CSTAM 2.0", imageUrl: "/images/15.jpg" },
  { id: 5, title: "IEEE TEJMAANA 2.0", imageUrl: "/images/6.png" },
  { id: 6, title: "IEEE DAY 2024", imageUrl: "/images/2.jpg" },
  { id: 4, title: "CODE IT UP 5.0", imageUrl: "/images/1.jpg" },
  { id: 7, title: "TSYP 12", imageUrl: "/images/10.jpg" },
  { id: 8, title: "Bizerte TCODI", imageUrl: "/images/11.png" },
  { id: 9, title: "CSTAM 2.0", imageUrl: "/images/14.jpg" },
  { id: 10, title: "Panel", imageUrl: "/images/5.jpg" },
];

const getCardStyles = (position: number, totalLength: number): CardStyle => {
  const styles: CardStyle = { translateX: "0px", scale: "0", opacity: "0", zIndex: 0 };

  if (position === 0) return { translateX: "0px", scale: "1", opacity: "1", zIndex: 30 };
  if (position === 1) return { translateX: "300px", scale: "0.85", opacity: "0.8", zIndex: 20 };
  if (position === 2) return { translateX: "550px", scale: "0.7", opacity: "0.6", zIndex: 10 };
  if (position === totalLength - 1) return { translateX: "-300px", scale: "0.85", opacity: "0.8", zIndex: 20 };
  if (position === totalLength - 2) return { translateX: "-550px", scale: "0.7", opacity: "0.6", zIndex: 10 };

  return styles;
};

const MomentCardMobile = memo(function MomentCardMobile({ moment }: { moment: Moment }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[88vw] max-w-xs h-[220px] rounded-2xl shadow-md bg-gradient-to-br from-cyan-400 to-emerald-400 relative overflow-hidden">
        <img
          src={moment.imageUrl}
          alt={moment.title}
          className="w-full h-full object-cover rounded-2xl"
          loading="lazy"
          draggable={false}
          style={{ userSelect: "none", pointerEvents: "none" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/2 to-black/30 rounded-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full px-4 py-2 bg-gradient-to-b from-white/0 to-white/60 rounded-b-2xl">
          <div className="text-white text-xs truncate flex justify-center">A beautiful moment captured in time</div>
          <div className="text-white flex justify-center font-bold text-lg truncate">{moment.title}</div>
        </div>
      </div>
    </div>
  );
});

const MomentCard = memo(function MomentCard({ moment, style }: { moment: Moment; style: CardStyle }) {
  return (
    <div
      className="absolute transition-all duration-500 ease-in-out"
      style={{
        transform: `translateX(${style.translateX}) scale(${style.scale})`,
        opacity: style.opacity,
        zIndex: style.zIndex,
        maxWidth: "380px",
      }}
    >
      <div className="parent w-[380px] h-[300px] perspective-1000">
        <div className="card h-full rounded-[50px] bg-gradient-to-br from-cyan-400 to-emerald-400 transition-all duration-500 ease-in-out transform-style-preserve-3d shadow-custom">
          <div className="absolute inset-0 rounded-[50px] overflow-hidden">
            <img
              src={moment.imageUrl}
              alt={moment.title}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
              style={{ userSelect: "none", pointerEvents: "none" }}
            />
          </div>
          <div className="glass transform-style-preserve-3d absolute inset-2 rounded-[55px] bg-gradient-to-b from-white/5 to-white/22 transform-translate-z-25 border-l border-b border-white transition-all duration-500 ease-in-out" />
          <div className="content pt-12 pr-12 p-4 transform-translate-z-26">
            <span className="title block font-black text-xl mb-2">
              <span className="text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.8),0_4px_20px_rgba(0,0,0,0.6)] hover:[text-shadow:0_2px_15px_rgba(0,0,0,0.9),0_6px_25px_rgba(0,0,0,0.7)] transition-all duration-300">
                {moment.title}
              </span>
            </span>
            <span className="text block text-sm mt-1 text-white/90 [text-shadow:0_1px_5px_rgba(0,0,0,0.7)] hover:text-white transition-colors duration-300">
              A beautiful moment captured in time
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

const MomentsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextCard = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % moments.length);
  }, []);

  const prevCard = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + moments.length) % moments.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextCard, 4000);
    return () => clearInterval(interval);
  }, [nextCard]);

  useEffect(() => {
    if (!isMobile) return;
    let startX = 0;
    let endX = 0;
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onTouchMove = (e: TouchEvent) => { endX = e.touches[0].clientX; };
    const onTouchEnd = () => {
      if (startX - endX > 50) nextCard();
      else if (endX - startX > 50) prevCard();
      startX = endX = 0;
    };
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isMobile, nextCard, prevCard]);

  return (
    <div className="flex flex-col items-center w-full min-h-[340px] sm:min-h-[400px] px-2 sm:px-4 py-6">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-2xl font-bold text-center text-white md:text-3xl mb-6"
        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
      >
        SPECIAL MOMENTS
      </motion.h2>

      {isMobile ? (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="relative w-full flex items-center justify-center" style={{ minHeight: 240 }}>
            <button
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-md rounded-full shadow-md active:scale-90 transition hover:bg-white/40"
              style={{ fontSize: 24, width: 38, height: 38, display: currentIndex === 0 ? "none" : "flex", alignItems: "center", justifyContent: "center" }}
              onClick={prevCard}
              aria-label="Previous"
            >
              &#8592;
            </button>
            <MomentCardMobile moment={moments[currentIndex]} />
            <button
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-md rounded-full shadow-md active:scale-90 transition hover:bg-white/40"
              style={{ fontSize: 24, width: 38, height: 38, display: currentIndex === moments.length - 1 ? "none" : "flex", alignItems: "center", justifyContent: "center" }}
              onClick={nextCard}
              aria-label="Next"
            >
              &#8594;
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-3">
            {moments.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-5 bg-cyan-500" : "w-2 bg-cyan-200/60"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative w-full flex items-center justify-center">
          {/* Desktop nav buttons */}
          <button
            className="absolute left-4 z-40 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/40 transition-all duration-200 text-white text-lg font-bold"
            onClick={prevCard}
            aria-label="Previous"
          >
            &#8592;
          </button>

          <div
            className="flex relative overflow-visible w-[380px] h-[320px]"
            style={{ minWidth: "380px", minHeight: "300px", margin: "0 auto" }}
          >
            {moments.map((moment, index) => {
              const position = (index - currentIndex + moments.length) % moments.length;
              const style = getCardStyles(position, moments.length);
              return <MomentCard key={moment.id} moment={moment} style={style} />;
            })}
          </div>

          <button
            className="absolute right-4 z-40 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/40 transition-all duration-200 text-white text-lg font-bold"
            onClick={nextCard}
            aria-label="Next"
          >
            &#8594;
          </button>

          {/* Desktop dots */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex justify-center gap-2">
            {moments.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-5 bg-cyan-400" : "w-2 bg-white/30"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MomentsCarousel;
