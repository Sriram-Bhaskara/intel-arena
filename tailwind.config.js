/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        intel: {
          blue: "#0071C2",
          dark: "#0A0A0A",
          neon: "#00D4FF",
          pink: "#FF006E",
          orange: "#FF6B00",
        },
        cyber: {
          magenta: "#FF2D8F",
          cyan: "#00F0FF",
          amber: "#FFB800",
          lime: "#B6FF3C",
          void: "#0A0417",
          deep: "#160823",
          plum: "#2A0D3F",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slight': 'bounce 0.6s infinite',
        'scanlines': 'scanlines 8s linear infinite',
      },
      keyframes: {
        scanlines: {
          '0%':   { backgroundPositionY: '0%' },
          '100%': { backgroundPositionY: '100%' },
        },
      },
    },
  },
  plugins: [],
}
