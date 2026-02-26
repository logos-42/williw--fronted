import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

interface StepItem {
  number: string;
  title: string;
  description: string;
}

export default function HowItWorks() {
  const { t } = useLanguage();
  const steps = t('howItWorks.steps') as StepItem[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  return (
    <section id="how-it-works" className="py-36 px-6 relative flex justify-center bg-black overflow-hidden">
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient glow orbs - matching Features section */}
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-neon-blue/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-neon-purple/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Top separator line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex flex-col items-center mb-24"
        >
          <span className="mono text-xs tracking-[0.3em] text-white/25 uppercase mb-5">
            — How it works —
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center leading-tight tracking-tight">
            {t('howItWorks.title')}
          </h2>
          <div className="mt-6 divider" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Enhanced connecting line - animated gradient line */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(16.666%+24px)] right-[calc(16.666%+24px)] h-px overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <motion.div
              className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-neon-blue/60 via-neon-purple/60 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 2,
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] } 
                }}
                className="group relative"
              >
                {/* Outer glow on hover */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                
                {/* Glass card - matching Features style */}
                <div className="relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-black/40 border border-white/[0.08] group-hover:border-white/15 transition-all duration-500 backdrop-blur-sm">
                  
                  {/* Corner accent - matching Features */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-white/10 rounded-tr-lg group-hover:border-neon-blue/30 group-hover:w-10 group-hover:h-10 transition-all duration-500" />
                  </div>

                  {/* Step number with glow effect */}
                  <div className="relative mb-6">
                    {/* Glow background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative w-14 h-14 rounded-full border border-white/15 flex items-center justify-center bg-white/[0.03] group-hover:bg-white/[0.06] group-hover:border-white/25 transition-all duration-500"
                    >
                      <span className="mono text-lg font-semibold text-white/70 group-hover:text-white transition-colors duration-300">
                        {step.number}
                      </span>
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-3 text-white/90 group-hover:text-white tracking-tight transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/55 transition-colors duration-300">
                    {step.description}
                  </p>

                  {/* Bottom accent line with animated width - matching Features */}
                  <div className="mt-8 w-8 h-px bg-white/10 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-neon-blue/40 group-hover:via-neon-purple/40 group-hover:to-transparent transition-all duration-500" />
                </div>

                {/* Subtle reflection */}
                <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
