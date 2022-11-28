import { ThemeProvider } from 'styled-components';
import base, { lightTheme } from '../src/components/theme/default';
import GlobalStyle from '../src/components/theme/GlobalStyle';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { RecoilRoot } from 'recoil';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const theme = { ...base, colors: lightTheme };

export const decorators = [
  Story => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RecoilRoot>
        <MemoryRouter>
          <Routes>
            <Route path="/*" element={<Story />} />
          </Routes>
        </MemoryRouter>
      </RecoilRoot>
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'responsive',
  },
};
