import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export default function Features() {
  const { t } = useLanguage();
  const features = t('features.items') as FeatureItem[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  return (
    <section id="features" className="py-36 px-6 relative flex justify-center bg-black overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Top separator line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex flex-col items-center mb-24"
        >
          <span className="mono text-xs tracking-[0.3em] text-white/25 uppercase mb-5">
            — Features —
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center leading-tight tracking-tight">
            {t('features.title')}
          </h2>
          <div className="mt-6 divider" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -6, 
                transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] } 
              }}
              className="group relative"
            >
              {/* Glass card with glow border */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-black/40 border border-white/[0.08] group-hover:border-white/15 transition-all duration-500 backdrop-blur-sm">
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-white/10 rounded-tr-lg group-hover:border-neon-blue/30 group-hover:w-10 group-hover:h-10 transition-all duration-500" />
                </div>

                {/* Index number */}
                <div className="mono text-xs text-white/15 mb-6 tracking-[0.2em] group-hover:text-white/25 transition-colors duration-500">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon container with glow */}
                <div className="relative mb-6">
                  <div className="absolute -inset-2 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative text-[28px] leading-none grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                    {feature.icon}
                  </div>
                </div>

                <h3 className="text-base font-semibold mb-3 text-white/90 group-hover:text-white tracking-tight transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/35 text-sm leading-relaxed group-hover:text-white/45 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Bottom accent line with animated width */}
                <div className="mt-8 w-8 h-px bg-white/10 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-neon-blue/40 group-hover:via-neon-purple/40 group-hover:to-transparent transition-all duration-500" />
              </div>

              {/* Subtle reflection */}
              <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
