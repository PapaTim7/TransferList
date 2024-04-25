/** @type {import('tailwindcss/types').Config} */
const config = {
  corePlugins: {
    preflight: false
  },
  content: ['index.html', 'src/**/*.tsx'],
  important: '#root',
  theme: {
    extend: {
      boxShadow: {
        lg: '0px 8px 12px rgba(26, 7, 62, 0.07)'
      }
    }
  }
}
module.exports = config
