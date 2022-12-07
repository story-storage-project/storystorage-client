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

const isFinishLoad = atom({
  key: 'isFinishLoad',
  default: false,
});

const storyList = atom({
  key: 'storyList',
  default: templates,
});

const userStoryList = selector({
  key: 'userStoryList',
  get: ({ get }) => get(storyList),
  set: ({ set, reset }, newValue) => {
    set(isFinishLoad, false);

    if (newValue === 'reset') {
      set(isFinishLoad, true);

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
    set(isFinishLoad, true);
  },
});

const updateUserData = selector({
  key: 'updateUserData',
  get: ({ get }) => {
    get(isLogin);
    get(userStoryList);
    get(userData);
  },
  set: ({ set, reset }, arg) => {
    if (arg === 'logOut') {
      set(isLogin, false);
      reset(storyList);
      reset(userData);
      return;
    }

    const { data, result } = arg;

    if (result === 'noAuth' || result === 'fail') {
      set(isLogin, false);
      reset(storyList);
      set(userStoryList, 'reset');
      reset(userData);
    }

    if (data) {
      const { _id: id, email, name, picture, elementList } = data;
      set(isLogin, true);
      set(userStoryList, elementList);
      set(userData, () => ({ id, email, name, picture }));
    }
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

const editUserStoryList = selector({
  key: 'editUserStoryList',
  get: ({ get }) => get(storyList),
  set: ({ get, set }, arg) => {
    const list = get(storyList);
    const [category, id, data] = arg;

    const updateData = list[category].map(item => {
      const { _id: storyId } = item;
      if (storyId === id) {
        return data;
      }
      return item;
    });

    set(isFinishLoad, true);

    set(storyList, prev => ({
      ...prev,
      [category]: updateData,
    }));
  },
});

const selectStory = selectorFamily({
  key: 'selectStory',
  get:
    ({ categoryName, storyId }) =>
    ({ get }) => {
      if (!get(isFinishLoad)) return;

      const userStory = get(editUserStoryList);

      if (!Object.keys(userStory).length || !userStory[categoryName]) return;

      const select = userStory[categoryName].find(story => {
        const { _id: id } = story;
        return id === storyId;
      });

      return select;
    },
});

const deleteUserStoryList = selector({
  key: 'deleteUserStoryList',
  get: ({ get }) => get(storyList),
  set: ({ get, set }, arg) => {
    const list = get(storyList);
    const [category, id] = arg;

    const updateData = list[category].filter(item => {
      const { _id: storyId } = item;

      return storyId !== id;
    });

    set(
      storyList,
      Object.entries(list).reduce((acc, [storyCategory, stories]) => {
        if (storyCategory === category) {
          if (updateData.length) {
            acc[storyCategory] = updateData;
          }

          return acc;
        }

        acc[storyCategory] = stories;

        return acc;
      }, {}),
    );
  },
});

export {
  isFinishLoad,
  userData,
  isLogin,
  storyList,
  userStoryList,
  selectStory,
  addUserStoryList,
  editUserStoryList,
  deleteUserStoryList,
  updateUserData,
};
