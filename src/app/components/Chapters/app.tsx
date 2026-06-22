"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HoverCards = () => {
  const chapters = [
    { src: "/logos/ras.png",     alt: "RAS Logo" },
    { src: "/logos/cs.png",      alt: "CS Logo" },
    { src: "/logos/ias_ies.png", alt: "IAS Logo" },
    { src: "/logos/wie.png",     alt: "WIE Logo" },
    { src: "/logos/cis.png",     alt: "CIS Logo" },
  ];

  return (
    <div className="m-[5%]">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-8 tracking-tight"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Our Chapters &amp; Affinity Groups
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 group justify-center">
        {chapters.map((chapter, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="relative flex flex-col items-center justify-center text-center h-34 w-full rounded-lg text-white cursor-pointer transition-all duration-300 ease-in-out drop-shadow-xl bg-white/50
                         group-hover:blur-sm group-hover:scale-90 hover:!scale-110 hover:!blur-none border border-green-500/10"
            >
              {index === 0 && (
                <div className="absolute inset-0 border border-green-500/10 animate-pulse" />
              )}
              <div className="relative w-40 h-12 md:w-52 md:h-14 lg:w-60 lg:h-26">
                <Image
                  src={chapter.src}
                  alt={chapter.alt}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 160px, (max-width: 1024px) 208px, 240px"
                  priority
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HoverCards;
