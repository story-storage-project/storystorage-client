import React from 'react';
import Button from '.';

export default {
  title: 'Atom/Button',
  component: Button,
  argTyps: {
    children: { type: 'string' },
  },
};

function Template(args) {
  return <Button {...args} />;
}

export const Primary = Template.bind({});
Primary.args = {
  transparent: 100,
  children: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Button',
  href: 'https://naver.com',
};
