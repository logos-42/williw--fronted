import { useLanguage } from '../hooks/useLanguage';

export default function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { key: 'footer.links.github', href: 'https://github.com/logos-42/williw', label: 'GitHub' },
    { key: 'footer.links.twitter', href: '#', label: 'Twitter' },
    { key: 'footer.links.discord', href: '#', label: 'Discord' },
    { key: 'footer.links.email', href: 'mailto:contact@williw.io', label: 'Email' },
  ];

  return (
    <footer className="py-12 px-6 relative bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold gradient-text">
            Williw
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
