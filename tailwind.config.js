export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const media = false;
export const theme = {
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
    keyframes: {
      'fade-in-up': {
        '0%': { opacity: 0, transform: 'translateY(20px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
      'slide-up': {
        '0%': { opacity: 0, transform: 'translateY(30px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
      'slide-in-left': {
          '0%': { opacity: 0, transform: 'translateX(-100%) scale(0.5) rotate(-30deg)' },
          '100%': { opacity: 1, transform: 'translateX(0) scale(1) rotate(7deg)' },
        },
        'slide-in-right': {
          '0%': { opacity: 0, transform: 'translateX(100%) scale(0.5) rotate(30deg)' },
          '100%': { opacity: 1, transform: 'translateX(0) scale(1) rotate(-10deg)' },
        },
        'slide-in-up': {
          '0%': { opacity: 0, transform: 'translateY(100%)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
    },
    animation: {
      'fade-in-up': 'fade-in-up 1s ease-out forwards',
      'slide-up': 'slide-up 1s ease-out 0.3s forwards',
      'slide-in-left': 'slide-in-left 1.2s ease-out forwards',
      'slide-in-right': 'slide-in-right 1.2s ease-out forwards',
      'slide-in-up': 'slide-in-up 1.5s ease-out forwards',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
};
export const plugins = [
 
];
