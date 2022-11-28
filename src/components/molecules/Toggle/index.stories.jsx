import { node, string } from 'prop-types';
import React from 'react';
import Toggle from '.';
import Ul from '../Ul';
import List from '../../atoms/List';

export default {
  title: 'Molecules/Toggle',
  component: Toggle,
  argTypes: {
    summary: {
      type: string,
      defaultValue: 'category',
    },
    children: {
      type: node,
      defaultValue: (
        <Ul>
          <List>list</List>
        </Ul>
      ),
    },
  },
};

export function Template(args) {
  return <Toggle {...args} />;
}
