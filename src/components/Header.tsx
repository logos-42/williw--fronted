import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import logo from '../assets/williw.png';

export default function Header() {
  const { t, toggleLanguage, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg shadow-black/20'
          : 'py-5 bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3 group cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative w-9 h-9 rounded-lg overflow-hidden ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-300">
            <img 
              src={logo} 
              alt="Williw" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" 
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-white/90 transition-colors">
            Williw
          </span>
        </motion.div>

        {/* Nav - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: t('header.features'), id: 'features' },
            { label: t('header.howItWorks'), id: 'how-it-works' },
          ].map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative text-sm text-white/50 hover:text-white transition-colors duration-200 group py-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-neon-blue to-neon-purple group-hover:w-full transition-all duration-300" />
            </motion.button>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <motion.button
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 text-xs mono text-white/60 hover:text-white transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className={`transition-opacity duration-300 ${language === 'zh' ? 'opacity-100' : 'opacity-40'}`}>
              中文
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span className={`transition-opacity duration-300 ${language === 'en' ? 'opacity-100' : 'opacity-40'}`}>
              EN
            </span>
          </motion.button>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg glass border border-white/10 text-white/60 hover:text-white transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {[
            { label: t('header.features'), id: 'features' },
            { label: t('header.howItWorks'), id: 'how-it-works' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left text-white/60 hover:text-white transition-colors py-2 text-sm"
            >
              {item.label}
            </button>
          ))}
          
          {/* Language toggle for mobile */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-3 py-2 text-sm mono text-white/60 hover:text-white transition-colors"
          >
            <span>Language / 语言</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-xs">
              {language === 'zh' ? '中文 → EN' : 'EN → 中文'}
            </span>
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
}
