import { string } from 'prop-types';
import React from 'react';
import Input from '.';

export default {
  title: 'Atom/Input',
  component: Input,
  argTypes: {
    placeholder: {
      type: string,
      defaultValue: 'Please select or enter a category',
    },
    value: {
      type: string,
      defaultValue: '',
    },
  },
};

export function Template(args) {
  return <Input {...args} />;
}
