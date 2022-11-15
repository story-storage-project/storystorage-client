import React from 'react';
import Input from '.';

export default {
  title: 'Atom/Input',
  component: Input,
  argTyps: {
    value: { type: 'string' },
  },
  actions: {
    handles: ['click input'],
  },
};

function Template(args) {
  return <Input {...args} />;
}

export const Primary = Template.bind({});
Primary.args = {
  value: '안녕하세용',
};
