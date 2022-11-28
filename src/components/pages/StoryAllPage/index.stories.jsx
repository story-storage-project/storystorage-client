import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StoryAllPage from '.';
import Layout from '../../templates/Layout';

export default {
  title: 'Pages/StoryAllPage',
  component: StoryAllPage,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  },
  decorators: [
    Story => (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/*" element={<Story />} />
        </Route>
      </Routes>
    ),
  ],
};

function Template(args) {
  return <StoryAllPage {...args} />;
}

export const IphonexStoryPage = Template.bind({});
IphonexStoryPage.parameters = {
  viewport: {
    defaultViewport: 'iphonex',
  },
};

export const TabletStoryPage = Template.bind({});
TabletStoryPage.parameters = {
  viewport: {
    defaultViewport: 'pixelxl',
  },
};

export const LabtopStoryPage = Template.bind({});
LabtopStoryPage.parameters = {
  viewport: {
    defaultViewport: 'tablet',
  },
};
