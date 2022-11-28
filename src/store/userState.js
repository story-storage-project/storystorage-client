import { atom, selector, selectorFamily } from 'recoil';
import templates from '../data/templates/templates';

const userData = atom({
  key: 'userData',
  default: {},
});

const isLogin = atom({
  key: 'isLogin',
  default: false,
});

const isFinishPatch = atom({
  key: 'isFinishPatch',
  default: false,
});

const storyList = atom({
  key: 'userStories',
  default: templates,
});

const userStoryList = selector({
  key: 'userStoryList',
  get: ({ get }) => get(storyList),
  set: ({ set, reset }, newValue) => {
    if (newValue === 'reset') {
      return reset(storyList);
    }

    const queryStories = newValue.reduce((category, element) => {
      if (category[element.category]) {
        category[element.category].push(element);
        return category;
      }
      // eslint-disable-next-line no-param-reassign
      category[element.category] = [];
      category[element.category].push(element);
      return category;
    }, {});

    set(storyList, queryStories);
  },
});

const addUserStoryList = selector({
  key: 'addUserStoryList',
  get: ({ get }) => get(storyList),
  set: ({ set }, arg) => {
    const [category, data] = arg;
    set(storyList, prev => ({
      ...prev,
      [category]: prev[category] ? [...prev[category], data] : [data],
    }));
  },
});

const selectStory = selectorFamily({
  key: 'selectStory',
  get:
    ({ categoryName, storyId }) =>
    ({ get }) => {
      if (!get(isFinishPatch)) return;

      const userStory = get(addUserStoryList);

      if (!Object.keys(userStory).length || !userStory[categoryName]) return;

      const test = userStory[categoryName].find(story => {
        const { _id: id } = story;
        return id === storyId;
      });

      return test;
    },
});

const editUserStoryList = selector({
  key: 'editUserStoryList',
  get: ({ get }) => get(storyList),
  set: ({ get, set }, arg) => {
    const list = get(userStoryList);
    const [category, id, data] = arg;

    const updateData = list[category].map(item => {
      const { _id: storyId } = item;
      if (storyId === id) {
        return data;
      }
      return item;
    });

    set(storyList, prev => ({
      ...prev,
      [category]: updateData,
    }));
  },
});

const deleteUserStoryList = selector({
  key: 'deleteUserStoryList',
  get: ({ get }) => get(storyList),
  set: ({ get, set }, arg) => {
    const list = get(userStoryList);
    const [category, id] = arg;

    const updateData = list[category].filter(item => {
      const { _id: storyId } = item;

      return storyId !== id;
    });

    set(storyList, prev => ({
      ...prev,
      [category]: updateData,
    }));
  },
});

export {
  isFinishPatch,
  userData,
  isLogin,
  storyList,
  userStoryList,
  selectStory,
  addUserStoryList,
  editUserStoryList,
  deleteUserStoryList,
};
