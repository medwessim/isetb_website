"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/IEEE x ISETB_white.png";

// Social icons
const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className={className}>
    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className={className}>
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
  </svg>
);

const LinkedInIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className={className}>
    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
  </svg>
);

const PremiumFooter = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(true), []);

  const ieeeChapters = [
    { name: 'WIE (Women in Engineering)', href: '#' },
    { name: 'IAS & IES Joint Chapter ', href: '#' },
    { name: 'CS (Computer Society)', href: 'https://cs-isetbizerte.ieee.tn/' },
    { name: 'RAS (Robotics and Automation Society)', href: '#' },
    { name: 'CIS (Computational Intelligence Society)', href: 'https://cis-isetbizerte.ieee.tn/' }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/AboutUs' },
    { name: 'Chapter & AG', href: '/Chapters' },
    { name: 'Events', href: '/Events' },
    { name: 'Contact', href: '/Contact' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61550723499159', icon: FacebookIcon, color: 'hover:text-blue-400' },
    { name: 'Instagram', href: 'https://www.instagram.com/ieee_iset_bizerte_sb/', icon: InstagramIcon, color: 'hover:text-pink-500' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/ieee-iset-bizerte-student-branch', icon: LinkedInIcon, color: 'hover:text-blue-300' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 } }
  };

  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  return (
    <motion.footer initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={containerVariants} className="relative mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            {/* IEEE Chapters */}
            <motion.div variants={itemVariants} className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-semibold text-white tracking-wide">IEEE ISET Bizerte Chapters and AG</h3>
              <ul className="space-y-2">
                {ieeeChapters.map((chapter, index) => (
                  <motion.li key={chapter.name} variants={itemVariants} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                    <a href={chapter.href} target="_blank" className="text-white/80 hover:text-white transition flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                      {chapter.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-semibold text-white tracking-wide">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.li key={link.name} variants={itemVariants} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                    <a href={link.href} className="text-white/80 hover:text-white transition flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Social */}
            <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-white tracking-wide">Connect With Us</h3>
                <p className="text-white/70 text-sm leading-relaxed">Join our community and stay updated with the latest events, workshops, and opportunities from IEEE ISET Bizerte.</p>
              </div>

              <div className="flex space-x-3 md:space-x-4 flex-wrap">
                {socialLinks.map((social) => (
                  <motion.a key={social.name} href={social.href} target="_blank" variants={itemVariants} whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center text-white/80 ${social.color} hover:bg-white/20 transition shadow-lg hover:shadow-xl`}>
                    <social.icon className="w-4 h-4 md:w-5 md:h-5 transition-colors duration-300"/>
                  </motion.a>
                ))}
              </div>

              <div className="pt-3 md:pt-4 border-t border-white/10 text-sm text-white/60 space-y-1">
                <p>📍 ISET Bizerte, Tunisia</p>
                <p>✉️ isetb@ieee.tn</p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-4 md:my-6"/>

          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-white/60 text-sm text-center md:text-left">© {new Date().getFullYear()} IEEE ISET Bizerte. </div>

            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="flex items-center justify-center md:justify-end w-full md:w-auto">
              <Link href="/" className="relative w-36 h-10 md:w-40 md:h-12 block">
                <Image src={logo} alt="Logo" fill className="object-contain object-left hover:scale-105 transition-transform duration-300"/>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default PremiumFooter;
