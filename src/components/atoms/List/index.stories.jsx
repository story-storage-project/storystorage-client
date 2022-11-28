import { string } from 'prop-types';
import React from 'react';
import List from '.';

export default {
  title: 'Atom/List',
  component: List,
  argTypes: {
    children: {
      type: string,
      defaultValue: 'list',
    },
  },
};

export function Template(args) {
  return <List {...args} />;
}
