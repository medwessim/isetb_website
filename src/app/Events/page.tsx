"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ALL_EVENTS, TECHNICAL_EVENTS, NON_TECHNICAL_EVENTS, type EventItem } from '../data/events';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// ─── Event Card ───────────────────────────────────────────────────────────────
const EventCard = ({ event, index }: { event: EventItem; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500
               overflow-hidden border border-gray-100 hover:-translate-y-1"
  >
    {/* Image */}
    <div className="relative h-44 sm:h-48 overflow-hidden">
      <img
        src={event.image}
        alt={event.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${
        event.category === 'technical'
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
          : 'bg-gradient-to-r from-amber-500 to-yellow-400'
      }`}>
        {event.category === 'technical' ? 'Technical' : 'Non-Technical'}
      </span>

      <span className="absolute top-3 right-3 bg-black/75 text-white px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm">
        {event.date ? formatDate(event.date) : 'TBA'}
      </span>
    </div>

    {/* Content */}
    <div className="p-4 sm:p-5">
      <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
        {event.name}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
        {event.description}
      </p>

      <div className="space-y-1.5 text-xs sm:text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <svg className={`w-3.5 h-3.5 flex-shrink-0 ${event.date ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {event.date && event.time
            ? <span>{formatDate(event.date)} · {event.time}</span>
            : <span className="italic text-gray-400">To be announced</span>}
        </div>

        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.location}{event.venue && event.venue !== '.' ? ` · ${event.venue}` : ''}</span>
        </div>
      </div>
    </div>

    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/10 transition-all duration-500 pointer-events-none" />
  </motion.div>
);

// ─── Tab config ───────────────────────────────────────────────────────────────
type Tab = 'all' | 'technical' | 'nonTechnical';

const TABS: { id: Tab; label: string; events: EventItem[]; activeClass: string }[] = [
  { id: 'all',          label: 'All Events',     events: ALL_EVENTS,           activeClass: 'from-blue-600 to-amber-400' },
  { id: 'technical',    label: 'Technical',      events: TECHNICAL_EVENTS,     activeClass: 'from-blue-600 to-indigo-600' },
  { id: 'nonTechnical', label: 'Non-Technical',  events: NON_TECHNICAL_EVENTS, activeClass: 'from-amber-500 to-yellow-400' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
const EventsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const current = TABS.find(t => t.id === activeTab)!;

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Header */}
      <section className="pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12 text-center max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
        >
          Events &amp; Activities
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed"
        >
          Discover technical and non-technical events designed to inspire, educate, and bring our community together.
        </motion.p>
      </section>

      {/* Tabs */}
      <div className="flex justify-center mb-8 sm:mb-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg border border-gray-200 w-full max-w-sm sm:max-w-lg">
          <div className="flex gap-1 sm:gap-1.5">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.activeClass} text-white shadow-md`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events grid */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <div className={`w-1.5 h-6 sm:h-7 bg-gradient-to-b ${current.activeClass} rounded-full`} />
            {current.label}
          </h2>
          <span className="text-xs sm:text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">
            {current.events.length} event{current.events.length !== 1 ? 's' : ''}
          </span>
        </div>

        {current.events.length === 0 ? (
          <div className="text-center py-20 text-white/40">No events yet — check back soon.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {current.events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        )}
      </div>

      <p className="text-center mt-12 sm:mt-16 text-white/50 text-sm">
        Questions?{' '}
        <a href="/Contact" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
          Contact our events team
        </a>
      </p>
    </div>
  );
};

export default EventsPage;
