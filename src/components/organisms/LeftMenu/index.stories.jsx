import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import LeftMenu from '.';

export default {
  title: 'Organisms/LeftMenu',
  component: LeftMenu,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  },
};

function Template(args) {
  return <LeftMenu {...args} />;
}

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
