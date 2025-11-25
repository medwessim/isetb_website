'use client';

import { useState, useEffect, useRef } from 'react';


interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

const HeroSection = () => {
  const [stats] = useState<StatItem[]>([
    { value: 6, label: 'Years of Excellence', suffix: '+' },
    { value: 110, label: 'Happy Members', suffix: '+' },
  ]);
  const [location] = useState('ISET Bizerte, Tunisia');
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  const formatTime = (date: Date | null) => {
    if (!date) {
      return { hours: '00', minutes: '00', seconds: '00', ampm: 'AM' };
    }

    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      ampm,
    };
  };

  const time = formatTime(currentTime);

  return (
    <section
      ref={sectionRef}
      className="w-full text-white pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-8 sm:pb-12 md:pb-16 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-8xl">
        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-center text-white md:text-3xl mb-6 tracking-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            WHO ARE WE!
          </h1>

          <div className="loader-wrapper mb-8 sm:mb-10">
            {isVisible &&
              'IEEE ISET Bizerte Student Branch'.split('').map((char, index) => (
                <span
                  key={index}
                  className="loader-letter"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {char}
                </span>
              ))}
            <div className="loader"></div>
          </div>

          <div className="relative mb-8 sm:mb-10">
            <p className="text-base mt-4 text-lg text-gray-200 md:text-xl tracking-wide font-light" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.2)' }}>
              &ldquo;FORGED BY SEA&rdquo;
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 md:p-8 border border-white/20 transition-all duration-500 hover:shadow-2xl hover:bg-white/15 font-[Poppins] shadow-xl overflow-x-auto">
  <div className="min-w-[700px] grid grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-center">
    
    {/* Current Location */}
    <div className="flex items-center space-x-4 group cursor-pointer">
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 ease-out" />
        <div className="relative bg-white/20 backdrop-blur-lg p-3 sm:p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 ease-out shadow-lg border border-white/30">
          <svg
            className="h-6 w-6 sm:h-7 sm:w-7 text-white transform group-hover:rotate-12 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </div>
      <div className="transform group-hover:translate-x-1 transition-transform duration-300">
        <p className="text-xs font-semibold tracking-widest text-white/80 uppercase mb-1">
          Current Location
        </p>
        <p className="text-sm sm:text-base font-semibold mt-1 text-white/95">{location}</p>
      </div>
    </div>

    {/* Since */}
    <div className="flex items-center space-x-4 justify-center group cursor-pointer">
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 ease-out" />
        <div className="relative bg-white/20 backdrop-blur-lg p-3 sm:p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 ease-out shadow-lg border border-white/30">
          <svg
            className="h-6 w-6 sm:h-7 sm:w-7 text-white transform group-hover:rotate-12 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <div className="transform group-hover:translate-x-1 transition-transform duration-300">
        <p className="text-xs font-semibold tracking-widest text-white/80 uppercase mb-1">
          Since
        </p>
        <p className="text-base sm:text-lg font-bold mt-1 text-white/95">2019</p>
      </div>
    </div>

    {/* Local Time */}
    <div className="flex items-center space-x-4 justify-end group cursor-pointer">
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 ease-out" />
        <div className="relative bg-white/20 backdrop-blur-lg p-3 sm:p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 ease-out shadow-lg border border-white/30">
          <svg
            className="h-6 w-6 sm:h-7 sm:w-7 text-white transform group-hover:rotate-12 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <div className="transform group-hover:translate-x-1 transition-transform duration-300">
        <p className="text-xs font-semibold tracking-widest text-white/80 uppercase mb-1">
          Local Time
        </p>
        <div className="flex items-end space-x-1 mt-1 flex-nowrap">
          <span className="text-base sm:text-lg font-bold tabular-nums text-white/95">
            {time.hours}
          </span>
          <span className="text-base sm:text-lg font-light text-white/70">:</span>
          <span className="text-base sm:text-lg font-bold tabular-nums text-white/95">
            {time.minutes}
          </span>
          <span className="text-base sm:text-lg font-light text-white/70">:</span>
          <span className="text-base sm:text-lg font-bold tabular-nums text-white/70 transition-all duration-300 hover:text-white/95">
            {time.seconds}
          </span>
          <span className="text-xs sm:text-sm font-semibold ml-1 sm:ml-2 text-white/80">
            {time.ampm}
          </span>
        </div>
      </div>
    </div>

  </div>
</div>

        </div>
      </div>

      <style jsx>{`
        .loader-wrapper {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          height: 5rem;
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: 600;
          user-select: none;
          color: #ffffffff;
          position: relative;
          row-gap: 0.5rem;
        }

        @media (min-width: 640px) {
          .loader-wrapper {
            font-size: 2rem;
            height: 4rem;
          }
        }

        @media (min-width: 768px) {
          .loader-wrapper {
            font-size: 2.8rem;
            height: 5rem;
          }
        }

        @media (min-width: 1024px) {
          .loader-wrapper {
            font-size: 3.6rem;
            height: 6rem;
          }
        }

        .loader {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: 1;
          background-color: transparent;
          mask: repeating-linear-gradient(
            90deg,
            transparent 0,
            transparent 8px,
            black 9px,
            black 10px
          );
          opacity: 0.8;
        }

        .loader::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 50% 50%, #ff0 0%, transparent 60%),
            radial-gradient(circle at 45% 45%, #f00 0%, transparent 55%),
            radial-gradient(circle at 55% 55%, #0ff 0%, transparent 55%),
            radial-gradient(circle at 45% 55%, #0f0 0%, transparent 55%),
            radial-gradient(circle at 55% 45%, #00f 0%, transparent 55%);
          mask: radial-gradient(circle at 50% 50%, transparent 0%, transparent 15%, black 30%);
          animation: transform-animation 6s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
          filter: blur(1px);
        }

        @keyframes transform-animation {
          0% {
            transform: translateX(-15%) scale(0.95);
          }
          50% {
            transform: translateX(0%) scale(1.05);
          }
          100% {
            transform: translateX(15%) scale(0.95);
          }
        }

        .loader-letter {
          display: inline-block;
          opacity: 0;
          animation: loader-letter-anim 3.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
          margin-right: 0.25rem;
          transform-origin: center;
          text-shadow: 0 0 20px rgba(255,255,255,0.3);
        }

        .loader-letter:last-child {
          margin-right: 0;
        }

        @keyframes loader-letter-anim {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.9);
          }
          15% {
            opacity: 1;
            text-shadow: 0 0 8px #fff, 0 0 16px rgba(255,255,255,0.5);
            transform: translateY(0) scale(1.08);
          }
          30% {
            opacity: 0.8;
            transform: scale(1.02);
          }
          45% {
            opacity: 0.4;
            transform: scale(0.98);
          }
          60% {
            opacity: 0.2;
            transform: translateY(-2px) scale(0.95);
          }
          100% {
            opacity: 0;
            transform: translateY(5px) scale(0.92);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;