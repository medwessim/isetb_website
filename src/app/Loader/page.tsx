'use client';

import { useEffect, useState } from 'react';

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already seen the loader
    const hasSeenLoader = localStorage.getItem('hasSeenLoader');
    
    if (hasSeenLoader) {
      setIsLoading(false);
      // Remove the hiding class when loader is not shown
      document.body.classList.remove('loading-active');
      return;
    }

    // Add class to body when loading starts
    document.body.classList.add('loading-active');

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('hasSeenLoader', 'true');
      // Remove the hiding class when loading completes
      document.body.classList.remove('loading-active');
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('loading-active');
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-lg">
      <div className="relative flex flex-col items-center justify-center">
        {/* Uiverse.io loading animation */}
        <div className="flex flex-row gap-2 mb-8">
          <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
        </div>
        
        {/* Loading text */}
        <div className="text-white/80 text-sm font-light tracking-wider">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loader;