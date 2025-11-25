"use client";
import React, { useState, useEffect } from 'react';

// Types
interface ExecutiveMember {
  id: number;
  name: string;
  role: string;
  image: string;
  facebook: string;
  linkedin: string;
  email: string;
}

interface ExecutiveCardProps {
  member: ExecutiveMember;
  index: number;
}

// Constants - Using absolute paths
const EXECUTIVE_MEMBERS: ExecutiveMember[] = [
  { 
    id: 1, 
    name: 'Tesnim Solly', 
    role: 'Chair', 
    image: '/images/tesnim.png',
    facebook: 'https://www.facebook.com/tesnim.solli',
    linkedin: 'https://www.linkedin.com/in/tesnim-solly-745805262/',
    email: 'mailto:sollytesnim@ieee.org'
  },
  { 
    id: 2, 
    name: 'Mohamed Chibane', 
    role: 'Vice Chair', 
    image: '/images/chibane.png',
    facebook: 'https://www.facebook.com/mohamed.chibane.7921',
    linkedin: 'https://www.linkedin.com/in/mohamed-chibane-456bb0336/',
    email: 'mailto:Mohamedchibane@ieee.org'
  },
  { 
    id: 3, 
    name: 'Amal Ben Jamaa', 
    role: 'Treasurer', 
    image: '/images/amal.png',
    facebook: 'https://www.facebook.com/amalbenjamaa',
    linkedin: 'https://www.linkedin.com/in/amal-ben-jamaa-3222b3330/',
    email: 'mailto:amalbenjamaa@ieee.org'
  },
  { 
    id: 4, 
    name: 'Med Wessim Saidani', 
    role: 'Webmaster', 
    image: '/images/wessim.png',
    facebook: 'https://www.facebook.com/mohamed.saidani.948011',
    linkedin: 'https://www.linkedin.com/in/mohamedwessim/',
    email: 'mailto:Wessimsaidani@ieee.org'
  },
  { 
    id: 5, 
    name: 'Tesnim Hajaji', 
    role: 'Secretary', 
    image: '/images/tesnim2.png',
    facebook: 'https://www.facebook.com/tasnim.hajjeji',
    linkedin: '#',
    email: 'mailto:tasnimhajjeji@ieee.org'
  },
];

// Icons remain the same...
const FacebookIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1.1em" viewBox="0 0 512 512" className={className}>
    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1.1em" viewBox="0 0 512 512" className={className}>
    <path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z"></path>
  </svg>
);

const EmailIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1.1em" viewBox="0 0 24 24" className={className}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
  </svg>
);

// Role Badge Component
const RoleBadge: React.FC<{ role: string }> = ({ role }) => (
  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium shadow-lg shadow-blue-500/25">
    {role}
  </div>
);

// Enhanced Social Links Component
const SocialLinks: React.FC<{ member: ExecutiveMember }> = ({ member }) => {
  const socialConfig = {
    facebook: {
      icon: FacebookIcon,
      label: 'Facebook',
      bgColor: 'bg-[#1877F2]',
      hoverBg: 'hover:from-[#331029] hover:to-[#310413]',
    },
    linkedin: {
      icon: LinkedInIcon,
      label: 'LinkedIn',
      bgColor: 'bg-[#0077B5]',
      hoverBg: 'hover:from-[#331029] hover:to-[#310413]',
    },
    email: {
      icon: EmailIcon,
      label: 'Email',
      bgColor: 'bg-[#EA4335]',
      hoverBg: 'hover:from-[#331029] hover:to-[#310413]',
    }
  };

  return (
    <div className="flex justify-center space-x-4 sm:space-x-6">
      {Object.entries(socialConfig).map(([key, config]) => (
        <a
          key={key}
          href={member[key as keyof ExecutiveMember] as string}
          target={key !== 'email' ? '_blank' : '_self'}
          rel={key !== 'email' ? 'noopener noreferrer' : ''}
          aria-label={`Visit ${member.name}'s ${config.label}`}
          className={`
            group relative flex justify-center p-2 sm:p-3 rounded-md drop-shadow-xl 
            ${config.bgColor} text-white font-semibold 
            hover:translate-y-1 hover:rounded-[50%] 
            transition-all duration-500 ${config.hoverBg}
            transform hover:scale-110
          `}
        >
          <config.icon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span
            className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-xs group-hover:-translate-y-8 duration-700 whitespace-nowrap pointer-events-none"
          >
            {config.label}
          </span>
        </a>
      ))}
    </div>
  );
};

// Enhanced Executive Card Component with better image handling
const ExecutiveCard: React.FC<ExecutiveCardProps> = ({ member, index }) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getFallbackAvatar = (name: string) => {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center rounded-2xl">
        <span className="text-white text-2xl sm:text-3xl font-bold">{getInitials(name)}</span>
      </div>
    );
  };

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = member.image;
    
    img.onload = () => {
      setImageStatus('loaded');
    };
    
    img.onerror = () => {
      setImageStatus('error');
    };
  }, [member.image]);

  return (
    <div 
      className="group relative bg-white/80 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Card content */}
      <div className="p-4 sm:p-6 flex flex-col items-center text-center relative z-10">
        {/* Avatar container */}
        <div className="relative mb-4 sm:mb-6">
          {/* Glow effect */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
          
          {/* Image container */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-2xl overflow-hidden shadow-xl transform group-hover:scale-105 transition-transform duration-500 bg-gray-200">
            {/* Loading skeleton */}
            {imageStatus === 'loading' && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 animate-pulse rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Profile image */}
            {imageStatus === 'loaded' ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover rounded-2xl"
                onError={() => setImageStatus('error')}
              />
            ) : imageStatus === 'error' ? (
              getFallbackAvatar(member.name)
            ) : null}
          </div>
          
          {/* Role indicator */}
          <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 border-3 border-white shadow-lg transform group-hover:scale-110 transition-transform duration-300"></div>
        </div>

        {/* Member info */}
        <h3 className="text-md sm:text-md md:text-md font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-gray-900 transition-colors duration-300">
          {member.name}
        </h3>

        {/* Role badge */}
        <div className="mb-4 sm:mb-6 transform group-hover:scale-105 transition-transform duration-300">
          <RoleBadge role={member.role} />
        </div>

        {/* Social links */}
        <div className="mt-4 sm:mt-6 w-full">
          <SocialLinks member={member} />
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-1.5 bg-gradient-to-r from-blue-600 to-blue-700 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
    </div>
  );
};

// Main Component
const ExecutiveCommittee: React.FC = () => {
  return (
    <section className="min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-lg border border-gray-200 mb-4 sm:mb-6 transform hover:scale-105 transition-transform duration-300">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-semibold text-gray-700">Executive Committee</span>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed px-4">
            Meet our dedicated team of leaders who guide our organization with expertise, 
            vision, and commitment to excellence.
          </p>
        </header>
        
        {/* Cards grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {EXECUTIVE_MEMBERS.map((member, index) => (
            <ExecutiveCard 
              key={member.id} 
              member={member} 
              index={index}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <p className="text-sm sm:text-base text-white">
            Connect with our team members through their social profiles
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveCommittee;