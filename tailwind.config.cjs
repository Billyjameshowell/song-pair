// tailwind.config.js

const { resolveProjectPath } = require('wasp/dev');
const colors = require('tailwindcss/colors');

module.exports = {
  plugins: [require('daisyui')],
  content: [
    resolveProjectPath('./src/**/*.{js,jsx,ts,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        // Change the background color for the entire screen
        backgroundColor: {
          'primary': colors.slate[800],
        },
        primary: {
          50: colors.slate[50],
          100: colors.slate[100],
          200: colors.slate[200],
          300: colors.slate[300],
          400: colors.slate[400],
          500: colors.slate[500],
          600: colors.slate[600],
          700: colors.slate[700],
          800: colors.slate[800],
          900: colors.slate[900],
        },
        'card-bg': colors.slate[800], // Custom color for the card background
      },
    },
  },
  // Note that we're not using the daisyui themes object here
}
