import { node } from 'prop-types';
import React from 'react';
import Ul from '.';
import List from '../../atoms/List';

export default {
  title: 'Molecules/Ul',
  component: Ul,
  argTypes: {
    children: {
      type: node,
      defaultValue: <List>list</List>,
    },
  },
};

export function Template(args) {
  return <Ul {...args} />;
}
