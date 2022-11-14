// https://github.com/diegohaz/arc/wiki/Styling

const base = {};

export const lightTheme = {
  textColor: 'black',
  lightGray: '#0000000F',
  darkGray: '#37352F66',
  pointColor: '#2383E2',
  body: '#FBFBFB',
  leftMenu: '#f2f2f2',
  rightMenu: '#19171113',
};

export const darkTheme = {
  textColor: '#FFFFFF',
  lightGray: '#0000000F',
  darkGray: '#37352F66',
  pointColor: '#2383E2',
  body: '#474E68',
  leftMenu: '#404258',
  rightMenu: '#50577A',
};

base.viewSize = {
  mobile: `(max-width: 480px)`,
  tablet: `(max-width: 900px)`,
  desktop: `(max-width: 1024px)`,
};

base.fontSize = {
  small: '0.8rem',
  default: '0.9rem',
  large: '1.2rem',
  xLarge: '1.8rem',
};

export default base;
