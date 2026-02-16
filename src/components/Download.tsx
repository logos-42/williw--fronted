import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

interface Platform {
  name: string;
  version: string;
}

interface Platforms {
  windows: Platform;
  macos: Platform;
}

export default function Download() {
  const { t } = useLanguage();
  const platforms = t('download.platforms') as Platforms;

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  const platformItems = [
    {
      id: 'windows',
      name: platforms.windows.name,
      version: platforms.windows.version,
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 5.5L10.5 4.5V11.5H3V5.5ZM3 18.5V12.5H10.5V19.5L3 18.5ZM11 5.5L21 4.5V11.5H11V5.5ZM11 18.5L21 19.5V12.5H11V18.5Z"/>
        </svg>
      ),
      available: true,
    },
    {
      id: 'macos',
      name: platforms.macos.name,
      version: platforms.macos.version,
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.13 2.04 14.13 1.5C14.13 0.67 13.13 0 12 0C10.87 0 9.87 0.67 9.87 1.5C9.87 2.04 10.27 2.67 11 3.5H13Z"/>
        </svg>
      ),
      available: true,
    },
  ];

  return (
    <section id="download" className="py-32 px-8 relative flex justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center w-full leading-relaxed">
            {t('download.title')}
          </h2>
          <p className="text-gray-400 text-lg text-center">
            {t('download.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {platformItems.map((platform) => (
            <motion.div
              key={platform.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="glass p-10 rounded-2xl group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-orange-400 group-hover:text-red-400 transition-colors">
                  {platform.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {platform.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {platform.version}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!platform.available}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  platform.available
                    ? 'btn-gradient text-white'
                    : 'bg-white/5 text-gray-500 cursor-not-allowed'
                }`}
              >
                {platform.available ? (
                  t('download.download')
                ) : (
                  t('download.comingSoon')
                )}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
