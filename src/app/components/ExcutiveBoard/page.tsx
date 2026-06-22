"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EXECUTIVE_MEMBERS, SUPERVISOR, type ExecutiveMember, type Supervisor } from '../../data/team';

interface ExecutiveCardProps {
  member: ExecutiveMember;
  index: number;
}

const FacebookIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1.1em" viewBox="0 0 512 512" className={className}>
    <path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1.1em" viewBox="0 0 512 512" className={className}>
    <path fill="currentColor" d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z" />
  </svg>
);

const EmailIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1.1em" viewBox="0 0 24 24" className={className}>
    <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const RoleBadge: React.FC<{ role: string }> = ({ role }) => (
  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium shadow-lg shadow-blue-500/30">
    {role}
  </div>
);

const SocialLinks: React.FC<{ member: ExecutiveMember }> = ({ member }) => {
  const socials = [
    { href: member.facebook, icon: FacebookIcon, label: 'Facebook', bgColor: 'bg-[#1877F2]' },
    { href: member.linkedin, icon: LinkedInIcon, label: 'LinkedIn', bgColor: 'bg-[#0077B5]' },
    { href: member.email, icon: EmailIcon, label: 'Email', bgColor: 'bg-[#EA4335]' },
  ];

  return (
    <div className="flex justify-center space-x-4 sm:space-x-6">
      {socials.map(({ href, icon: Icon, label, bgColor }) => (
        <a
          key={label}
          href={href}
          target={label !== 'Email' ? '_blank' : '_self'}
          rel={label !== 'Email' ? 'noopener noreferrer' : ''}
          aria-label={`${member.name}'s ${label}`}
          className={`group relative flex justify-center p-2 sm:p-3 rounded-md drop-shadow-xl ${bgColor} text-white hover:translate-y-1 hover:rounded-[50%] transition-all duration-500 transform hover:scale-110`}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute text-xs opacity-0 group-hover:opacity-100 group-hover:-translate-y-8 duration-700 whitespace-nowrap pointer-events-none text-white">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
};

const ExecutiveCard: React.FC<ExecutiveCardProps> = ({ member, index }) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  const getFallbackAvatar = (name: string) => (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center rounded-2xl">
      <span className="text-white text-2xl sm:text-3xl font-bold">{getInitials(name)}</span>
    </div>
  );

  useEffect(() => {
    const img = new Image();
    img.src = member.image;
    img.onload = () => setImageStatus('loaded');
    img.onerror = () => setImageStatus('error');
  }, [member.image]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-shadow duration-500 border border-white/20 overflow-hidden cursor-pointer"
    >
      {/* Hover glow overlay */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

      <div className="p-4 sm:p-6 flex flex-col items-center text-center relative z-10">
        {/* Avatar */}
        <div className="relative mb-4 sm:mb-6">
          <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 pointer-events-none" />
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-2xl overflow-hidden shadow-xl bg-white/20 transform group-hover:scale-105 transition-transform duration-500">
            {imageStatus === 'loading' && (
              <div className="absolute inset-0 bg-white/10 animate-pulse rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-white/40 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {imageStatus === 'loaded' && (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover rounded-2xl"
                onError={() => setImageStatus('error')}
              />
            )}
            {imageStatus === 'error' && getFallbackAvatar(member.name)}
          </div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 border-2 border-white/30 shadow-lg transform group-hover:scale-110 transition-transform duration-300" />
        </div>

        <h3 className="text-md font-bold text-white mb-2 sm:mb-3 transition-colors duration-300">
          {member.name}
        </h3>

        <div className="mb-4 sm:mb-6 transform group-hover:scale-105 transition-transform duration-300">
          <RoleBadge role={member.role} />
        </div>

        <div className="mt-4 sm:mt-6 w-full">
          <SocialLinks member={member} />
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
    </motion.div>
  );
};

// ─── Supervisor Card ──────────────────────────────────────────────────────────
const SupervisorCard: React.FC<{ supervisor: Supervisor }> = ({ supervisor }) => {
  const [imgStatus, setImgStatus] = useState<'loading' | 'loaded' | 'error'>(
    supervisor.image ? 'loading' : 'error'
  );

  useEffect(() => {
    if (!supervisor.image) return;
    const img = new Image();
    img.src = supervisor.image;
    img.onload = () => setImgStatus('loaded');
    img.onerror = () => setImgStatus('error');
  }, [supervisor.image]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex justify-center mb-10 sm:mb-14"
    >
      <div className="group relative flex flex-col sm:flex-row items-center gap-5 sm:gap-7
                      bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl
                      px-6 py-6 sm:px-10 sm:py-7 shadow-2xl w-full max-w-lg
                      hover:bg-white/15 transition-all duration-500">

        {/* Gold accent top border */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-amber-400/30 to-yellow-300/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-amber-400/50 shadow-lg bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
            {imgStatus === 'loading' && (
              <div className="absolute inset-0 animate-pulse bg-white/10 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white/40 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {imgStatus === 'loaded' && (
              <img src={supervisor.image} alt={supervisor.name} className="w-full h-full object-cover" />
            )}
            {imgStatus === 'error' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </div>
          {/* Star badge */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 border-2 border-white/20 flex items-center justify-center shadow-md">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        {/* Info */}
        <div className="text-center sm:text-left">
          <p className="text-xs font-semibold tracking-widest text-amber-400/80 uppercase mb-1">
            Branch Supervisor
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{supervisor.name}</h3>
          <p className="text-sm text-white/60">{supervisor.title} · {supervisor.institution}</p>

          <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
            {supervisor.email && supervisor.email !== 'mailto:' && (
              <a href={supervisor.email} aria-label="Email"
                 className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            )}
            {supervisor.linkedin && supervisor.linkedin !== '#' && (
              <a href={supervisor.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                 className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const ExecutiveCommittee: React.FC = () => {
  return (
    <section className="min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 sm:mb-6 transform hover:scale-105 transition-transform duration-300">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-2 animate-pulse" />
            <span className="text-sm font-semibold text-white/90">Executive Committee</span>
          </div>

          <h2
            className="text-2xl font-bold text-white md:text-3xl mb-4"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            Meet Our Team
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed px-4">
            Meet our dedicated team of leaders who guide our organization with expertise,
            vision, and commitment to excellence.
          </p>
        </motion.header>

        {/* Supervisor */}
        <SupervisorCard supervisor={SUPERVISOR} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {EXECUTIVE_MEMBERS.map((member, index) => (
            <ExecutiveCard key={member.id} member={member} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-8 sm:mt-12 md:mt-16"
        >
          <p className="text-sm sm:text-base text-white/60">
            Connect with our team members through their social profiles
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExecutiveCommittee;
