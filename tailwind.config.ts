import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-twilight': '#03045e',
        'french-blue': '#023e8a',
        'bright-teal': '#0077b6',
        'blue-green': '#0096c7',
        'turquoise': '#00b4d8',
        'sky-aqua': '#48cae4',
        'frosted-blue': '#90e0ef',
        'frosted-light': '#ade8f4',
        'light-cyan': '#caf0f8',
        primary: '#0077b6',
        secondary: '#48cae4',
      },
    },
  },
  plugins: [],
}
export default config
