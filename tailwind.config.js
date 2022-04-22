module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"Open Sans"', 'sans-serif'],
      body: ['"Open Sans"', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          light: '#454855',
          DEFAULT: '#454855',
          dark: '#090a0e',
        },
        'primary-text': '#fdf9f7',
        'secondary-text': '#a7b9be',
        divider: '#bdbdbd',
        background: '#f5f7fa',
        accent: {
          light: '#3f556a',
          DEFAULT: '#2c3b4a',
        },
        'input-border': {
          DEFAULT: '#edf0f2',
        },
        'admin-accent': '#303956',
      },
      inset: {
        '120%': '120%',
        '45%': '45%',
      },
      height: {
        '40vh': '40vh',
        '65vh': '65vh',
        '70vh': '70vh',
      },
      backgroundImage: {
        'hero-background':
          'linear-gradient(to right bottom, rgba(69, 72, 85, 0.8), rgba(9, 10, 14, 0.8)), url("@/assets/images/hero.jpeg")',
      },
      flexGrow: {
        1: 1,
        2: 2,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
