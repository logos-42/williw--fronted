import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import logo from '../assets/williw.png';

export default function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-3'
          : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Williw" className="w-8 h-8 rounded-md object-cover grayscale" />
          <span className="text-xl font-bold tracking-tight text-white">Williw</span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: t('header.features'), id: 'features' },
            { label: t('header.howItWorks'), id: 'how-it-works' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative text-sm text-white/50 hover:text-white transition-colors duration-200 group"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

      </div>
    </motion.header>
  );
}
