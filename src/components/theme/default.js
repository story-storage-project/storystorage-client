// https://github.com/diegohaz/arc/wiki/Styling

const base = {};

export const lightTheme = {
  textColor: 'black',
  lightGray: '#0000000F',
  darkGray: '#37352F66',
  pointColor: '#2383E2',
  greenColor: '#2bbc63',
  whiteColor: '#ffffff',
  body: '#FBFBFB',
  leftMenu: '#f2f2f2',
  rightMenu: '#19171113',
  transparent: 'transparent',
  filter: `invert(36%) sepia(100%) saturate(1092%) hue-rotate(189deg)
  brightness(95%) contrast(85%)`,

  codeTheme: {
    backgrounColor: '#f7f6f3',
    tagColor: '#DD4A68',
    tagUnderLineColor: '#ff7878',
    punctuation: '#999',
    attributeName: '#690',
    attributeValue: '#07a',
    cssTag: '#690',
    cssAttributeName: '#07a',
    cssAttributeValue: '#e90',
  },
};

export const darkTheme = {
  textColor: '#FFFFFF',
  lightGray: '#bfbfbf',
  darkGray: '#37352F66',
  pointColor: '#ECB365',
  greenColor: '#2bbc63',
  whiteColor: '#ffffff',
  body: '#404258',
  leftMenu: '#474E68',
  rightMenu: '#50577A',
  transparent: 'transparent',
  filter: `invert(94%) sepia(96%) saturate(6610%) hue-rotate(309deg) brightness(97%) contrast(90%)`,

  codeTheme: {
    backgrounColor: '#282c34',
    tagColor: '#61b9d4',
    tagUnderLineColor: '#b45c66',
    punctuation: '#999',
    attributeName: '#e4be7a',
    attributeValue: '#de4756',
    cssTag: '#46bf68',
    cssAttributeName: '#46bf68',
    cssAttributeValue: '#46bf68',
  },
};

base.viewSize = {
  mobileS: `(max-width: 480px)`,
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
