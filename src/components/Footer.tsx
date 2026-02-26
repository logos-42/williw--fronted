import { useLanguage } from '../hooks/useLanguage';

export default function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { 
      href: 'https://github.com/logos-42/williw', 
      label: 'GitHub',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      )
    },
    { 
      href: '#', 
      label: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    { 
      href: '#', 
      label: 'Discord',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      )
    },
    { 
      href: 'mailto:contact@williw.io', 
      label: 'Email',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  const footerLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Documentation', href: '#' },
  ];

  return (
    <footer className="py-16 px-6 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg-fine opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      
      {/* Subtle glow */}
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-t from-neon-blue/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-t from-neon-purple/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main footer content */}
        <div className="flex flex-col items-center">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
              <span className="text-2xl font-bold text-white tracking-tight">Williw</span>
              <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-neon-blue/50 to-neon-purple/50" />
            </div>
            <span className="mono text-xs text-white/30">·</span>
            <span className="mono text-xs text-white/40 tracking-widest">PSO ENGINE</span>
          </div>

          {/* Tagline */}
          <p className="text-white/40 text-sm text-center mb-8 max-w-md">
            Unlock Computing Power, Connect Global Resources
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4 mb-10">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 rounded-lg glass border border-white/10 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 hover:scale-110"
                aria-label={link.label}
              >
                {link.icon}
                {/* Tooltip */}
                <span className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs mono text-white/60 whitespace-nowrap bg-black/80 px-2 py-1 rounded border border-white/10">
                  {link.label}
                </span>
              </a>
            ))}
          </div>

          {/* Footer links */}
          <div className="flex items-center gap-6 mb-8">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-white/30 hover:text-white/70 text-xs mono tracking-widest transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs mono">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-white/20 text-xs mono tracking-widest">
              BUILT WITH PSO
            </p>
            <span className="w-px h-3 bg-white/10" />
            <p className="text-white/15 text-xs mono tracking-widest">
              POWERED BY PARTICLES
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
