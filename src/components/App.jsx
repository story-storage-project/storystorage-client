import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import base, { lightTheme } from './theme/default';
import GlobalStyle from './theme/GlobalStyle';

import Layout from './templates/Layout';
import Login from './pages/Login';
import StoryMaker from './pages/StoryMaker';
import Story from './pages/Story';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Story />} />
      <Route path="/login" element={<Login />} />
      <Route path="/story-maker" element={<StoryMaker />} />
      <Route path="/story/:categoryName" element={<Story />} />
    </>,
  ),
);

function App() {
  const theme = { ...base, colors: lightTheme };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
