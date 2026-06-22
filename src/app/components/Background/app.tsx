"use client";
import React, { useEffect, useRef, useCallback } from 'react';

const PARTICLE_COLOR = 'rgba(255, 255, 255, 0.8)';
const LINE_COLOR = 'rgba(255, 255, 255, 0.15)';
const CONNECTION_DISTANCE = 150;

let globalTime = 0;

class Particle {
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  currentSize: number;
  pulseOffset: number;
  density: number;
  velocityX: number;
  velocityY: number;
  friction: number;
  spring: number;
  hoverScale: number;
  autoSpeedX: number;
  autoSpeedY: number;
  autoAmplitude: number;
  autoFrequency: number;
  autoPhase: number;

  constructor(x: number, y: number, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
      this.x = x;
      this.y = y;
      this.baseX = x;
      this.baseY = y;
      this.size = Math.random() * 1.5 + 1;
      this.currentSize = this.size;
      this.pulseOffset = Math.random() * Math.PI * 2;
      this.density = (Math.random() * 8) + 2;
      this.velocityX = 0;
      this.velocityY = 0;
      this.friction = 0.88;
      this.spring = 0.08;
      this.hoverScale = 1; // For hover effects
      
      // Mobile auto-animation properties - smoother and slower
      this.autoSpeedX = (Math.random() - 0.5) * 0.3;  // Reduced from 0.8 to 0.3
      this.autoSpeedY = (Math.random() - 0.5) * 0.3;  // Reduced from 0.8 to 0.3
      this.autoAmplitude = Math.random() * 15 + 8;     // Reduced from 20+10 to 15+8
      this.autoFrequency = Math.random() * 0.001 + 0.0005; // Reduced from 0.002+0.001 to 0.001+0.0005
      this.autoPhase = Math.random() * Math.PI * 2;
    }

    /**
     * Enhanced drawing with better performance
     */
    draw(ctx: CanvasRenderingContext2D) {
      const hoverMultiplier = 1 + (this.hoverScale * 0.5);
      const displaySize = this.currentSize * hoverMultiplier;

      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, displaySize * 3
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, displaySize * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = PARTICLE_COLOR;
      ctx.arc(this.x, this.y, displaySize, 0, Math.PI * 2);
      ctx.fill();
    }

    updateMobile(ctx: CanvasRenderingContext2D, deltaTime: number) {
      this.currentSize = this.size + Math.sin(globalTime * 0.002 + this.pulseOffset) * 0.3;

      const time = globalTime;
      const driftX = Math.sin(time * this.autoFrequency + this.autoPhase) * this.autoAmplitude;
      const driftY = Math.cos(time * this.autoFrequency * 0.7 + this.autoPhase) * this.autoAmplitude;
      
      // Apply auto movement (slower)
      this.x = this.baseX + driftX;
      this.y = this.baseY + driftY;

      // Gentle continuous movement (much slower)
      this.baseX += this.autoSpeedX * deltaTime * 15;  // Reduced from 30 to 15
      this.baseY += this.autoSpeedY * deltaTime * 15;  // Reduced from 30 to 15

      // Edge handling
      this.handleEdges();

      this.draw(ctx);
    }

    /**
     * Optimized physics update with hover effects (desktop)
     */
    update(ctx: CanvasRenderingContext2D, mouse: { x: number | undefined; y: number | undefined; radius: number }, deltaTime: number) {
      this.currentSize = this.size + Math.sin(globalTime * 0.003 + this.pulseOffset) * 0.3;

      let forceX = 0;
      let forceY = 0;
      let isHovered = false;

      // Enhanced mouse interaction
      if (mouse.x !== undefined && mouse.y !== undefined) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          isHovered = distance < mouse.radius * 0.5;
          const force = Math.pow((mouse.radius - distance) / mouse.radius, 1.5);
          const directionX = dx / distance;
          const directionY = dy / distance;
          
          forceX = directionX * force * this.density * 6;
          forceY = directionY * force * this.density * 6;
        }
      }

      // Smooth hover scale animation
      this.hoverScale += (isHovered ? 0.1 : 0 - this.hoverScale) * 0.1;

      // Spring force
      const springForceX = (this.baseX - this.x) * this.spring;
      const springForceY = (this.baseY - this.y) * this.spring;

      // Apply forces
      this.velocityX += (forceX + springForceX) * deltaTime;
      this.velocityY += (forceY + springForceY) * deltaTime;

      // Apply friction
      this.velocityX *= this.friction;
      this.velocityY *= this.friction;

      // Update position
      this.x += this.velocityX * deltaTime * 60;
      this.y += this.velocityY * deltaTime * 60;

      // Edge handling
      this.handleEdges();

      this.draw(ctx);
    }

    handleEdges() {
      const margin = this.currentSize;
      
      if (this.x > this.canvas.width + margin) {
        this.x = -margin;
        this.baseX = this.x;
      } else if (this.x < -margin) {
        this.x = this.canvas.width + margin;
        this.baseX = this.x;
      }
      
      if (this.y > this.canvas.height + margin) {
        this.y = -margin;
        this.baseY = this.y;
      } else if (this.y < -margin) {
        this.y = this.canvas.height + margin;
        this.baseY = this.y;
      }
    }
  }

