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
        slideIn: 'slideIn 0.6s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      fontFamily: {
        'sans': ['Ubuntu', 'sans-serif'],
        'serif': ['Fjord One', 'serif'],
        'display': ['Audiowide', 'Fjord One', 'serif']
      }
    }
  }
}
