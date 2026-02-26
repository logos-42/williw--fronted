import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  trail: Array<{ x: number; y: number }>;
  color: 'white' | 'blue' | 'purple';
}

export default function Hero() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const NUM_PARTICLES = 150;
    const CONNECT_DIST = 120;
    const TRAIL_LEN = 12;
    const FOLLOW_STRENGTH = 0.015;
    const REPEL_RADIUS = 100;
    const REPEL_STRENGTH = 2.5;
    const FRICTION = 0.95;
    const WANDER = 0.2;

    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const colors: Array<'white' | 'blue' | 'purple'> = ['white', 'white', 'white', 'blue', 'purple'];
      particles = Array.from({ length: NUM_PARTICLES }, () => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const baseAlpha = 0.3 + Math.random() * 0.5;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: 0.8 + Math.random() * 1.6,
          alpha: baseAlpha,
          baseAlpha,
          trail: [],
          color,
        };
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const draw = () => {
      if (!canvas || !ctx) return;

      const { x: mx, y: my, active } = mouseRef.current;

      // Fade background with trail effect
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update & draw each particle
      for (const p of particles) {
        // Save trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > TRAIL_LEN) p.trail.shift();

        // Random wander
        p.vx += (Math.random() - 0.5) * WANDER;
        p.vy += (Math.random() - 0.5) * WANDER;

        if (active) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < REPEL_RADIUS) {
            // Repel from cursor
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            p.vx -= (dx / dist) * force;
            p.vy -= (dy / dist) * force;
          } else {
            // Gently drift toward cursor
            p.vx += (dx / dist) * FOLLOW_STRENGTH * Math.min(dist / 200, 1);
            p.vy += (dy / dist) * FOLLOW_STRENGTH * Math.min(dist / 200, 1);
          }
        }

        // Friction
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 4;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Soft boundary wrap
        const pad = 30;
        if (p.x < -pad) p.x = canvas.width + pad;
        if (p.x > canvas.width + pad) p.x = -pad;
        if (p.y < -pad) p.y = canvas.height + pad;
        if (p.y > canvas.height + pad) p.y = -pad;

        // Draw trail with color
        for (let t = 1; t < p.trail.length; t++) {
          const frac = t / p.trail.length;
          ctx.beginPath();
          ctx.arc(p.trail[t].x, p.trail[t].y, p.size * frac * 0.7, 0, Math.PI * 2);
          
          let trailColor: string;
          if (p.color === 'blue') {
            trailColor = `rgba(0, 212, 255, ${frac * p.alpha * 0.4})`;
          } else if (p.color === 'purple') {
            trailColor = `rgba(139, 92, 246, ${frac * p.alpha * 0.4})`;
          } else {
            trailColor = `rgba(255,255,255,${frac * p.alpha * 0.4})`;
          }
          ctx.fillStyle = trailColor;
          ctx.fill();
        }

        // Draw particle with color
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        let particleColor: string;
        if (p.color === 'blue') {
          particleColor = `rgba(0, 212, 255, ${p.alpha})`;
        } else if (p.color === 'purple') {
          particleColor = `rgba(139, 92, 246, ${p.alpha})`;
        } else {
          particleColor = `rgba(255,255,255,${p.alpha})`;
        }
        ctx.fillStyle = particleColor;
        ctx.fill();
      }

      // Draw connections with gradient colors
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.2;
            
            // Gradient connection based on particle colors
            const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            
            const getColor = (p: Particle) => {
              if (p.color === 'blue') return `rgba(0, 212, 255,`;
              if (p.color === 'purple') return `rgba(139, 92, 246,`;
              return `rgba(255, 255, 255,`;
            };
            
            gradient.addColorStop(0, getColor(particles[i]) + alpha + ')');
            gradient.addColorStop(1, getColor(particles[j]) + alpha + ')');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw cursor glow ring with pulse effect
      if (active && mx > 0) {
        const t = Date.now() / 1000;
        const pulse = 1 + 0.3 * Math.sin(t * 3);
        
        // Outer ring
        ctx.beginPath();
        ctx.arc(mx, my, REPEL_RADIUS * pulse * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.08)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner glow
        const innerGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 60);
        innerGlow.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
        innerGlow.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.fillStyle = innerGlow;
        ctx.beginPath();
        ctx.arc(mx, my, 60, 0, Math.PI * 2);
        ctx.fill();

        // Center dot
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-bg opacity-50" />
      
      {/* Star points */}
      <div className="absolute inset-0 stars-bg opacity-30" />

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent to-black/60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Mouse follow glow */}
      <div 
        className="mouse-glow opacity-60"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          background: `radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full glass-strong text-xs mono tracking-widest uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
          <span className="gradient-text-tricolor">Particle Flow Network</span>
        </motion.div>

        {/* Main title with neon effect */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight"
        >
          <span className="gradient-text-tricolor">{t('hero.title')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="w-full flex justify-center mb-12"
        >
          <p className="text-lg md:text-xl text-white/50 leading-relaxed not-italic font-normal text-center max-w-2xl">
            {t('hero.subtitle')}
          </p>
        </motion.div>

        {/* Download buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* macOS download */}
          <a
            href="https://github.com/logos-42/williw/releases/download/v0.1.1/Williw.Desktop_0.1.1_x64.dmg"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient px-12 py-7 rounded-full font-bold text-xl tracking-wide inline-flex items-center justify-center gap-3 min-w-[280px] shadow-lg group"
          >
            <svg className="w-6 h-6 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.13 2.04 14.13 1.5C14.13 0.67 13.13 0 12 0C10.87 0 9.87 0.67 9.87 1.5C9.87 2.04 10.27 2.67 11 3.5H13Z"/>
            </svg>
            Download for macOS
          </a>

          {/* Windows download */}
          <a
            href="https://github.com/logos-42/williw/releases/download/v0.1.1/Williw.Desktop_0.1.1_x64-setup.exe"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-12 py-7 rounded-full font-bold text-xl tracking-wide inline-flex items-center justify-center gap-3 min-w-[280px] group"
          >
            <svg className="w-6 h-6 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 5.5L10.5 4.5V11.5H3V5.5ZM3 18.5V12.5H10.5V19.5L3 18.5ZM11 5.5L21 4.5V11.5H11V5.5ZM11 18.5L21 19.5V12.5H11V18.5Z"/>
            </svg>
            Download for Windows
          </a>
        </motion.div>

        {/* Version hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 mono text-xs text-white/30 tracking-widest text-center"
        >
          v0.1.1 · Free &amp; Open Source
        </motion.p>

        {/* Scroll hint with enhanced styling */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-xs mono tracking-widest uppercase text-white/30">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-neon-blue/50 via-purple-500/30 to-transparent animate-pulse" />
        </motion.div>
      </div>

      {/* Decorative light streaks */}
      <div className="absolute top-1/4 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
}
