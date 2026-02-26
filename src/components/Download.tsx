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
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 24 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.4, 0.25, 1] as const 
      } 
    },
  };

  return (
    <section id="download" className="py-32 px-8 relative flex justify-center bg-black overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/[0.015] to-transparent rounded-full" />
      </div>
      
      <div className="absolute grid-bg inset-0 opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }}
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
          {platformItems.map((platform) => {
            const pInfo = platforms[platform.nameKey as keyof Platforms];
            return (
              <motion.div
                key={platform.id}
                variants={itemVariants}
                whileHover={{ y: platform.available ? -6 : 0, transition: { duration: 0.25 } }}
                className="relative card-border p-8 rounded-2xl group"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 group-hover:ring-white/10 transition-all duration-500" />
                
                {/* Header row */}
                <div className="flex items-center gap-4 mb-6 relative">
                  {/* Platform icon with glow */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-60 transition-all duration-500" />
                    <div className="relative text-white/60 group-hover:text-white transition-colors duration-300">
                      {platform.id === 'macos'
                        ? <MacIcon className="w-10 h-10" />
                        : <WindowsIcon className="w-10 h-10" />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white tracking-tight">
                        {pInfo.name}
                      </h3>
                      {platform.badge && (
                        <span className="mono text-[10px] px-1.5 py-0.5 rounded border border-white/15 text-white/40 tracking-widest">
                          {platform.badge}
                        </span>
                      )}
                    </div>
                    <span className="mono text-xs text-white/30 tracking-wide">
                      {pInfo.version}
                    </span>
                  </div>
                </div>

                {/* Release notes (macOS only) */}
                {platform.releaseNotes.length > 0 && (
                  <ul className="mb-6 space-y-1.5 relative">
                    {platform.releaseNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/35 text-xs mono">
                        <span className="text-white/20 mt-0.5 shrink-0">·</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Status */}
                <div className="flex items-center gap-2 mb-6 relative">
                  <span className={`w-1.5 h-1.5 rounded-full ${platform.available ? 'bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'bg-white/20'}`} />
                  <span className="mono text-xs text-white/40 tracking-widest uppercase">
                    {platform.available ? 'Available' : 'Coming Soon'}
                  </span>
                </div>

                {/* Download button */}
                {platform.available && platform.downloadUrl ? (
                  <a
                    href={platform.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-full py-3.5 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 text-center block overflow-hidden group/btn"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <span className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover/btn:animate-shine" />
                    <span className="relative flex items-center justify-center gap-2">
                      <span>{t('download.download')} {pInfo.name}</span>
                      <svg className="w-4 h-4 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-3.5 rounded-lg font-semibold text-sm tracking-wide bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
                  >
                    {t('download.comingSoon')}
                  </button>
                )}

                {/* SHA256 for primary download */}
                {platform.sha256 && (
                  <div className="mt-4 p-3 rounded-lg bg-white/[0.02] border border-white/8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-transparent to-white/[0.02]" />
                    <p className="mono text-[10px] text-white/35 leading-relaxed break-all relative">
                      <span className="text-white/25">sha256:</span> {platform.sha256}
                    </p>
                  </div>
                )}

                {/* Extra download (e.g. Windows MSI) */}
                {'extraDownload' in platform && platform.extraDownload && (
                  <div className="mt-3 relative">
                    <a
                      href={platform.extraDownload.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-2.5 rounded-lg text-sm text-center text-white/50 hover:text-white border border-white/8 hover:border-white/20 transition-all duration-200 mono tracking-wide"
                    >
                      {platform.extraDownload.label}
                    </a>
                    <div className="mt-2 p-3 rounded-lg bg-white/[0.02] border border-white/8">
                      <p className="mono text-[10px] text-white/35 leading-relaxed break-all">
                        <span className="text-white/25">sha256:</span> {platform.extraDownload.sha256}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Release link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center relative"
        >
          <a
            href={`https://github.com/logos-42/williw/releases/tag/${RELEASE_VERSION}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-xs text-white/25 hover:text-white/60 transition-colors duration-200 tracking-widest inline-flex items-center gap-2 group"
          >
            <span>View all releases on GitHub</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
