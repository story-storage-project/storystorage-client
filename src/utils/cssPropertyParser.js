import htmlElementsSet from '../data/htmlElements';

function getCssAllKey(css) {
  let cssMode = '';
  let key = '';
  let isInsideBracket = false;

  const cssAllKey = [...css].reduce((acc, curr) => {
    if (!isInsideBracket && curr === '.') {
      cssMode = 'class';
      return acc;
    }

    if (curr === '{') {
      isInsideBracket = true;

      if (key && cssMode !== 'class') {
        cssMode = htmlElementsSet.has(key) ? 'element' : 'id';
      }

      const keyObject = { mode: cssMode, key };

      if (key.length >= 1) {
        acc.push(keyObject);
      }

      key = '';
      cssMode = '';

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

function getCssAllValue(css) {
  let isInsideBracket = false;
  let hasKey = false;
  let key = '';
  let value = '';
  let obj = {};

  const cssAllValue = [...css].reduce((acc, curr) => {
    if (curr === ';') {
      obj[key] = value;

      hasKey = false;
      key = '';
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
      hasKey = true;
      return acc;
    }

    if (isInsideBracket) {
      if (!hasKey) {
        key += curr;
      } else {
        value += curr;
      }
    }

    return acc;
  }, []);

  return cssAllValue;
}

function removeSpace(string) {
  return string.replace(/\s|"|'/g, '');
}

export default function cssPropertyParser(
  css,
  classSetState,
  idCssSetState,
  elementCssSetState,
) {
  const cssKeyArr = getCssAllKey(removeSpace(css));
  const cssValuesArr = getCssAllValue(removeSpace(css));

  cssKeyArr.forEach((cssKey, i) => {
    if (cssKey.mode === 'class') {
      classSetState(prev => ({
        ...prev,
        [cssKey.key]: cssValuesArr[i],
      }));
    }

    if (cssKey.mode === 'element') {
      elementCssSetState(prev => ({
        ...prev,
        [cssKey.key]: cssValuesArr[i],
      }));
    }

    if (cssKey.mode === 'id') {
      const removeSharpKey = cssKey.key.replace(/#/g, '');

      idCssSetState(prev => ({
        ...prev,
        [removeSharpKey]: cssValuesArr[i],
      }));
    }
  });
}
