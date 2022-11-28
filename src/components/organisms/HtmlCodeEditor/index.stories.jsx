import React from 'react';
import { bool } from 'prop-types';
import { useSetRecoilState } from 'recoil';
import HtmlCodeEditor from '.';
import { page } from '../../../store/codeState';

export default {
  title: 'Organisms/HtmlCodeEditor',
  component: HtmlCodeEditor,
  argTyps: {
    isLogin: { type: bool, defaultValue: true },
  },
};

export function storyMakerPage(args) {
  const setCurrentPage = useSetRecoilState(page);
  setCurrentPage('story-maker');

  return <HtmlCodeEditor {...args} />;
}

export function storyPage(args) {
  const setCurrentPage = useSetRecoilState(page);
  setCurrentPage('story');

  return <HtmlCodeEditor {...args} />;
}
