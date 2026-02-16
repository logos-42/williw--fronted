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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Williw" className="w-10 h-10 rounded-lg object-cover" />
          <span className="text-2xl font-bold gradient-text">Williw</span>
        </div>

        {/* 导航 */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('features')}
            className="text-text-secondary hover:text-white transition-colors"
          >
            {t('header.features')}
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-text-secondary hover:text-white transition-colors"
          >
            {t('header.howItWorks')}
          </button>
          <button
            onClick={() => scrollToSection('download')}
            className="text-text-secondary hover:text-white transition-colors"
          >
            {t('header.download')}
          </button>
        </nav>

        {/* CTA 按钮 */}
        <button
          onClick={() => scrollToSection('download')}
          className="btn-gradient px-6 py-2 rounded-full font-semibold text-white"
        >
          {t('header.getStarted')}
        </button>
      </div>
    </motion.header>
  );
}
