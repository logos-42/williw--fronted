/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': '#0a0a0f',
        'deep-space-light': '#111116',
        'neon-blue': '#00d4ff',
        'neon-purple': '#8b5cf6',
        'accent-white': '#ffffff',
        'accent-gray': '#888888',
        'accent-dark': '#444444',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-white': 'pulse-white 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'blur-in': 'blur-in 0.5s ease-out forwards',
        'border-glow': 'border-glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-8px) rotate(1deg)' },
          '50%': { transform: 'translateY(-4px) rotate(0deg)' },
          '75%': { transform: 'translateY(-12px) rotate(-1deg)' },
        },
        'pulse-white': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(255,255,255,0.2)' },
          '50%': { boxShadow: '0 0 24px rgba(255,255,255,0.5)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.05)',
            opacity: '1'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(255,255,255,0.25), 0 0 60px rgba(255,255,255,0.1)',
            opacity: '0.95'
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'blur-in': {
          from: { opacity: '0', filter: 'blur(10px)' },
          to: { opacity: '1', filter: 'blur(0)' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(255,255,255,0.12)' },
          '50%': { borderColor: 'rgba(255,255,255,0.32)' },
        },
      },
      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '40px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'smooth-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        'grid-pattern-sm': 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        'grid-pattern-lg': 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-sm': '32px 32px',
        'grid': '60px 60px',
        'grid-lg': '100px 100px',
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(255, 255, 255, 0.1)',
        'glow': '0 0 20px rgba(255, 255, 255, 0.15)',
        'glow-md': '0 0 30px rgba(255, 255, 255, 0.2)',
        'glow-lg': '0 0 50px rgba(255, 255, 255, 0.25)',
        'glow-inner': '0 0 20px rgba(255, 255, 255, 0.1) inset',
        'card': '0 4px 24px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      borderWidth: {
        'subtle': '1px',
      },
      borderColor: {
        'subtle': 'rgba(255, 255, 255, 0.08)',
        'default': 'rgba(255, 255, 255, 0.12)',
        'strong': 'rgba(255, 255, 255, 0.24)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
    },
  },
  plugins: [],
}
