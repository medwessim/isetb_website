"use client";
import React, { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

// ─── Constants ───────────────────────────────────────────────────────────────
const CONNECTION_DISTANCE = 165;
const MOUSE_RADIUS = 210;

// ─── Particle colour palette (IEEE blue → cyan, mostly white) ────────────────
interface PColor { solid: string; glow: string; }
const PALETTE: PColor[] = [
  { solid: 'rgba(255, 255, 255, 0.92)', glow: 'rgba(210, 235, 255, 0.13)' }, // white
  { solid: 'rgba(255, 255, 255, 0.88)', glow: 'rgba(200, 230, 255, 0.12)' }, // white soft
  { solid: 'rgba(195, 240, 255, 0.82)', glow: 'rgba(100, 205, 255, 0.16)' }, // ice blue
  { solid: 'rgba(0, 198, 255, 0.80)',   glow: 'rgba(0, 198, 255, 0.22)'   }, // bright cyan
  { solid: 'rgba(0, 165, 230, 0.72)',   glow: 'rgba(0, 165, 230, 0.18)'   }, // ocean blue
];
// Cumulative weights: 30% white, 25% soft-white, 25% ice, 12% cyan, 8% ocean
const PALETTE_CDF = [0.30, 0.55, 0.80, 0.92, 1.00];

function pickColor(): PColor {
  const r = Math.random();
  for (let i = 0; i < PALETTE_CDF.length; i++) {
    if (r < PALETTE_CDF[i]) return PALETTE[i];
  }
  return PALETTE[0];
}

let globalTime = 0;

// ─── Particle ────────────────────────────────────────────────────────────────
class Particle {
  canvas: HTMLCanvasElement;
  x: number; y: number; baseX: number; baseY: number;
  size: number; currentSize: number; pulseOffset: number;
  density: number; velocityX: number; velocityY: number;
  friction: number; spring: number; hoverScale: number;
  autoSpeedX: number; autoSpeedY: number;
  autoAmplitude: number; autoFrequency: number; autoPhase: number;
  solidColor: string; glowColor: string;
  mouseProximity: number; // 0–1, cached each frame

  constructor(x: number, y: number, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.x = x; this.y = y; this.baseX = x; this.baseY = y;
    this.size = Math.random() * 1.4 + 0.65;
    this.currentSize = this.size;
    this.pulseOffset = Math.random() * Math.PI * 2;
    this.density = Math.random() * 7 + 2;
    this.velocityX = 0; this.velocityY = 0;
    this.friction = 0.86;
    this.spring = 0.11;
    this.hoverScale = 0;
    this.mouseProximity = 0;

    const c = pickColor();
    this.solidColor = c.solid;
    this.glowColor = c.glow;

    this.autoSpeedX = (Math.random() - 0.5) * 0.27;
    this.autoSpeedY = (Math.random() - 0.5) * 0.27;
    this.autoAmplitude = Math.random() * 16 + 7;
    this.autoFrequency = Math.random() * 0.0009 + 0.0004;
    this.autoPhase = Math.random() * Math.PI * 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const hm = 1 + this.hoverScale * 1.0;
    const sz = this.currentSize * hm;

    // Outer soft halo (colour-tinted per palette)
    const outerGrad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, sz * 5);
    outerGrad.addColorStop(0, this.glowColor);
    outerGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.fillStyle = outerGrad;
    ctx.arc(this.x, this.y, sz * 5, 0, Math.PI * 2);
    ctx.fill();

    // Core dot
    ctx.beginPath();
    ctx.fillStyle = this.solidColor;
    ctx.arc(this.x, this.y, sz, 0, Math.PI * 2);
    ctx.fill();
  }

  updateMobile(ctx: CanvasRenderingContext2D, deltaTime: number) {
    this.currentSize = this.size + Math.sin(globalTime * 0.002 + this.pulseOffset) * 0.32;
    const driftX = Math.sin(globalTime * this.autoFrequency + this.autoPhase) * this.autoAmplitude;
    const driftY = Math.cos(globalTime * this.autoFrequency * 0.7 + this.autoPhase) * this.autoAmplitude;
    this.x = this.baseX + driftX;
    this.y = this.baseY + driftY;
    this.baseX += this.autoSpeedX * deltaTime * 12;
    this.baseY += this.autoSpeedY * deltaTime * 12;
    this.handleEdges();
    this.draw(ctx);
  }

  update(ctx: CanvasRenderingContext2D, mouse: { x: number | undefined; y: number | undefined; radius: number }, deltaTime: number) {
    this.currentSize = this.size + Math.sin(globalTime * 0.003 + this.pulseOffset) * 0.32;
    this.mouseProximity = 0;

    let forceX = 0, forceY = 0;
    let isHovered = false;

    if (mouse.x !== undefined && mouse.y !== undefined) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        this.mouseProximity = 1 - dist / mouse.radius;
        isHovered = dist < mouse.radius * 0.42;
        const force = Math.pow((mouse.radius - dist) / mouse.radius, 1.5);
        forceX = (dx / dist) * force * this.density * 7;
        forceY = (dy / dist) * force * this.density * 7;
      }
    }

    this.hoverScale += ((isHovered ? 0.18 : 0) - this.hoverScale) * 0.1;

    const springFX = (this.baseX - this.x) * this.spring;
    const springFY = (this.baseY - this.y) * this.spring;
    this.velocityX += (forceX + springFX) * deltaTime;
    this.velocityY += (forceY + springFY) * deltaTime;
    this.velocityX *= this.friction;
    this.velocityY *= this.friction;
    this.x += this.velocityX * deltaTime * 60;
    this.y += this.velocityY * deltaTime * 60;
    this.handleEdges();
    this.draw(ctx);
  }

  handleEdges() {
    const m = this.currentSize;
    if (this.x > this.canvas.width + m) { this.x = -m; this.baseX = this.x; }
    else if (this.x < -m) { this.x = this.canvas.width + m; this.baseX = this.x; }
    if (this.y > this.canvas.height + m) { this.y = -m; this.baseY = this.y; }
    else if (this.y < -m) { this.y = this.canvas.height + m; this.baseY = this.y; }
  }
}

