import React from 'react';
import { bool } from 'prop-types';
import { useSetRecoilState } from 'recoil';
import CssCodeEditor from '.';
import { page } from '../../../store/codeState';

export default {
  title: 'Organisms/CssCodeEditor',
  component: CssCodeEditor,
  argTyps: {
    isLogin: { type: bool, defaultValue: true },
  },
};

export function storyMakerPage(args) {
  const setCurrentPage = useSetRecoilState(page);
  setCurrentPage('story-maker');

  return <CssCodeEditor {...args} />;
}

export function storyPage(args) {
  const setCurrentPage = useSetRecoilState(page);
  setCurrentPage('story');

  return <CssCodeEditor {...args} />;
}
