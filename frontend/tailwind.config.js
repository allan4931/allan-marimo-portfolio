/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric': '#00d4ff',
        'electric-dim': '#0099bb',
        'neon': '#00ffff',
        'glass': 'rgba(255,255,255,0.03)',
      },
      fontFamily: {
        'display': ['Syne', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'body': ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 212, 255, 0.4), 0 0 60px rgba(0, 212, 255, 0.1)',
        'neon-sm': '0 0 10px rgba(0, 212, 255, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,212,255,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(0,212,255,0.8), 0 0 80px rgba(0,212,255,0.2)' },
        },
        scan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100px' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
