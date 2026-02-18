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
      transition: { staggerChildren: 0.18 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  const WindowsIcon = () => (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 5.5L10.5 4.5V11.5H3V5.5ZM3 18.5V12.5H10.5V19.5L3 18.5ZM11 5.5L21 4.5V11.5H11V5.5ZM11 18.5L21 19.5V12.5H11V18.5Z"/>
    </svg>
  );

  const MacIcon = () => (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.13 2.04 14.13 1.5C14.13 0.67 13.13 0 12 0C10.87 0 9.87 0.67 9.87 1.5C9.87 2.04 10.27 2.67 11 3.5H13Z"/>
    </svg>
  );

  const platformItems = [
    {
      id: 'windows',
      name: platforms.windows.name,
      version: platforms.windows.version,
      icon: <WindowsIcon />,
      available: true,
    },
    {
      id: 'macos',
      name: platforms.macos.name,
      version: platforms.macos.version,
      icon: <MacIcon />,
      available: true,
    },
  ];

  return (
    <section id="download" className="py-32 px-8 relative flex justify-center bg-black">
      <div className="absolute grid-bg inset-0 opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <span className="mono text-xs tracking-widest text-white/30 uppercase mb-4">
            — Download —
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center leading-tight tracking-tight mb-4">
            {t('download.title')}
          </h2>
          <p className="text-white/40 text-base text-center max-w-lg">
            {t('download.subtitle')}
          </p>
          <div className="mt-6 divider" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {platformItems.map((platform) => (
            <motion.div
              key={platform.id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-border p-8 rounded-xl group"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="text-white/60 group-hover:text-white transition-colors duration-300">
                  {platform.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white tracking-tight">
                    {platform.name}
                  </h3>
                  <span className="mono text-xs text-white/30 tracking-wide">
                    {platform.version}
                  </span>
                </div>
              </div>

              {/* Status badge */}
              {platform.available && (
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span className="mono text-xs text-white/40 tracking-widest uppercase">Available</span>
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={!platform.available}
                className={`w-full py-3.5 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 ${
                  platform.available
                    ? 'btn-gradient'
                    : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                }`}
              >
                {platform.available ? t('download.download') : t('download.comingSoon')}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
