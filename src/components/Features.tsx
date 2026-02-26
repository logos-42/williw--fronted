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
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  // Icon background gradients for each feature
  const iconGradients = [
    'from-cyan-500/20 to-blue-500/20',
    'from-purple-500/20 to-pink-500/20',
    'from-amber-500/20 to-orange-500/20',
    'from-emerald-500/20 to-teal-500/20',
  ];

  const iconBorderGradients = [
    'from-cyan-400 to-blue-500',
    'from-purple-400 to-pink-500',
    'from-amber-400 to-orange-500',
    'from-emerald-400 to-teal-500',
  ];

  return (
    <section id="features" className="py-40 px-8 relative flex justify-center bg-black overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 grid-bg-fine opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      
      {/* Aurora glow in background */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 aurora-bg opacity-30 blur-3xl" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 aurora-bg opacity-30 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-24"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mono text-xs tracking-[0.3em] text-white/40 uppercase mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5"
          >
            — Features —
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight tracking-tight mb-8">
            <span className="gradient-text">{t('features.title')}</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              {/* Gradient border card */}
              <div className="card-gradient-border p-8 rounded-2xl h-full shimmer">
                {/* Icon background glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${iconGradients[index % iconGradients.length]} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Index number */}
                <div className="relative mono text-xs text-white/20 mb-6 tracking-widest flex items-center gap-2">
                  <span className="w-6 h-px bg-gradient-to-r from-white/20 to-transparent" />
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon with gradient border */}
                <div className="relative mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${iconBorderGradients[index % iconBorderGradients.length]} p-[1.5px] group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center">
                      <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                        {feature.icon}
                      </span>
                    </div>
                  </div>
                  {/* Glow ring */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${iconBorderGradients[index % iconBorderGradients.length]} blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
                </div>

                <h3 className="relative text-lg font-semibold mb-3 text-white group-hover:text-white tracking-tight transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="relative text-white/45 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Bottom accent line with animation */}
                <div className="relative mt-6 h-px bg-white/5 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${iconBorderGradients[index % iconBorderGradients.length]} w-0 group-hover:w-full transition-all duration-700 ease-out`} />
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-2 h-2 border-l border-t border-white/20 group-hover:border-white/40 transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 w-2 h-2 border-r border-b border-white/20 group-hover:border-white/40 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 flex justify-center"
        >
          <div className="flex items-center gap-2">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10 animate-pulse" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
