/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0D0D0E',
        surface: '#17171A',
        surface2: '#202024',
        tabbar: '#121214',
        line: '#2B2B30',
        line2: '#3A3A40',
        ink: '#F2ECE1',
        soft: '#C9C3B8',
        muted: '#9A958B',
        dis: '#5E5A53',
        accent: '#4F46E5',
        tint: '#15142B',
        tint2: '#1E1C40',
        ok: '#5FD39A',
        okbg: '#14261D',
        warn: '#F2B84B',
        warnbg: '#2A2112',
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'Impact', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
