import React from 'react';
import NotFound from '.';

export default {
  title: 'Page/NotFound',
  component: NotFound,
};

function Template(args) {
  return <NotFound {...args} />;
}

export const Primary = Template.bind({});
