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

const RELEASE_VERSION = 'v0.1.1';
const GITHUB_RELEASE_BASE = 'https://github.com/logos-42/williw/releases/download';

const platformItems = [
  {
    id: 'macos',
    nameKey: 'macos',
    icon: 'macos' as const,
    available: true,
    downloadUrl: `${GITHUB_RELEASE_BASE}/${RELEASE_VERSION}/Williw.Desktop_0.1.1_x64.dmg`,
    sha256: 'f59249ac3f641c2de3b9f23044c7326f7d17c8f1c626da22470444e6996f19e9',
    badge: 'x86_64',
    gradient: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(0, 212, 255, 0.3)',
    releaseNotes: [
      'P2P node with iroh QUIC transport',
      'Model inference · 768-dim tensor',
      'Tauri desktop application',
      'Device-adaptive scheduler',
    ],
  },
  {
    id: 'windows',
    nameKey: 'windows',
    icon: 'windows' as const,
    available: true,
    downloadUrl: `${GITHUB_RELEASE_BASE}/${RELEASE_VERSION}/Williw.Desktop_0.1.1_x64-setup.exe`,
    sha256: '33afa034a0f5647ef460448310ffde4854cdded47f260b3aaa72a03d10982f77',
    badge: 'x86_64',
    gradient: 'from-purple-500 to-pink-600',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    releaseNotes: [
      'P2P node with iroh QUIC transport',
      'Model inference · 768-dim tensor',
      'Tauri desktop application',
      'Device-adaptive scheduler',
    ],
  },
];

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 5.5L10.5 4.5V11.5H3V5.5ZM3 18.5V12.5H10.5V19.5L3 18.5ZM11 5.5L21 4.5V11.5H11V5.5ZM11 18.5L21 19.5V12.5H11V18.5Z" />
    </svg>
  );
}

function MacIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.13 2.04 14.13 1.5C14.13 0.67 13.13 0 12 0C10.87 0 9.87 0.67 9.87 1.5C9.87 2.04 10.27 2.67 11 3.5H13Z" />
    </svg>
  );
}

export default function Download() {
  const { t } = useLanguage();
  const platforms = t('download.platforms') as Platforms;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <section id="download" className="py-40 px-8 relative flex justify-center bg-black overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      
      {/* Background glows */}
      <div className="absolute top-1/2 -left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mono text-xs tracking-[0.3em] text-white/40 uppercase mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5"
          >
            — Download —
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight tracking-tight mb-4">
            <span className="gradient-text">{t('download.title')}</span>
          </h2>
          <p className="text-white/50 text-base text-center max-w-lg mb-6">
            {t('download.subtitle')}
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {platformItems.map((platform) => {
            const pInfo = platforms[platform.nameKey as keyof Platforms];
            return (
              <motion.div
                key={platform.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                {/* Card with gradient border on hover */}
                <div className="card-gradient-border p-8 rounded-2xl h-full relative overflow-hidden">
                  {/* Platform-specific glow */}
                  <div 
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-60"
                    style={{ background: `radial-gradient(circle, ${platform.glowColor} 0%, transparent 70%)` }}
                  />

                  {/* Header row */}
                  <div className="flex items-center gap-4 mb-6 relative">
                    {/* Icon with gradient border */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${platform.gradient} p-[2px] group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full rounded-xl bg-black/90 flex items-center justify-center">
                        <div className="text-white/70 group-hover:text-white transition-colors duration-300">
                          {platform.id === 'macos'
                            ? <MacIcon className="w-8 h-8" />
                            : <WindowsIcon className="w-8 h-8" />}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-white tracking-tight">
                          {pInfo.name}
                        </h3>
                        {platform.badge && (
                          <span className={`mono text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r ${platform.gradient} text-white tracking-widest`}>
                            {platform.badge}
                          </span>
                        )}
                      </div>
                      <span className="mono text-xs text-white/40 tracking-wide">
                        {pInfo.version}
                      </span>
                    </div>
                  </div>

                  {/* Release notes */}
                  {platform.releaseNotes.length > 0 && (
                    <div className="mb-6 p-4 rounded-xl bg-white/3 border border-white/5 relative">
                      <ul className="space-y-2">
                        {platform.releaseNotes.map((note, i) => (
                          <li key={i} className="flex items-start gap-2 text-white/40 text-xs mono">
                            <span className={`text-white/30 mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${platform.gradient}`} />
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Status indicator */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className={`w-2 h-2 rounded-full ${platform.available ? 'bg-emerald-400' : 'bg-white/20'} animate-pulse`} />
                    <span className="mono text-xs text-white/40 tracking-widest uppercase">
                      {platform.available ? 'Available Now' : 'Coming Soon'}
                    </span>
                  </div>

                  {/* Download button */}
                  {platform.available && platform.downloadUrl ? (
                    <a
                      href={platform.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-4 rounded-xl font-semibold text-sm tracking-wide text-center transition-all duration-300 bg-gradient-to-r ${platform.gradient} text-white hover:shadow-lg group-hover:scale-[1.02] relative overflow-hidden`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {t('download.download')} {pInfo.name}
                      </span>
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full py-4 rounded-xl font-semibold text-sm tracking-wide bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
                    >
                      {t('download.comingSoon')}
                    </button>
                  )}

                  {/* SHA256 */}
                  {platform.sha256 && (
                    <div className="mt-4 p-3 rounded-lg bg-black/30 border border-white/5">
                      <p className="mono text-[10px] text-white/30 leading-relaxed break-all">
                        <span className="text-white/50">SHA256: </span>{platform.sha256}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* GitHub release link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href={`https://github.com/logos-42/williw/releases/tag/${RELEASE_VERSION}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 mono text-xs text-white/30 hover:text-white/70 transition-colors duration-200 tracking-widest"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View all releases on GitHub
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
