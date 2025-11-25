"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Event data - you can replace this with your actual data
const eventsData = {
  technical: [
    {
      id: 1,
      name: "CODE IT UP 6.0",
      description: "A hands-on coding event to challenge your skills, build projects, and compete with peers.",
      image: "../../images/12.jpg",
      category: "technical",
      date: "", //date: "2024-02-18",
      time: "", //time: "2:00 PM - 5:00 PM",
      location: "ISET Bizerte",
      venue: "."
    },
    {
      id: 2,
      name: "Bizerte TCODI 3.0",
      description: "A tech and coding competition in Bizerte where students solve real-world problems, showcase innovation, and collaborate on cutting-edge projects.",
      image: "../../images/7.png",
      category: "technical",
      date: "", //date: "2024-02-18",
      time: "", //time: "2:00 PM - 5:00 PM",
      location: "ISET Bizerte",
      venue: "."
    },

  ],
  nonTechnical: [
    {
      id: 5,
      name: "General Assembly",
      description: "The official gathering of our IEEE ISET Bizerte members to discuss achievements, plan future activities, and make key decisions for the branch’s growth and community impact.",
      image: "../../images/13.jpg",
      category: "non-technical",
      date: "", //date: "2024-02-18",
      time: "", //time: "2:00 PM - 5:00 PM",
      location: "ISET Bizerte",
      venue: "."
    },

  ]
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const EventCard = ({ event }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
    >
      <div
        className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-1 sm:hover:-translate-y-2"
      >
        {/* Image Container */}
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Category Badge */}
          <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold text-white ${event.category === 'technical'
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
            : 'bg-gradient-to-r from-yellow-500 to-yellow-500'
            }`}>
            {event.category === 'technical' ? 'Technical' : 'Non-Technical'}
          </div>

          {/* Date Badge */}
          {/* Date Badge */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/80 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold backdrop-blur-sm">
            {event.date ? formatDate(event.date) : 'TBA'}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {event.name}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
            {event.description}
          </p>

          {/* Event Details */}
          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
            {/* Date & Time */}
            {/* Date & Time */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <svg className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${event.date && event.time ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {event.date && event.time ? (
                <>
                  <span className="font-medium truncate">{formatDate(event.date)}</span>
                  <span className="text-gray-400 flex-shrink-0">•</span>
                  <span className="truncate">{event.time}</span>
                </>
              ) : (
                <span className="text-gray-500 italic">To be announced</span>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium truncate">{event.location}</span>
              {event.venue && (
                <>
                  <span className="text-gray-400 flex-shrink-0">•</span>
                  <span className="truncate">{event.venue}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:border-blue-500/10 transition-all duration-500 pointer-events-none" />
      </div>
    </div>
  );
};

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Combine all events for the "All" tab
  const allEvents = [...eventsData.technical, ...eventsData.nonTechnical];

  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="relative min-h-screen overflow-x-hidden">
        {/* Hero Section */}
        <section className="pt-20 sm:pt-24 lg:pt-32 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white"
            >
              Events & Activities
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-white/90 px-2"
            >
              Discover exciting technical and non-technical events designed to inspire, educate, and bring our community together.
            </motion.p>
          </div>
        </section>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16 mt-8 sm:mt-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-lg border border-gray-200 w-full max-w-2xl">
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${activeTab === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-yellow-400 text-white shadow-lg shadow-purple-500/25'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                All Events
              </button>
              <button
                onClick={() => setActiveTab('technical')}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${activeTab === 'technical'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                Technical
              </button>
              <button
                onClick={() => setActiveTab('nonTechnical')}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${activeTab === 'nonTechnical'
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-500 text-white shadow-lg shadow-yellow-500/25'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                Non-Technical
              </button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {/* All Events Section */}
          {activeTab === 'all' && (
            <section className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6 sm:mb-8 px-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
                  <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-blue-600 to-yellow-500 rounded-full" />
                  All Events
                </h2>
                <span className="text-xs sm:text-sm text-gray-300 bg-white/20 px-2 sm:px-3 py-1 rounded-full">
                  {allEvents.length} events
                </span>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {allEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

          {/* Technical Events Section */}
          {activeTab === 'technical' && (
            <section className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6 sm:mb-8 px-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
                  <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
                  Technical Events
                </h2>
                <span className="text-xs sm:text-sm text-gray-300 bg-white/20 px-2 sm:px-3 py-1 rounded-full">
                  {eventsData.technical.length} events
                </span>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {eventsData.technical.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

          {/* Non-Technical Events Section */}
          {activeTab === 'nonTechnical' && (
            <section className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6 sm:mb-8 px-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
                  <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-yellow-500 to-yellow-500 rounded-full" />
                  Non-Technical Events
                </h2>
                <span className="text-xs sm:text-sm text-gray-300 bg-white/20 px-2 sm:px-3 py-1 rounded-full">
                  {eventsData.nonTechnical.length} events
                </span>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {eventsData.nonTechnical.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20 px-4">
          <p className="text-gray-300 text-sm sm:text-base">
            Can't find what you're looking for?{' '}
            <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300">
              Contact our events team
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;