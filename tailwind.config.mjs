/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fujiwara A', 'Georgia', 'serif'],
        ui: ['Instrument Sans', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          accent: '#D0FF0B',
          warm: '#FF9566',
          morado: '#633BF2',
          verde: '#72DDAA',
          negro: '#13131E',
        },
      },
      typography: {
        relvo: {
          css: {
            '--tw-prose-body': '#626262',
            '--tw-prose-headings': '#13131E',
            '--tw-prose-links': '#13131E',
            '--tw-prose-bold': '#13131E',
            '--tw-prose-code': '#13131E',
            '--tw-prose-quotes': '#626262',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [],
}
