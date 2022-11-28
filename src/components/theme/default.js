// https://github.com/diegohaz/arc/wiki/Styling

const base = {};

export const lightTheme = {
  textColor: 'black',
  lightGray: '#0000000F',
  darkGray: '#37352F66',
  pointColor: '#2383E2',
  whiteColor: '#ffffff',
  body: '#FBFBFB',
  leftMenu: '#f2f2f2',
  rightMenu: '#19171113',
  transparent: 'transparent',
};

export const darkTheme = {
  textColor: '#FFFFFF',
  lightGray: '#0000000F',
  darkGray: '#37352F66',
  pointColor: '#2383E2',
  whiteColor: '#ffffff',
  body: '#474E68',
  leftMenu: '#404258',
  rightMenu: '#50577A',
  transparent: 'transparent',
};

base.codeThemeBright = {
  backgrounColor: '#f7f6f3',
  tagColor: '#DD4A68',
  tagUnderLineColor: '#ff7878',
  punctuation: '#999',
  attributeName: '#690',
  attributeValue: '#07a',
  cssTag: '#690',
  cssAttributeName: '#07a',
  cssAttributeValue: '#e90',
};

base.viewSize = {
  mobile: `(max-width: 750px)`,
  tablet: `(max-width: 900px)`,
  desktop: `(max-width: 1024px)`,
  laptopHalf: `(max-width: 1200px)`,
  backgrounColor: 'red',
};

base.codeEditorSize = {
  mobile: `(max-width: 400px)`,
  tablet: `(max-width: 800px)`,
  laptop: `(max-width: 1024px)`,
  desktop: `(max-width: 1480px)`,
};

base.fontSize = {
  small: '0.8rem',
  default: '0.9rem',
  defaultLarge: '1.1rem',
  large: '1.2rem',
  xLarge: '1.8rem',
  code: '0.95rem',
};

export default base;
