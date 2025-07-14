/** @type {import('tailwindcss').Config} */
import ValkoUI from '@valko-ui/components/tailwind.preset'
export default {
  presets: [ValkoUI],
  content: [
    './components/**/*.{html,js,ts,vue}',
    './pages/**/*.{html,js,ts,vue}',
    './templates/**/*.{html,js,ts,vue}',
    './composables/**/*.{html,js,ts,vue}',
    './app.vue',
    './node_modules/@valko-ui/components/**/*.{html,js,ts,vue,css}'
  ],
  theme: {
    extend: {
      animation: {
        slideInRight: 'slideInRight 0.6s ease-out forwards',
        slideOutRight: 'slideOutRight 0.6s ease-out forwards',
        slideInLeft: 'slideInLeft 0.6s ease-out forwards',
        slideOutLeft: 'slideOutLeft 0.6s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        blink: 'blink 1.5s step-end infinite',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--tw-rotate))' },
          '50%': { transform: 'translateY(-10px) rotate(var(--tw-rotate))' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
      },
      fontFamily: {
        'sans': ['Ubuntu', 'sans-serif'],
        'serif': ['Fjord One', 'serif'],
        'display': ['Audiowide', 'Fjord One', 'serif']
      }
    }
  }
}
