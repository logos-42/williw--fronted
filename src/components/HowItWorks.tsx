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
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <section id="how-it-works" className="py-32 px-8 relative overflow-hidden flex justify-center bg-black">
      {/* Denser grid for this section */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-20"
        >
          <span className="mono text-xs tracking-widest text-white/30 uppercase mb-4">
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
          viewport={{ once: true, margin: '-80px' }}
          className="relative"
        >
          {/* Connecting dashed line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[16.666%] right-[16.666%] h-px">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 8px, transparent 8px, transparent 20px)',
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number */}
                <div className="relative mb-8 z-10">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-black"
                  >
                    <span className="mono text-xl font-bold text-white/80">{step.number}</span>
                  </motion.div>
                  {/* Glow ring on hover */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Card */}
                <div className="card-border p-8 rounded-xl w-full">
                  <h3 className="text-lg font-semibold mb-3 text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
