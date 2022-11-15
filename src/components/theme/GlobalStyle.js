import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

html {
  height: 100%;
}

body {
  background-color: ${props => props.theme.colors.body};
  color: ${props => props.theme.colors.textColor};
  font-size: ${props => props.theme.fontSize.default};
  font-family: 'Roboto', sans-serif;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
`;

export default GlobalStyle;
