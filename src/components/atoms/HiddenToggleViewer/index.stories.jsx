import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { node } from 'prop-types';
import React from 'react';
import HiddenToggleViewer from '.';
import ImageIcon from '../ImageIcon';

export default {
  title: 'Atom/HiddenToggleViewer',
  component: HiddenToggleViewer,
  argTypes: {
    children: {
      type: node,
    },
    hiddenView: {
      type: 'string',
      defaultValue: 'tablet',
    },
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  },
  subcomponents: { ImageIcon },
};

function Template(args) {
  return (
    <HiddenToggleViewer {...args}>
      <ImageIcon icon="menu" alt="menu-icon" pointers />
    </HiddenToggleViewer>
  );
}
export const LabtopViewPort = Template.bind({});
LabtopViewPort.parameters = {
  viewport: {
    defaultViewport: 'tablet',
  },
};

export const TabletViewPort = Template.bind({});
TabletViewPort.parameters = {
  viewport: {
    defaultViewport: 'pixelxl',
  },
};
