/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      backgroundColor: {
        background: '#121214',
        shape: '#1F2729',
        'primary-yellow': '#EBA417',
      },
      textColor: {
        'primary-blue': '#61DCFB',
        'black': '#121214',
      },
      borderRadius: {
        header: '3px 3px 0 0',
      }
    },
  },
  plugins: [],
}
