import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { CookiesProvider } from 'react-cookie';
import { RecoilRoot } from 'recoil';
import base, { lightTheme } from 'components/theme/default';
import GlobalStyle from 'components/theme/GlobalStyle';

const theme = {
  ...base,
  colors: lightTheme,
};

function AllTheProviders({ children }) {
  return (
    <CookiesProvider>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </RecoilRoot>
    </CookiesProvider>
  );
}

const customRender = (ui, options) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react';

export { customRender as render };

export { AllTheProviders };

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
