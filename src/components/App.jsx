import React from 'react';
import { useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import base, { lightTheme, darkTheme } from './theme/default';
import GlobalStyle from './theme/GlobalStyle';

import Layout from './templates/Layout';
import Login from './pages/Login';
import StoryMaker from './pages/StoryMaker';
import StoryPage from './pages/StoryPage';
import NotFound from './pages/NotFound';
import StoryAllPage from './pages/StoryAllPage';
import { uiTheme } from '../store/globalState';

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
  const themeColor = useRecoilValue(uiTheme);
  const theme = {
    ...base,
    colors: themeColor === 'lightTheme' ? lightTheme : darkTheme,
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} fallbackElement={<div>로딩주웅</div>} />
    </ThemeProvider>
  );
}

export default App;
