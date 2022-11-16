import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

html {
  width: 100%;
  height: 100%;
}

body {
  background-color: ${props => props.theme.colors.body};
  color: ${props => props.theme.colors.textColor};
  font-size: ${props => props.theme.fontSize.default};
  font-family: 'Mukta', sans-serif;
  overflow-x: hidden;
  font-weight: 300;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
`;

export default GlobalStyle;
