const colors = require('./src/ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        pthin: ['Poppins-Thin', 'sans-serif'],
        pextralight: ['Poppins-ExtraLight', 'sans-serif'],
        plight: ['Poppins-Light', 'sans-serif'],
        pregular: ['Poppins-Regular', 'sans-serif'],
        pmedium: ['Poppins-Medium', 'sans-serif'],
        psemibold: ['Poppins-SemiBold', 'sans-serif'],
        pbold: ['Poppins-Bold', 'sans-serif'],
        pextrabold: ['Poppins-ExtraBold', 'sans-serif'],
        nblack: ['NeueHaasDisplayBlack', 'sans-serif'],
        nblacki: ['NeueHaasDisplayBlackItalic', 'sans-serif'],
        nhdbold: ['NeueHaasDisplayBold', 'sans-serif'],
        nhdboldi: ['NeueHaasDisplayBoldItalic', 'sans-serif'],
        nhdlight: ['NeueHaasDisplayLight', 'sans-serif'],
        nhdlighti: ['NeueHaasDisplayLightItalic', 'sans-serif'],
        nhdmedium: ['NeueHaasDisplayMedium', 'sans-serif'],
        nhdmediumi: ['NeueHaasDisplayMediumItalic', 'sans-serif'],
        nhdroman: ['NeueHaasDisplayRoman', 'sans-serif'],
        nhdromani: ['NeueHaasDisplayRomanItalic', 'sans-serif'],
        nhdthin: ['NeueHaasDisplayThin', 'sans-serif'],
        nhdthini: ['NeueHaasDisplayThinItalic', 'sans-serif'],
        nhdxthin: ['NeueHaasDisplayXThin', 'sans-serif'],
        nhdxthini: ['NeueHaasDisplayXThinItalic', 'sans-serif'],
        nhdxxthin: ['NeueHaasDisplayXXThin', 'sans-serif'],
        nhdxxthini: ['NeueHaasDisplayXXThinItalic', 'sans-serif'],
      },
      colors,
    },
  },
  plugins: [],
};
