module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  media: false,
  theme: {
    extend: {
      colors: {
        'primary-color': '#181b3a',
        'secondary-color': '#01d293',
        'heading-color': '#ffffff',
        "bodyBg-color": '#0b0c28',
        card01Bg: 'linear-gradient(#ef621c, #e1424e)',
        card02Bg: 'linear-gradient(#01d293, #56c57a)',
        card03Bg: '#725cff',
        card04Bg: '#2884ff',
       'small-text-color': '#808191',
        recommendCar01Bg: '#e1dfa4',
        recommendCar02Bg: '#e3ecf1',
        recommendCar03Bg: '#f4e3e5',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        arabic: ['IBM Plex Sans Arabic', 'sans-serif'],
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [
    require('tailwindcss-rtl')
  ],
};
