// Check if we're in a Vercel build environment and should skip PostCSS
const skipPostCSS = process.env.SKIP_POSTCSS === 'true';

export default {
  plugins: skipPostCSS ? {} : {
    '@tailwindcss/postcss': {},
  },
}