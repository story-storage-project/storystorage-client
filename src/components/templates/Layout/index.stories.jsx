import React from 'react';
import { node } from 'prop-types';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import Layout from '.';
import Login from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import Story from '../../pages/Story';
import StoryMaker from '../../pages/StoryMaker';

export default {
  title: 'Template/Layout',
  component: Layout,
  argTyps: {
    children: { type: node },
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  },
  subcomponents: { Login, NotFound, Story, StoryMaker },
};

function StoryPage(args) {
  return (
    <Layout {...args}>
      <Story />
    </Layout>
  );
}

export const IphonexStoryPage = StoryPage.bind({});
IphonexStoryPage.parameters = {
  viewport: {
    defaultViewport: 'iphonex',
  },
};

export const TabletStoryPage = StoryPage.bind({});
TabletStoryPage.parameters = {
  viewport: {
    defaultViewport: 'pixelxl',
  },
};

export const LabtopStoryPage = StoryPage.bind({});
LabtopStoryPage.parameters = {
  viewport: {
    defaultViewport: 'tablet',
  },
};

function StoryMakerPage(args) {
  return (
    <Layout {...args}>
      <StoryMaker />
    </Layout>
  );
}

export const IphonexStoryMakerPage = StoryMakerPage.bind({});
IphonexStoryMakerPage.parameters = {
  viewport: {
    defaultViewport: 'iphonex',
  },
};

export const TabletStoryMakerPage = StoryMakerPage.bind({});
TabletStoryMakerPage.parameters = {
  viewport: {
    defaultViewport: 'pixelxl',
  },
};

export const LabtopStoryMakerPage = StoryMakerPage.bind({});
LabtopStoryMakerPage.parameters = {
  viewport: {
    defaultViewport: 'tablet',
  },
};

function NotFoundPage(args) {
  return (
    <Layout {...args}>
      <NotFound />
    </Layout>
  );
}

export const IphonexNotFoundPage = NotFoundPage.bind({});
IphonexNotFoundPage.parameters = {
  viewport: {
    defaultViewport: 'iphonex',
  },
};

export const TabletNotFoundPage = NotFoundPage.bind({});
TabletNotFoundPage.parameters = {
  viewport: {
    defaultViewport: 'pixelxl',
  },
};

export const LabtopNotFoundPage = NotFoundPage.bind({});
LabtopNotFoundPage.parameters = {
  viewport: {
    defaultViewport: 'tablet',
  },
};

function LoginPage(args) {
  return (
    <Layout {...args}>
      <Login />
    </Layout>
  );
}

export const IphonexLoginPage = LoginPage.bind({});
IphonexLoginPage.parameters = {
  viewport: {
    defaultViewport: 'iphonex',
  },
};

export const TabletLoginPage = LoginPage.bind({});
TabletLoginPage.parameters = {
  viewport: {
    defaultViewport: 'pixelxl',
  },
};

export const LabtopLoginPage = LoginPage.bind({});
LabtopLoginPage.parameters = {
  viewport: {
    defaultViewport: 'tablet',
  },
};
