import React from 'react';
import { node } from 'prop-types';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import Layout from '.';
import Story from '../../pages/Story';

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
  subcomponents: { Story },
};

function Template(args) {
  return (
    <Layout {...args}>
      <Story />
    </Layout>
  );
}

export const iphonex = Template.bind({});
iphonex.parameters = {
  viewport: {
    defaultViewport: 'iphonex',
  },
};

export const tablet = Template.bind({});
tablet.parameters = {
  viewport: {
    defaultViewport: 'pixelxl',
  },
};

export const labtop = Template.bind({});
labtop.parameters = {
  viewport: {
    defaultViewport: 'tablet',
  },
};
