/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
 
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        'ssm': '13px'
      },
      width: {
        '0.5': '1px',
        '80': '21rem'
      },
      height: {
        '0.5': '1px'
      },
      maxWidth: {
        '700px': '700px'
      },
      minWidth: {
        '500px': '500px'
      },
      maxHeight: {
        '800px': '800px'
      },
      minHeight: {
        '560px': '560px',
        '800px': '800px'
      },
      boxShadow: {
        '3xl': '3px 0px 11px 3px rgba(94,93,93,0.74)'
      }
    },
  },
  plugins: [],
}
