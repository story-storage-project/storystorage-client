import { string } from 'prop-types';
import React from 'react';
import ImageIcon from '.';

export default {
  title: 'Atom/ImageIcon',
  component: ImageIcon,
};

function Template(args) {
  return <ImageIcon {...args} />;
}

export const Menu = Template.bind({});
Menu.args = {
  icon: 'menu',
  alt: 'menu',
  pointer: true,
};

export const GoogleLogo = Template.bind({});
GoogleLogo.args = {
  icon: 'google-login-logo',
  alt: 'google-login-logo',
  pointer: true,
  width: '20rem',
  height: 'auto',
};
