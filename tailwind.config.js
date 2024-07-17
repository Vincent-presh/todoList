module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './Root.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    //9D00AF
    extend: {
      colors: {
        alert: '#d0342c',
        accent: '#232444',
        transparent: 'transparent',
        background: '#101134',
        backgroundDark: '#101134',
        white: '#ffffff',
        stroke: '#1C1D3E',
        primary: '#3C42D1',
        primarylight: '#FFFDFF',
        secondary: '#F2833F',
        light: '#FBFBFB',
        dark: '#ffffff',
        success: '#25B076',
        lightSuccess: '#0E9C4C08',
      },
    },
  },
  plugins: [],
};
