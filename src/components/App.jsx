import React from 'react';
import { RecoilRoot } from 'recoil';
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
import StoryPage from './pages/StoryPage';
import NotFound from './pages/NotFound';
import StoryAllPage from './pages/StoryAllPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<StoryAllPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/story-maker" element={<StoryMaker />} />
      <Route path="/story/:categoryName" element={<StoryAllPage />} />
      <Route path="/story/:categoryName/:storyId" element={<StoryPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

function App() {
  const theme = { ...base, colors: lightTheme };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RecoilRoot>
        <RouterProvider router={router} fallbackElement={<div>로딩주웅</div>} />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
