import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { object } from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import Login from '.';
import templates from '../../../data/templates/templates';
import Layout from '../../templates/Layout';

export default {
  title: 'Pages/Login',
  component: Login,
  argTypes: {
    responseData: {
      type: object,
      defaultValue: templates['template-button'][0],
    },
    isLogin: { defaultValue: true },
  },
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
  return <Login {...args} />;
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
