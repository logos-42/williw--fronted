import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export default function Hero() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let currentColor = { r: 255, g: 100, b: 30 };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const getColorFromPosition = (x: number, y: number, width: number, height: number) => {
      const ratioX = x / width;
      const ratioY = y / height;
      
      const targetR = 255;
      const targetG = Math.floor(150 - ratioX * 80 - ratioY * 60);
      const targetB = Math.floor(30 + ratioX * 60 + ratioY * 80);
      
      return { 
        r: targetR, 
        g: Math.max(20, Math.min(200, targetG)), 
        b: Math.max(0, Math.min(150, targetB)) 
      };
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const targetColor = getColorFromPosition(currentX, currentY, canvas.width, canvas.height);
      currentColor.r += (targetColor.r - currentColor.r) * 0.06;
      currentColor.g += (targetColor.g - currentColor.g) * 0.06;
      currentColor.b += (targetColor.b - currentColor.b) * 0.06;

      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'screen';

      const mainColor = { ...currentColor };
      const secondaryColor = getColorFromPosition(canvas.width - currentX, canvas.height - currentY, canvas.width, canvas.height);

      const mainGradient = ctx.createRadialGradient(
        currentX,
        currentY,
        0,
        currentX,
        currentY,
        Math.min(canvas.width, canvas.height) * 0.5
      );
      mainGradient.addColorStop(0, `rgba(${mainColor.r}, ${mainColor.g}, ${mainColor.b}, 0.55)`);
      mainGradient.addColorStop(0.3, `rgba(${mainColor.r}, ${mainColor.g}, ${mainColor.b}, 0.3)`);
      mainGradient.addColorStop(0.6, `rgba(${secondaryColor.r}, ${secondaryColor.g}, ${secondaryColor.b}, 0.12)`);
      mainGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = mainGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const innerGlow = ctx.createRadialGradient(
        currentX,
        currentY,
        0,
        currentX,
        currentY,
        120
      );
      innerGlow.addColorStop(0, `rgba(${mainColor.r}, ${mainColor.g}, ${mainColor.b}, 0.45)`);
      innerGlow.addColorStop(0.5, `rgba(${mainColor.r}, ${mainColor.g}, ${mainColor.b}, 0.18)`);
      innerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = innerGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cornerGradient1 = ctx.createRadialGradient(
        0, 0, 0,
        0, 0, canvas.width * 0.35
      );
      cornerGradient1.addColorStop(0, 'rgba(255, 100, 0, 0.22)');
      cornerGradient1.addColorStop(0.5, 'rgba(255, 50, 0, 0.1)');
      cornerGradient1.addColorStop(1, 'transparent');
      ctx.fillStyle = cornerGradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cornerGradient2 = ctx.createRadialGradient(
        canvas.width, canvas.height, 0,
        canvas.width, canvas.height, canvas.width * 0.35
      );
      cornerGradient2.addColorStop(0, 'rgba(255, 0, 50, 0.22)');
      cornerGradient2.addColorStop(0.5, 'rgba(200, 0, 100, 0.1)');
      cornerGradient2.addColorStop(1, 'transparent');
      ctx.fillStyle = cornerGradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const topGradient = ctx.createRadialGradient(
        canvas.width / 2, 0, 0,
        canvas.width / 2, 0, canvas.width * 0.3
      );
      topGradient.addColorStop(0, 'rgba(255, 170, 0, 0.2)');
      topGradient.addColorStop(0.6, 'rgba(255, 100, 0, 0.08)');
      topGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = topGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'source-over';

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('mousemove', handleMouseMove);
    draw();

    const handleResize = () => {
      resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-relaxed text-center"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 mb-10"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#download"
            className="btn-gradient px-8 py-4 rounded-full text-white font-semibold text-lg"
          >
            {t('hero.ctaPrimary')}
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-full text-white font-semibold text-lg border border-white/20 hover:bg-white/10 transition-all duration-300"
          >
            {t('hero.ctaSecondary')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
