import React from 'react';
import { bool } from 'prop-types';
import { useSetRecoilState } from 'recoil';
import CodeEditor from '.';
import { page } from '../../../store/codeState';

export default {
  title: 'Organisms/CodeEditor',
  component: CodeEditor,
  argTyps: {
    isLogin: { type: bool, defaultValue: false },
  },
};

export function storyMakerPage(args) {
  const setCurrentPage = useSetRecoilState(page);
  setCurrentPage('story-maker');

  return <CodeEditor {...args} />;
}

export function storyPage(args) {
  const setCurrentPage = useSetRecoilState(page);
  setCurrentPage('story');

  return <CodeEditor {...args} />;
}