export const GradientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | undefined; y: number | undefined; radius: number }>({
    x: undefined,
    y: undefined,
    radius: 180,
  });
  const animationFrameId = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const isMobileRef = useRef(false);

  // Optimized connection drawing using spatial partitioning
  const drawConnections = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    ctx.strokeStyle = LINE_COLOR;
    ctx.lineWidth = 1.2;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
          const distance = Math.sqrt(distanceSq);
          const opacity = 1 - Math.pow(distance / CONNECTION_DISTANCE, 2);
          ctx.globalAlpha = opacity * 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1.0;
  }, []);

  // Check if mobile
  const checkMobile = useCallback(() => {
    return window.innerWidth < 768;
  }, []);

  // Effect to set up and run the canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // High-quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    let lastTime = 0;
    let resizeTimeout: ReturnType<typeof setTimeout>;

    /**
     * Enhanced initialization with 50% more particles
     */
    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Update mobile detection
      isMobileRef.current = checkMobile();
      
      particlesRef.current = [];
      // Increased particle density by 50% for richer network
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesRef.current.push(new Particle(x, y, canvas));
      }
    };

    /**
     * Optimized animation loop
     */
    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      globalTime = currentTime;

      // Efficient canvas clearing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const isMobile = isMobileRef.current;
      
      // Batch update particles
      for (let i = 0; i < particles.length; i++) {
        if (isMobile) {
          particles[i].updateMobile(ctx, deltaTime);
        } else {
          particles[i].update(ctx, mouseRef.current, deltaTime);
        }
      }

      // Draw connections
      drawConnections(ctx, particles);

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // --- Enhanced Event Handlers ---
    const handleMouseMove = (event: MouseEvent) => {
      if (!mouseRef.current || isMobileRef.current) return;
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseOut = () => {
      if (!mouseRef.current || isMobileRef.current) return;
      mouseRef.current.x = undefined;
      mouseRef.current.y = undefined;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isMobileRef.current) return;
      if (!mouseRef.current || !event.touches[0]) return;
      event.preventDefault();
      mouseRef.current.x = event.touches[0].clientX;
      mouseRef.current.y = event.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (!mouseRef.current || isMobileRef.current) return;
      mouseRef.current.x = undefined;
      mouseRef.current.y = undefined;
    };
    
    const handleResize = () => {
      isMobileRef.current = checkMobile();
      init();
    };

    // Throttled resize handler
    const handleThrottledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 250);
    };

    // Event listeners - only add mouse listeners if not mobile
    if (!checkMobile()) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseout', handleMouseOut);
    }
    
    // Touch listeners - passive on mobile to allow scrolling
    window.addEventListener('touchmove', handleTouchMove, { 
      passive: isMobileRef.current 
    });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleThrottledResize);

    // Initial setup
    init();
    animationFrameId.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleThrottledResize);
      clearTimeout(resizeTimeout);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [drawConnections, checkMobile]);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 select-none">
      {/* Enhanced gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(173, 216, 230, 0.18), rgba(0, 105, 148, 0.28))'
        }}
      />

      {/* Primary rotating gradient - larger coverage */}
      <div
        className="absolute top-1/2 left-1/2 w-[220%] h-[220%] opacity-85"
        style={{
          background: 'conic-gradient(from 0deg, #003f5c, #005a87, #0077b6, #0096c7, #00b4d8, #48cae4, #90e0ef, #ade8f4, #90e0ef, #48cae4, #00b4d8, #0096c7, #0077b7, #005a87, #003f5c)',
          transform: 'translate(-50%, -50%)',
          animation: 'rotate-smooth 25s linear infinite',
          filter: 'blur(60px)'
        }}
      />

      {/* Secondary rotating gradient - larger coverage */}
      <div
        className="absolute top-1/2 left-1/2 w-[200%] h-[200%] opacity-65"
        style={{
          background: 'conic-gradient(from 0deg, #003f5c, #005a87, #0077b6, #0096c7, #00b4d8, #48cae4, #90e0ef, #48cae4, #00b4d8, #0096c7, #0077b6, #005a87, #003f5c)',
          transform: 'translate(-50%, -50%)',
          animation: 'rotate-smooth-reverse 35s linear infinite',
          filter: 'blur(60px)'
        }}
      />

      {/* Enhanced CSS animations */}
      <style jsx global>{`
        @keyframes rotate-smooth {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes rotate-smooth-reverse {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>
      
      {/* High-performance canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          touchAction: isMobileRef.current ? 'auto' : 'none' // Allow scrolling on mobile
        }}
      />
    </div>
  );
};

export default GradientBackground;