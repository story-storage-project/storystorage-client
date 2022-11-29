import { atom } from 'recoil';

const isOnLoginReqModal = atom({
  key: 'isOnLoginReqModal',
  default: false,
});
const uiTheme = atom({
  key: 'theme',
  default: 'lightTheme',
});

export { isOnLoginReqModal, uiTheme };
