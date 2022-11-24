import { atom } from 'recoil';
import templates from '../data/templates/templates';

const template = {};
template['template-button'] = templates;

const userData = atom({
  key: 'userData',
  default: {},
});

const isLogin = atom({
  key: 'isLogin',
  default: false,
});

const userStoryList = atom({
  key: 'userStories',
  default: template,
});

export { userData, isLogin, userStoryList };
