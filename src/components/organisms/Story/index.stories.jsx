import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { object } from 'prop-types';
import Story from '.';
import templates from '../../../data/templates/templates';

export default {
  title: 'Organisms/Story',
  component: Story,
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
};

function Template(args) {
  return <Story {...args} />;
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
