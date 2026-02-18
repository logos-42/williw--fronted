import { useEffect, useRef } from 'react';
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
}

export default function Hero() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const NUM_PARTICLES = 120;
    const CONNECT_DIST = 100;
    const TRAIL_LEN = 10;
    const FOLLOW_STRENGTH = 0.012; // how strongly particles drift toward mouse
    const REPEL_RADIUS = 80;       // mouse repel zone radius
    const REPEL_STRENGTH = 2.2;
    const FRICTION = 0.96;
    const WANDER = 0.18;           // random wander force

    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = Array.from({ length: NUM_PARTICLES }, () => {
        const baseAlpha = 0.3 + Math.random() * 0.5;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: 0.8 + Math.random() * 1.4,
          alpha: baseAlpha,
          baseAlpha,
          trail: [],
        };
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const draw = () => {
      if (!canvas || !ctx) return;

      const { x: mx, y: my, active } = mouseRef.current;

      // Fade background (creates trail effect)
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
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
        const maxSpeed = 3.5;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Soft boundary wrap with slight padding
        const pad = 20;
        if (p.x < -pad) p.x = canvas.width + pad;
        if (p.x > canvas.width + pad) p.x = -pad;
        if (p.y < -pad) p.y = canvas.height + pad;
        if (p.y > canvas.height + pad) p.y = -pad;

        // Draw trail
        for (let t = 1; t < p.trail.length; t++) {
          const frac = t / p.trail.length;
          ctx.beginPath();
          ctx.arc(p.trail[t].x, p.trail[t].y, p.size * frac * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${frac * p.alpha * 0.4})`;
          ctx.fill();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.15;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw cursor glow ring if active
      if (active && mx > 0) {
        const t = Date.now() / 1000;
        const pulse = 1 + 0.25 * Math.sin(t * 4);
        ctx.beginPath();
        ctx.arc(mx, my, REPEL_RADIUS * pulse * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
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
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent to-black/60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 text-xs text-white/40 mono tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
          Particle Flow
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-white"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-lg md:text-xl text-white/45 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#download"
            className="btn-gradient px-8 py-3.5 rounded-full font-semibold text-base tracking-wide"
          >
            {t('hero.ctaPrimary')}
          </a>
          <a
            href="#features"
            className="btn-outline px-8 py-3.5 rounded-full font-semibold text-base tracking-wide"
          >
            {t('hero.ctaSecondary')}
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25"
        >
          <span className="text-xs mono tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
