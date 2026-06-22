// app/components/Navbar.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Home,
  Calendar,
  Mail,
  Building,
  Users2,
  Moon,
  Sun,
} from 'lucide-react';
import Image from 'next/image';
import logo from "../assets/logo.png";
import { useTheme } from '../context/ThemeContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home',     name: 'Home',        href: '/',        icon: Home,     description: 'Return to homepage' },
    { id: 'about',    name: 'About US',    href: '/AboutUs', icon: Users2,   description: 'Learn about our organization' },
    { id: 'chapters', name: 'Chapters & AG', href: '/Chapters', icon: Building, description: 'Explore our chapters and affinity groups' },
    { id: 'events',   name: 'Events',      href: '/Events',  icon: Calendar, description: 'View upcoming events and activities' },
    { id: 'contact',  name: 'Contact',     href: '/Contact', icon: Mail,     description: 'Get in touch with us' },
  ];

  const getActiveLink = () => {
    if (pathname === '/') return 'home';
    return navItems.find(item => item.href === pathname)?.id || 'home';
  };
  const activeLink = getActiveLink();

  // ── Navbar glass style based on theme + scroll ──────────────────────────
  const navGlass = isDark
    ? scrolled
      ? 'bg-gray-950/90 border-blue-900/35 shadow-xl shadow-blue-950/30'
      : 'bg-gray-950/65 border-blue-900/20 shadow-lg shadow-blue-950/20'
    : scrolled
      ? 'bg-white/85 border-blue-100/50 shadow-xl shadow-blue-500/15'
      : 'bg-white/60 border-blue-100/50 shadow-lg shadow-blue-500/10';

  // ── Nav item colours ────────────────────────────────────────────────────
  const itemBg        = isDark ? 'bg-gray-900/80' : 'bg-blue-50/80';
  const itemBorder    = isDark ? 'border-blue-900/50' : 'border-blue-200/50';
  const itemHoverBg   = isDark ? 'group-hover:bg-gray-800/90' : 'group-hover:bg-white';
  const iconColor     = isDark ? 'text-cyan-400 group-hover:text-cyan-300' : 'text-blue-700 group-hover:text-blue-600';
  const textGradient  = isDark ? 'from-cyan-300 to-blue-300' : 'from-blue-700 to-blue-900/80';
  const activeBar     = isDark ? 'from-cyan-400 to-blue-500 shadow-cyan-500/50' : 'from-blue-500 to-blue-700 shadow-blue-500/50';
  const innerBg       = isDark ? 'bg-gray-900/90' : 'bg-white/90';

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20 sm:h-24 relative">
          <div
            className={`flex items-center justify-between w-full backdrop-blur-xl rounded-3xl border px-6 transition-all duration-300 ${navGlass}`}
          >
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

            {/* Desktop Nav items */}
            <div className="hidden md:flex items-center gap-3">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link key={item.id} href={item.href} className="group relative block">
                    <div className={`relative ${itemBg} rounded-2xl p-px overflow-hidden backdrop-blur-sm ${itemBorder} border shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-blue-300/70`}>
                      <span className="absolute inset-0 rounded-2xl overflow-hidden">
                        <span className="inset-0 absolute pointer-events-none select-none">
                          <span
                            className="block -translate-x-1/2 -translate-y-1/3 size-24 blur-xl"
                            style={{ background: 'linear-gradient(135deg, #00629B, #0086C9, #00A8E8)' }}
                          />
                        </span>
                      </span>
                      <span className="inset-0 absolute pointer-events-none select-none">
                        <span
                          className="block z-0 h-full w-12 blur-xl -translate-x-1/2 rounded-full"
                          style={{ background: 'linear-gradient(135deg, #00629B, #0086C9, #00A8E8)' }}
                        />
                      </span>
                      <span className={`flex items-center justify-center gap-2 relative z-[1] ${innerBg} rounded-[15px] py-3 px-6 w-full ${itemHoverBg} transition-all duration-300`}>
                        <span className="relative">
                          <IconComponent size={18} className={`opacity-80 transition-colors duration-300 ${iconColor}`} />
                          <span
                            className="rounded-full size-11 absolute opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-lg"
                            style={{ background: 'linear-gradient(135deg, #00629B, #0086C9, #00A8E8, #00C6FF)' }}
                          />
                        </span>
                        <span
                          className={`bg-gradient-to-b font-medium text-sm tracking-wide group-hover:scale-105 transition transform-gpu duration-300 ${activeLink === item.id ? textGradient.replace('to-blue-300', 'to-blue-200').replace('to-blue-900/80', 'to-blue-900') : textGradient} bg-clip-text text-transparent`}
                        >
                          {item.name}
                        </span>
                      </span>
                      {activeLink === item.id && (
                        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r ${activeBar} rounded-full shadow-lg`} />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Right side: theme toggle + mobile menu */}
            <div className="flex items-center gap-2">
              {/* Dark mode toggle */}
              <button
                onClick={toggle}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`
                  flex items-center justify-center w-10 h-10 rounded-2xl
                  border transition-all duration-300
                  ${isDark
                    ? 'bg-gray-800/80 border-blue-800/50 text-yellow-300 hover:bg-gray-700/90 hover:text-yellow-200'
                    : 'bg-blue-50/80 border-blue-200/50 text-blue-700 hover:bg-white hover:text-blue-600'
                  }
                `}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Mobile hamburger */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`inline-flex items-center justify-center rounded-2xl p-3 transition-all duration-300 border
                    ${isDark
                      ? 'text-cyan-400 hover:bg-gray-800/80 border-blue-900/40'
                      : 'text-blue-700 hover:bg-blue-50/80 border-blue-200/50'
                    }
                  `}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden backdrop-blur-xl rounded-2xl mt-3 mx-4 overflow-hidden border shadow-xl transition-colors duration-300
              ${isDark
                ? 'bg-gray-950/90 border-blue-900/30'
                : 'bg-white/90 border-blue-100/50'
              }
            `}
          >
            <div className="space-y-2 p-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    href={item.href}
                    key={item.id}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-4 rounded-xl text-base font-medium transition-all duration-300 group border
                      ${activeLink === item.id
                        ? isDark
                          ? 'bg-blue-950/60 text-cyan-300 border-blue-800/40'
                          : 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-700 border-blue-200/50'
                        : isDark
                          ? 'text-blue-300 hover:bg-gray-800/60 border-transparent'
                          : 'text-blue-600 hover:bg-blue-50/80 border-transparent'
                      }
                    `}
                  >
                    <IconComponent
                      size={20}
                      className={`transition-colors duration-300 ${
                        activeLink === item.id
                          ? isDark ? 'text-cyan-400' : 'text-blue-600'
                          : isDark ? 'text-blue-400 group-hover:text-cyan-400' : 'text-blue-500 group-hover:text-blue-600'
                      }`}
                    />
                    <span
                      className={`bg-gradient-to-b bg-clip-text text-transparent ${
                        isDark ? 'from-cyan-300 to-blue-300' : 'from-blue-700 to-blue-900'
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
