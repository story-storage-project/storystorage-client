import { atom, selector } from 'recoil';

const isOnLoginReqModal = atom({
  key: 'isOnLoginReqModal',
  default: false,
});

const uiTheme = atom({
  key: 'theme',
  default: 'lightTheme',
});

const styleObject = atom({
  key: 'style',
  default: {},
});

const styleInnerHTML = selector({
  key: 'styleInnerHTML',
  get: ({ get }) => {
    if (!Object.keys(get(styleObject)).length) return '';

    const style = get(styleObject);

    const allStyle = Object.values(style).join('');

    return allStyle;
  },
});

const addStyle = selector({
  key: 'addStyle',
  get: ({ get }) => get(styleObject),
  set: ({ set }, arg) => {
    const [id, data] = arg;

    set(styleObject, prev => ({
      ...prev,
      [id]: data,
    }));
  },
});

const editStyle = selector({
  key: 'editStyle',
  get: ({ get }) => get(styleObject),
  set: ({ set, reset }, arg) => {
    if (arg === 'reset') {
      return reset(styleObject);
    }

    const [id, data] = arg;

    set(styleObject, prev => ({
      ...prev,
      [id]: data,
    }));
  },
});

const deleteStyle = selector({
  key: 'deleteStyle',
  get: ({ get }) => get(styleObject),
  set: ({ get, set }, targetId) => {
    const copyStyleObj = get(styleObject);

    set(
      styleObject,
      Object.entries(copyStyleObj).reduce((acc, [id, style]) => {
        if (id === targetId) {
          return acc;
        }

        acc[id] = style;

        return acc;
      }),
      {},
    );
  },
});

export {
  isOnLoginReqModal,
  uiTheme,
  styleObject,
  styleInnerHTML,
  addStyle,
  editStyle,
  deleteStyle,
};
