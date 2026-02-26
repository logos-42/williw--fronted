import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, type Variants } from 'framer-motion';
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
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollY } = useScroll();
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const NUM_PARTICLES = 120;
    const CONNECT_DIST = 100;
    const TRAIL_LEN = 10;
    const FOLLOW_STRENGTH = 0.012;
    const REPEL_RADIUS = 80;
    const REPEL_STRENGTH = 2.2;
    const FRICTION = 0.96;
    const WANDER = 0.18;

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

      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > TRAIL_LEN) p.trail.shift();

        p.vx += (Math.random() - 0.5) * WANDER;
        p.vy += (Math.random() - 0.5) * WANDER;

        if (active) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < REPEL_RADIUS) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            p.vx -= (dx / dist) * force;
            p.vy -= (dy / dist) * force;
          } else {
            p.vx += (dx / dist) * FOLLOW_STRENGTH * Math.min(dist / 200, 1);
            p.vy += (dy / dist) * FOLLOW_STRENGTH * Math.min(dist / 200, 1);
          }
        }

        p.vx *= FRICTION;
        p.vy *= FRICTION;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 3.5;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        const pad = 20;
        if (p.x < -pad) p.x = canvas.width + pad;
        if (p.x > canvas.width + pad) p.x = -pad;
        if (p.y < -pad) p.y = canvas.height + pad;
        if (p.y > canvas.height + pad) p.y = -pad;

        for (let t = 1; t < p.trail.length; t++) {
          const frac = t / p.trail.length;
          ctx.beginPath();
          ctx.arc(p.trail[t].x, p.trail[t].y, p.size * frac * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${frac * p.alpha * 0.4})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      }

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

  const titleVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: -40,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14,
      },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const glowVariants: Variants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeOut',
      },
    },
  };

  const floatVariants: Variants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const titleText = t('hero.title');

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Ambient Glow Background */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 pointer-events-none"
      >
        {/* Top-left warm glow */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-transparent blur-[120px]" />
        
        {/* Bottom-right cool glow */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-cyan-600/15 via-blue-500/10 to-transparent blur-[100px]" />
        
        {/* Center subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-r from-violet-500/5 via-transparent to-cyan-500/5 blur-[80px]" />
      </motion.div>

      {/* Animated grid pattern */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent to-black/60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Content with parallax */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Badge with glow */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 text-xs text-white/40 mono tracking-widest uppercase bg-white/5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white/90" />
          </span>
          Particle Flow
        </motion.div>

        {/* Title with word-by-word animation and parallax */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-6"
        >
          <motion.h1
            style={{ y: springY1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight text-white"
          >
            {titleText.split(' ').map((word: string, wordIndex: number) => (
              <motion.span
                key={wordIndex}
                variants={wordVariants}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        {/* Subtitle with reveal animation */}
        <motion.div
          variants={subtitleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full flex justify-center mb-10"
        >
          <motion.p 
            style={{ y: springY2 }}
            className="text-lg md:text-xl lg:text-2xl text-white/45 leading-relaxed not-italic font-normal text-center max-w-2xl"
          >
            {t('hero.subtitle')}
          </motion.p>
        </motion.div>

        {/* Buttons with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
        >
          {/* macOS download - Primary with glow */}
          <motion.a
            href="https://github.com/logos-42/williw/releases/download/v0.1.1/Williw.Desktop_0.1.1_x64.dmg"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-6 md:px-12 md:py-7 rounded-full font-bold text-lg md:text-xl tracking-wide inline-flex items-center justify-center gap-3 min-w-[260px] md:min-w-[280px] overflow-hidden"
          >
            {/* Button background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] transition-all duration-300" />
            
            {/* Glow effect */}
            <div className="absolute -inset-px bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
            
            {/* Shine effect */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </div>
            
            {/* Content */}
            <span className="relative z-10 flex items-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.13 2.04 14.13 1.5C14.13 0.67 13.13 0 12 0C10.87 0 9.87 0.67 9.87 1.5C9.87 2.04 10.27 2.67 11 3.5H13Z"/>
              </svg>
              Download for macOS
            </span>
          </motion.a>

          {/* Windows download - Outline with hover fill */}
          <motion.a
            href="https://github.com/logos-42/williw/releases/download/v0.1.1/Williw.Desktop_0.1.1_x64-setup.exe"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-6 md:px-12 md:py-7 rounded-full font-bold text-lg md:text-xl tracking-wide inline-flex items-center justify-center gap-3 min-w-[260px] md:min-w-[280px] overflow-hidden"
          >
            {/* Transparent background with border */}
            <div className="absolute inset-0 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10" />
            
            {/* Glow effect on hover */}
            <div className="absolute -inset-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <span className="relative z-10 flex items-center gap-3 text-white/80 group-hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 5.5L10.5 4.5V11.5H3V5.5ZM3 18.5V12.5H10.5V19.5L3 18.5ZM11 5.5L21 4.5V11.5H11V5.5ZM11 18.5L21 19.5V12.5H11V18.5Z"/>
              </svg>
              Download for Windows
            </span>
          </motion.a>
        </motion.div>

        {/* Version hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-6 md:mt-8 mono text-xs text-white/25 tracking-widest text-center"
        >
          v0.1.1 · Free &amp; Open Source
        </motion.p>

        {/* Scroll hint with bounce animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25"
        >
          <motion.span 
            variants={floatVariants}
            animate="animate"
            className="text-xs mono tracking-widest uppercase"
          >
            Scroll
          </motion.span>
          <motion.div 
            animate={{ 
              height: [32, 16, 32],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-px bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
