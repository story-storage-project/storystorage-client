import { bool, string } from 'prop-types';
import React from 'react';

import Text from '.';

export default {
  title: 'Atom/Text',
  component: Text,
  argTyps: {
    children: { type: string, defaultValue: 'Hello' },
    textColor: { type: string, defaultValue: 'textColor' },
    bg: { type: bool, defaultValue: false },
    size: { type: string },
  },
};

function Template(args) {
  return <Text {...args} />;
}

export const defaultText = Template.bind({});
defaultText.args = {
  children: 'Text',
};

export const lightGrayText = Template.bind({});
lightGrayText.args = {
  textColor: 'lightGray',
  children: 'Text',
};

export const darkGrayText = Template.bind({});
darkGrayText.args = {
  textColor: 'darkGray',
  children: 'Text',
};

export const pointText = Template.bind({});
pointText.args = {
  textColor: 'pointColor',
  children: 'Text',
};

export const bgColorText = Template.bind({});
bgColorText.args = {
  bg: 'lightGray',
  children: 'Text',
};

export const xLargeText = Template.bind({});
xLargeText.args = {
  children: 'Text',
  size: 'xLarge',
};
