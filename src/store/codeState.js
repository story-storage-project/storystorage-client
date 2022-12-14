import { atom } from 'recoil';

const html = atom({
  key: 'html',
  default: '',
});

const css = atom({
  key: 'css',
  default: '',
});

const codeViewMode = atom({
  key: 'codeViewMode',
  default: '',
});

const page = atom({
  key: 'page',
  default: '',
});

const selectCodeType = atom({
  key: 'selectCodeType',
  default: 'HTML',
});

const isClickedSaveButton = atom({
  key: 'isClickedSaveButton',
  default: false,
});

export { html, css, codeViewMode, page, selectCodeType, isClickedSaveButton };
