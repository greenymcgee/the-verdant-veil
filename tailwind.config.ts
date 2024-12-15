/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    backgroundImage: { stars: "url('/images/backgrounds/stars-xxl.svg')" },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '3.5rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      boxShadow: { 'input-hover': '0px 0px 0px 2px #B3BCC8' },
      colors: {
        'focus-ring': '#00A6FF',
        neutral: {
          900: '#0B0A07',
          800: '#232320',
          700: '#3C3B39',
          600: '#545451',
          500: '#6D6C6A',
          400: '#858583',
          300: '#9D9D9C',
          200: '#B6B6B5',
          100: '#CECECD',
          50: '#E7E7E6',
        },
        primary: {
          900: '#415D43',
          800: '#546D56',
          700: '#677D69',
          600: '#7A8E7B',
          500: '#8D9E8E',
          400: '#A0AEA1',
          300: '#B3BEB4',
          200: '#C6CEC7',
          100: '#D9DFD9',
          50: '#ECEFEC',
        },
        secondary: {
          900: '#6E2594',
          800: '#7D3B9F',
          700: '#8B51A9',
          600: '#9A66B4',
          500: '#A87CBF',
          400: '#B792CA',
          300: '#C5A8D4',
          200: '#D4BEDF',
          100: '#E2D3EA',
          50: '#F1E9F4',
        },
        success: {
          900: '#26C485',
          800: '#3CCA91',
          700: '#51D09D',
          600: '#67D6AA',
          500: '#7DDCB6',
          400: '#93E2C2',
          300: '#A8E7CE',
          200: '#BEEDDA',
          100: '#D4F3E7',
          50: '#E9F9F3',
        },
        danger: {
          900: '#C20114',
          800: '#C81A2C',
          700: '#CE3443',
          600: '#D44D5B',
          500: '#DA6772',
          400: '#E1808A',
          300: '#E799A1',
          200: '#EDB3B9',
          100: '#F3CCD0',
          50: '#F9E6E8',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)'],
        serif: ['var(--font-libre-baskerville)'],
      },
      fontSize: {
        'h-xxl': '3.5rem',
        'h-xl': '2.5rem',
        'h-l': '2rem',
        'h-m': '1.5rem',
        'h-s': '1.125rem',
        'h-xs': '0.875rem',
        'b-s': '0.875',
        'b-xs': '0.75',
      },
      lineHeight: { body: '150%', heading: '125%' },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config

/* eslint-enable @typescript-eslint/no-require-imports */
/* eslint-enable sort-keys */
