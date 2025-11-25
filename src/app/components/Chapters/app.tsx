"use client";
import React from "react";
import Image from "next/image";
import Cs from "../../assets/cs.png";
import Cis from "../../assets/cis.png";
import Ias from "../../assets/ias_ies.png";
import Wie from "../../assets/wie.png";
import Ras from "../../assets/ras.png";

const HoverCards = () => {
  const chapters = [
    { src: Ras, alt: "RAS Logo" },
    { src: Cs, alt: "CS Logo" },
    { src: Ias, alt: "IAS Logo" },
    { src: Wie, alt: "WIE Logo" },
    { src: Cis, alt: "CIS Logo" },
  ];

  return (
    <div className="m-[5%]">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-8 tracking-tight animate-text-slide-in" style={{ fontFamily: "'Inter', sans-serif" }}>
        Our Chapters & Affinity Groups
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 group justify-center">
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center justify-center text-center h-34 w-full rounded-lg text-white cursor-pointer transition-all duration-300 ease-in-out drop-shadow-xl bg-white/50
                       group-hover:blur-sm group-hover:scale-90 hover:!scale-110 hover:!blur-none border border-green-500/10"
          >
            {index === 0 && (
              <div
                className="absolute inset-0 border border-green-500/10 animate-pulse"
              ></div>
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
        ))}
      </div>
    </div>
  );
};

export default HoverCards;