/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-once': 'test 200ms ease-in'
      },
      keyframes: {
        test:{
          '0%': {
            transform:'translateY(-25%)',
          },
          '100%': {
            transform:' translateY(0)',
          }
        }
      }
    },
  },
  plugins: [],
}

