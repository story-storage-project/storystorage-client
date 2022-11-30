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
      console.log('hihi');
      set(isFinishLoad, true);

      return reset(storyList);
    }

    console.log(newValue);

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
    set(isFinishLoad, false);

    const list = get(storyList);
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
    set(isFinishLoad, true);
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
};
