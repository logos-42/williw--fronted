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
      transition: { staggerChildren: 0.25 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
  };

  // Step icons
  const stepIcons = [
    // Download icon
    <svg key="download" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>,
    // Power icon
    <svg key="power" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    // Rewards icon
    <svg key="rewards" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
  ];

  const stepGradients = [
    'from-cyan-400 to-blue-500',
    'from-purple-400 to-pink-500',
    'from-amber-400 to-orange-500',
  ];

  return (
    <section id="how-it-works" className="py-40 px-8 relative overflow-hidden flex justify-center bg-black">
      {/* Enhanced grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      
      {/* Background glows */}
      <div className="absolute top-1/3 -left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-1/4 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
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
            — How it works —
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight tracking-tight mb-8">
            <span className="gradient-text">{t('howItWorks.title')}</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative"
        >
          {/* Animated connecting line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[16.666%] right-[16.666%] h-px overflow-hidden">
            <div
              className="w-full h-full relative"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 4px, transparent 4px, transparent 12px)',
              }}
            >
              {/* Animated glow traveling along the line */}
              <motion.div
                initial={{ x: '-100%' }}
                whileInView={{ x: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent blur-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step number with enhanced styling */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative mb-8 z-10"
                >
                  {/* Outer glow ring */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${stepGradients[index]} blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300`} />
                  
                  {/* Main circle */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${stepGradients[index]} p-[2px] shadow-lg`}
                  >
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <span className={`text-lg font-bold bg-gradient-to-br ${stepGradients[index]} bg-clip-text text-transparent`}>
                        {step.number}
                      </span>
                    </div>
                  </motion.div>
                  
                  {/* Pulsing ring */}
                  <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                </motion.div>

                {/* Icon display */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className={`mb-4 w-12 h-12 rounded-xl bg-gradient-to-br ${stepGradients[index]} p-[1.5px] opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  <div className="w-full h-full rounded-xl bg-black/90 flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                    {stepIcons[index]}
                  </div>
                </motion.div>

                {/* Card */}
                <div className="card-gradient-border p-8 rounded-2xl w-full shimmer group-hover:scale-[1.02] transition-transform duration-300">
                  <h3 className="text-xl font-semibold mb-3 text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Bottom accent */}
                  <div className="mt-6 flex items-center justify-center gap-1">
                    <div className={`w-8 h-px bg-gradient-to-r ${stepGradients[index]}`} />
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${stepGradients[index]}`} />
                    <div className={`w-8 h-px bg-gradient-to-l ${stepGradients[index]}`} />
                  </div>
                </div>

                {/* Connection dot for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden w-px h-8 my-4 bg-gradient-to-b from-white/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-strong border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="mono text-xs text-white/40 tracking-widest">READY TO GET STARTED?</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
