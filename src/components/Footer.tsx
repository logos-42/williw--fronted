import { useLanguage } from '../hooks/useLanguage';

export default function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { href: 'https://github.com/logos-42/williw', label: 'GitHub' },
    { href: '#', label: 'Twitter' },
    { href: '#', label: 'Discord' },
    { href: 'mailto:contact@williw.io', label: 'Email' },
  ];

  return (
    <footer className="py-10 px-6 bg-black border-t border-white/5 relative">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-white tracking-tight">Williw</span>
            <span className="mono text-xs text-white/20">·</span>
            <span className="mono text-xs text-white/25 tracking-widest">PSO ENGINE</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors duration-200 text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/20 text-xs mono">
            {t('footer.copyright')}
          </p>
          <p className="text-white/15 text-xs mono tracking-widest">
            BUILT WITH PSO
          </p>
        </div>
      </div>
    </footer>
  );
}
