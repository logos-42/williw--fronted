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
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' as const },
    },
  };

  return (
    <section id="features" className="py-32 px-8 relative flex justify-center bg-black">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      {/* Top separator line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-20"
        >
          <span className="mono text-xs tracking-widest text-white/30 uppercase mb-4">
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
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-border p-8 rounded-xl group cursor-default"
            >
              {/* Index number */}
              <div className="mono text-xs text-white/20 mb-6 tracking-widest">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="text-3xl mb-5 grayscale group-hover:grayscale-0 transition-all duration-300">
                {feature.icon}
              </div>

              <h3 className="text-base font-semibold mb-3 text-white group-hover:text-white/90 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom accent line */}
              <div className="mt-6 w-0 group-hover:w-full h-px bg-white/20 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
