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
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="how-it-works" className="py-32 px-8 relative overflow-hidden flex justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center w-full leading-relaxed">
            {t('howItWorks.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                {/* Step Card */}
                <div className="glass p-10 rounded-2xl text-center relative z-10">
                  {/* Number Circle */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-2xl font-bold"
                  >
                    {step.number}
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
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
