// app/components/Navbar.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  MapPin, 
  Calendar, 
  Mail,
  Building,
  Users2,
  Globe,
  Phone
} from 'lucide-react';
import Image from 'next/image';
import logo from "../assets/logo.png";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { 
      id: 'home', 
      name: 'Home', 
      href: '/', 
      icon: Home,
      description: 'Return to homepage'
    },
    { 
      id: 'about', 
      name: 'About US', 
      href: '/AboutUs', 
      icon: Users2,
      description: 'Learn about our organization'
    },
    { 
      id: 'chapters', 
      name: 'Chapters & AG', 
      href: '/Chapters', 
      icon: Building,
      description: 'Explore our chapters and affinity groups'
    },
    { 
      id: 'events', 
      name: 'Events', 
      href: '/Events', 
      icon: Calendar,
      description: 'View upcoming events and activities'
    },
    { 
      id: 'contact', 
      name: 'Contact', 
      href: '/Contact', 
      icon: Mail,
      description: 'Get in touch with us'
    }
  ];

  // Determine active link based on current pathname
  const getActiveLink = () => {
    if (pathname === '/') return 'home';
    return navItems.find(item => item.href === pathname)?.id || 'home';
  };

  const activeLink = getActiveLink();

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20 sm:h-24 relative">
          {/* Centered Navigation - IEEE Blue Theme */}
          <div className="flex items-center justify-between w-full bg-white/60 backdrop-blur-xl rounded-3xl border border-blue-100/50 shadow-lg shadow-blue-500/10 px-6">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="relative w-32 h-10 sm:w-30 sm:h-12 md:w-38 md:h-14 lg:w-46 lg:h-16 block">
                <Image
                  src={logo}
                  alt="Logo"
                  fill
                  className="object-contain object-left hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navbar - IEEE Blue Modernized Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group relative block"
                  >
                    {/* IEEE Blue Button Container */}
                    <div className="relative bg-blue-50/80 rounded-2xl p-px overflow-hidden backdrop-blur-sm border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-blue-300/70">
                      
                      {/* Preserved Original Animation Layers - Updated to Blue */}
                      <span className="absolute inset-0 rounded-2xl overflow-hidden">
                        <span className="inset-0 absolute pointer-events-none select-none">
                          <span
                            className="block -translate-x-1/2 -translate-y-1/3 size-24 blur-xl"
                            style={{ background: "linear-gradient(135deg, #00629B, #0086C9, #00A8E8)" }}
                          ></span>
                        </span>
                      </span>

                      <span
                        className="inset-0 absolute pointer-events-none select-none"
                      >
                        <span
                          className="block z-0 h-full w-12 blur-xl -translate-x-1/2 rounded-full"
                          style={{ 
                            background: "linear-gradient(135deg, #00629B, #0086C9, #00A8E8)" 
                          }}
                        ></span>
                      </span>

                      {/* Modern Button Content */}
                      <span
                        className="flex items-center justify-center gap-2 relative z-[1] bg-white/90 rounded-[15px] py-3 px-6 w-full group-hover:bg-white transition-all duration-300"
                      >
                        <span className="relative">
                          <IconComponent
                            size={18}
                            className="opacity-80 text-blue-700 group-hover:text-blue-600 transition-colors duration-300"
                          />
                          <span
                            className="rounded-full size-11 absolute opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-lg"
                            style={{ 
                              background: "linear-gradient(135deg, #00629B, #0086C9, #00A8E8, #00C6FF)" 
                            }}
                          ></span>
                        </span>
                        <span
                          className={`bg-gradient-to-b font-medium text-sm tracking-wide group-hover:scale-105 transition transform-gpu duration-300 ${
                            activeLink === item.id
                              ? 'from-blue-700 to-blue-900'
                              : 'from-blue-600 to-blue-800/80'
                          } bg-clip-text text-transparent`}
                        >
                          {item.name}
                        </span>
                      </span>

                      {/* Active State Indicator */}
                      {activeLink === item.id && (
  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-lg shadow-blue-500/50"></span>
)}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              {/* Mobile Anchor Button */}
              

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center  rounded-2xl p-3 text-blue-700 hover:bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 transition-all duration-300"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu - IEEE Blue Theme */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-xl rounded-2xl mt-3 mx-4 overflow-hidden border border-blue-100/50 shadow-xl">
            <div className="space-y-2 p-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    href={item.href}
                    key={item.id}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-4 rounded-xl text-base font-medium transition-all duration-300 group
                      ${activeLink === item.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-700 border border-blue-200/50'
                        : 'text-blue-600 hover:bg-blue-50/80 border border-transparent'
                      }
                    `}
                  >
                    <IconComponent 
                      size={20} 
                      className={`transition-colors duration-300 ${
                        activeLink === item.id 
                          ? 'text-blue-600' 
                          : 'text-blue-500 group-hover:text-blue-600'
                      }`} 
                    />
                    <span className="bg-gradient-to-b from-blue-700 to-blue-900 bg-clip-text text-transparent">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Updated CSS Animations with IEEE Blue Colors */}
      <style jsx>{`
        @keyframes border-glow-translate {
          0% {
            transform: translateX(-10%) translateY(-10%);
          }
          100% {
            transform: translateX(10%) translateY(10%);
          }
        }

        @keyframes border-glow-scale {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.5);
          }
        }

        @keyframes star-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes star-shine {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-50%) scale(0.5);
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-50%) scale(1.5);
          }
        }
      `}</style>
    </nav>
  );
};