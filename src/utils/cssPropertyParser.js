import htmlElementsSet from '../data/htmlElements';
import {
  cssKeyOfcssProperties,
  jsxKeyOfCssProperties,
} from '../data/cssJsxProperties';
import { VALIDATION_ERROR_MESSAGE } from '../constants/errorMessage';

function validateCss(css) {
  if (!css.length) {
    return VALIDATION_ERROR_MESSAGE.NULL;
  }

  const validateBrackets = css.match(/{/g).length === css.match(/}/g).length;
  const validateSemicolon = css.match(/:/g).length === css.match(/;/g).length;

  if (validateBrackets && validateSemicolon) {
    return 'pass';
  }

  if (!validateBrackets && !validateSemicolon) {
    return VALIDATION_ERROR_MESSAGE.CSS.MISSING_ALL;
  }

  if (!validateBrackets) {
    return VALIDATION_ERROR_MESSAGE.CSS.MISSING_BRACKETS;
  }

  return VALIDATION_ERROR_MESSAGE.CSS.MISSING_SEMICOLON;
}

function getCssMode(key) {
  const firstCha = key[0];
  if (firstCha === '.') {
    return 'class';
  }

  if (firstCha === '#') {
    return 'id';
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

      if (key.includes(',')) {
        const sliceKeyArr = key.split(',');
        const validatedKeyArr = [];

        sliceKeyArr.forEach(sliceKey => {
          const mode = getCssMode(sliceKey);
          const keyObject = {};

          if (mode !== VALIDATION_ERROR_MESSAGE.CSS.INCORRECT_KEY) {
            keyObject.mode = mode;
            keyObject.key = sliceKey;

            validatedKeyArr.push(keyObject);
          }
        });
        acc.push(validatedKeyArr);
        key = '';

        return acc;
      }

      const mode = getCssMode(key);

      if (mode === VALIDATION_ERROR_MESSAGE.CSS.INCORRECT_KEY) {
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

function removeSpace(string) {
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
      const prop = removeSpace(property);

      if (!(jsxKeyOfCssProperties[prop] || cssKeyOfcssProperties[prop])) {
        return acc;
      }

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

  if (validateMessage !== 'pass') return validateMessage;

  const cssKeyArr = getCssAllKey(removeSpace(css));
  const cssValuesArr = getCssAllValue(css);

  const storedStyleObj = {
    class: {},
    id: {},
    element: {},
  };

  const storeStyle = (keyArr, duplicateValueIndex) => {
    return keyArr.reduce((store, keyObj, index) => {
      if (Array.isArray(keyObj)) {
        return storeStyle(keyObj, index);
      }

      const { mode, key } = keyObj;

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
