import React from 'react';
import Button from '.';

const options = [
  'whiteColor',
  'pointColor',
  'lightGray',
  'darkGray',
  'textColor',
  'transparent',
];

export default {
  title: 'Atom/Button',
  component: Button,
  argTypes: {
    children: {
      type: 'string',
      defaultValue: 'Button',
    },
    bg: {
      options,
      control: {
        type: 'select',
      },
      defaultValue: 'transparent',
    },
    textColor: {
      options,
      control: {
        type: 'select',
      },
    },
    borderRadius: {
      type: 'string',
      defaultValue: '20rem',
    },
    border: {
      options,
      control: {
        type: 'select',
      },
    },
  },
};

function Template(args) {
  return <Button {...args} />;
}

export const SignIn = Template.bind({});
SignIn.args = {
  textColor: 'textColor',
  border: 'lightGray',
};

export const AddStory = Template.bind({});
AddStory.args = {
  textColor: 'whiteColor',
  bg: 'pointColor',
};

export const Code = Template.bind({});
Code.args = {
  textColor: 'textColor',
  bg: 'lightGray',
  borderRadius: '3px',
  width: '2.5rem',
  padding: '0.5rem 1.5rem',
  border: 'darkGray',
};
