import htmlElementsSet from '../data/htmlElements';
import { cssKeyOfcssProperties } from '../data/cssJsxProperties';
import { VALIDATION_ERROR_MESSAGE } from '../constants/errorMessage';
import validateCss from './cssValidate';

function getCssMode(key) {
  const firstCha = key[0];
  if (firstCha === '.') {
    return 'className';
  }

  if (firstCha === '#') {
    return 'id';
  }

  if (key === '*') {
    return 'element';
  }

  if (!htmlElementsSet.has(key)) {
    return VALIDATION_ERROR_MESSAGE.CSS.INCORRECT_KEY;
  }

  return 'element';
}

function getCssAllKey(css) {
  let key = '';
  let isInsideBracket = false;

  const cssAllKey = [...css].reduce((acc, curr) => {
    if (curr === '{') {
      isInsideBracket = true;

      // div, .class, div..
      key = key.trim();
      if (key.includes(',')) {
        const sliceKeyArr = key.split(',');
        const validatedKeyArr = [];

        sliceKeyArr.forEach(sliceKey => {
          const mode = getCssMode(sliceKey);

          let copySliceKey = sliceKey;

          if (mode === 'className') {
            copySliceKey = sliceKey.replace(/./, '');
          }

          const keyObject = {};

          if (mode !== VALIDATION_ERROR_MESSAGE.CSS.INCORRECT_KEY) {
            keyObject.mode = mode;
            keyObject.key = copySliceKey;
          }
          validatedKeyArr.push(keyObject);
        });

        acc.push(validatedKeyArr);
        key = '';

        return acc;
      }

      // div.className
      if (
        (key[0] !== '.' && key.includes('.')) ||
        (key[0] !== '#' && key.includes('#'))
      ) {
        const mode = key.includes('.') ? 'className' : 'id';
        const sliceKeyArr = key.split(mode === 'className' ? '.' : '#');
        const element = sliceKeyArr[0];

        if (!htmlElementsSet.has(element)) {
          acc.push({});
        }

        key = `${element}🔥${sliceKeyArr[1]}`;
        const keyObject = { mode, key };

        acc.push(keyObject);
        key = '';

        return acc;
      }

      const mode = getCssMode(key);

      if (mode === 'className') {
        key = key.replace(/./, '');
      }

      if (mode === VALIDATION_ERROR_MESSAGE.CSS.INCORRECT_KEY) {
        acc.push({});
        key = '';

        return acc;
      }

      const keyObject = { mode, key };

      if (key.length >= 1) {
        acc.push(keyObject);
      }

      key = '';

      return acc;
    }

    if (curr === '}') {
      isInsideBracket = false;
      return acc;
    }

    if (!isInsideBracket) {
      key += curr;
    }

    return acc;
  }, []);

  return cssAllKey;
}

function removeSpaceQuote(string) {
  return string.replace(/\s|"|'/g, '');
}

function getCssAllValue(css) {
  let isInsideBracket = false;
  let hasProperty = false;
  let property = '';
  let value = '';
  let obj = {};

  const cssAllValue = [...css].reduce((acc, curr) => {
    if (curr === ';') {
      const trimProp = removeSpaceQuote(property);

      const prop = trimProp.includes('-')
        ? cssKeyOfcssProperties[trimProp]
        : trimProp;

      obj[prop] = value;

      hasProperty = false;
      property = '';
      value = '';
      return acc;
    }

    if (curr === '{') {
      isInsideBracket = true;
      return acc;
    }

    if (curr === '}') {
      acc.push(obj);
      obj = {};

      isInsideBracket = false;
      return acc;
    }

    if (curr === ':') {
      hasProperty = true;
      return acc;
    }

    if (isInsideBracket) {
      if (!hasProperty) {
        property += curr;
      } else {
        value += curr;
      }
    }

    return acc;
  }, []);

  return cssAllValue;
}

export default function getParsingCss(css) {
  const validateMessage = validateCss(css);

  if (validateMessage) return validateMessage;

  const cssKeyArr = getCssAllKey(css);
  const cssValuesArr = getCssAllValue(css);

  const storedStyleObj = {
    className: {},
    id: {},
    element: {},
  };

  const storeStyle = (keyArr, duplicateValueIndex) => {
    return keyArr.reduce((store, keyObj, index) => {
      if (Array.isArray(keyObj)) {
        return storeStyle(keyObj, index);
      }

      const { mode, key } = keyObj;

      if (!mode || !key) return store;

      const property = duplicateValueIndex
        ? cssValuesArr[duplicateValueIndex]
        : cssValuesArr[index];

      if (store[mode][key]) {
        Object.assign(property, store[mode][key]);
      }

      // eslint-disable-next-line no-param-reassign
      store[mode][key] = property;

      return store;
    }, storedStyleObj);
  };

  return storeStyle(cssKeyArr);
}
