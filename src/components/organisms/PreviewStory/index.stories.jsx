import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import PreviewStory from '.';

export default {
  title: 'Organisms/PreviewStory',
  component: PreviewStory,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  },
};

function Template(args) {
  return <PreviewStory {...args} />;
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