// ─── React Component ─────────────────────────────────────────────────────────
export const GradientBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const mouseRef    = useRef<{ x: number | undefined; y: number | undefined; radius: number }>({
    x: undefined, y: undefined, radius: MOUSE_RADIUS,
  });
  const animFrameId  = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const isMobileRef  = useRef(false);

  // ── Connection lines: two passes for performance ───────────────────────────
  // Pass 1 = normal (white-blue, dim), Pass 2 = near-cursor (cyan, bright)
  const drawConnections = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    const CD2 = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

    // Pass 1 — normal lines (white-blue)
    ctx.strokeStyle = 'rgba(190, 220, 255, 1)';
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        if (Math.max(particles[i].mouseProximity, particles[j].mouseProximity) > 0) continue;
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dSq = dx * dx + dy * dy;
        if (dSq >= CD2) continue;
        const fade = 1 - Math.pow(Math.sqrt(dSq) / CONNECTION_DISTANCE, 2);
        ctx.globalAlpha = fade * 0.19;
        ctx.lineWidth = 0.55 + fade * 0.45;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }

    // Pass 2 — cyan glow near cursor
    ctx.strokeStyle = 'rgba(0, 200, 255, 1)';
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const maxProx = Math.max(particles[i].mouseProximity, particles[j].mouseProximity);
        if (maxProx === 0) continue;
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dSq = dx * dx + dy * dy;
        if (dSq >= CD2) continue;
        const fade = 1 - Math.pow(Math.sqrt(dSq) / CONNECTION_DISTANCE, 2);
        ctx.globalAlpha = fade * (0.28 + maxProx * 0.62);
        ctx.lineWidth = 0.7 + fade * 0.4 + maxProx * 1.3;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
  }, []);

  // ── Cursor glow: pulsing ring + radial halo + tiny dot ────────────────────
  const drawCursorGlow = useCallback((ctx: CanvasRenderingContext2D) => {
    const m = mouseRef.current;
    if (m.x === undefined || m.y === undefined) return;

    const pulse = 0.5 + 0.5 * Math.sin(globalTime * 0.0045);

    // Soft radial halo
    const halo = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 58);
    halo.addColorStop(0, `rgba(0, 200, 255, ${(0.10 + pulse * 0.08).toFixed(3)})`);
    halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.beginPath();
    ctx.fillStyle = halo;
    ctx.arc(m.x, m.y, 58, 0, Math.PI * 2);
    ctx.fill();

    // Outer pulsing ring
    const outerR = 18 + pulse * 6;
    ctx.beginPath();
    ctx.arc(m.x, m.y, outerR, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 200, 255, ${(0.18 + pulse * 0.14).toFixed(3)})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Inner crisp ring
    ctx.beginPath();
    ctx.arc(m.x, m.y, 7 + pulse * 2, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 220, 255, ${(0.50 + pulse * 0.30).toFixed(3)})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Tiny bright centre dot
    ctx.beginPath();
    ctx.arc(m.x, m.y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(120, 230, 255, ${(0.80 + pulse * 0.20).toFixed(3)})`;
    ctx.fill();
  }, []);

  const checkMobile = useCallback(() => window.innerWidth < 768, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    let lastTime = 0;
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const init = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobileRef.current = checkMobile();
      particlesRef.current = [];
      const count = Math.floor((canvas.width * canvas.height) / 8200);
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          canvas
        ));
      }
    };

    const animate = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime   = currentTime;
      globalTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const isMobile  = isMobileRef.current;

      for (let i = 0; i < particles.length; i++) {
        if (isMobile) particles[i].updateMobile(ctx, dt);
        else          particles[i].update(ctx, mouseRef.current, dt);
      }

      drawConnections(ctx, particles);

      if (!isMobile) drawCursorGlow(ctx);

      animFrameId.current = requestAnimationFrame(animate);
    };

    // ── Event handlers ────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      if (isMobileRef.current) return;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onMouseOut = () => {
      if (isMobileRef.current) return;
      mouseRef.current.x = undefined;
      mouseRef.current.y = undefined;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isMobileRef.current || !e.touches[0]) return;
      e.preventDefault();
      mouseRef.current.x = e.touches[0].clientX;
      mouseRef.current.y = e.touches[0].clientY;
    };
    const onTouchEnd = () => {
      if (isMobileRef.current) return;
      mouseRef.current.x = undefined;
      mouseRef.current.y = undefined;
    };
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => { isMobileRef.current = checkMobile(); init(); }, 250);
    };

    if (!checkMobile()) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseout', onMouseOut);
    }
    window.addEventListener('touchmove', onTouchMove, { passive: isMobileRef.current });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', onResize);

    init();
    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimeout);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [drawConnections, drawCursorGlow, checkMobile]);

  return (
    <div
      className="fixed inset-0 overflow-hidden -z-10 select-none transition-colors duration-700"
      style={{ background: isDark ? '#00060f' : 'transparent' }}
    >
      {/* Base radial overlay */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 30% 30%, rgba(0, 20, 50, 0.55), rgba(0, 5, 15, 0.70))'
            : 'radial-gradient(circle at 30% 30%, rgba(173, 216, 230, 0.18), rgba(0, 105, 148, 0.28))'
        }}
      />

      {/* Primary rotating conic gradient */}
      <div
        className="absolute top-1/2 left-1/2 w-[220%] h-[220%] transition-opacity duration-700"
        style={{
          background: isDark
            ? 'conic-gradient(from 0deg, #000510, #000d22, #001a3a, #002952, #001a3a, #000d22, #001a3a, #002952, #003566, #002952, #001a3a, #000d22, #000510)'
            : 'conic-gradient(from 0deg, #003f5c, #005a87, #0077b6, #0096c7, #00b4d8, #48cae4, #90e0ef, #ade8f4, #90e0ef, #48cae4, #00b4d8, #0096c7, #0077b7, #005a87, #003f5c)',
          opacity: isDark ? 1 : 0.85,
          transform: 'translate(-50%, -50%)',
          animation: 'rotate-smooth 25s linear infinite',
          filter: isDark ? 'blur(55px)' : 'blur(60px)',
        }}
      />

      {/* Secondary counter-rotating conic gradient */}
      <div
        className="absolute top-1/2 left-1/2 w-[200%] h-[200%] transition-opacity duration-700"
        style={{
          background: isDark
            ? 'conic-gradient(from 0deg, #000510, #001020, #002040, #001535, #000a18, #002040, #001020, #000510)'
            : 'conic-gradient(from 0deg, #003f5c, #005a87, #0077b6, #0096c7, #00b4d8, #48cae4, #90e0ef, #48cae4, #00b4d8, #0096c7, #0077b6, #005a87, #003f5c)',
          opacity: isDark ? 0.9 : 0.65,
          transform: 'translate(-50%, -50%)',
          animation: 'rotate-smooth-reverse 35s linear infinite',
          filter: isDark ? 'blur(50px)' : 'blur(60px)',
        }}
      />

      <style jsx global>{`
        @keyframes rotate-smooth {
          0%   { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes rotate-smooth-reverse {
          0%   { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ touchAction: isMobileRef.current ? 'auto' : 'none' }}
      />
    </div>
  );
};

export default GradientBackground;
