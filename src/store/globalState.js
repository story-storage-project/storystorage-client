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

const updateStyle = selector({
  key: 'updateStyle',
  get: ({ get }) => get(styleObject),
  set: ({ get, set, reset }, arg) => {
    if (arg === 'reset') {
      return reset(styleObject);
    }

    const [type, storyId, data] = arg;

    switch (type) {
      case 'update': {
        return set(styleObject, prev => ({
          ...prev,
          [storyId]: data,
        }));
      }
      case 'delete': {
        const copyStyleObj = get(styleObject);

        return set(
          styleObject,
          Object.entries(copyStyleObj).reduce((acc, [id, style]) => {
            if (id === storyId) {
              return acc;
            }

            acc[id] = style;

            return acc;
          }),
          {},
        );
      }
      default:
        break;
    }
  },
});

export { isOnLoginReqModal, uiTheme, styleObject, styleInnerHTML, updateStyle };
