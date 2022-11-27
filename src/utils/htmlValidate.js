import { VALIDATION_ERROR_MESSAGE } from '../constants/errorMessage';
import {
  htmlKeyOfhtmlJsxAttributes,
  jsxKeyOfhtmlJsxAttributes,
} from '../data/htmlJsxAttributes';
import htmlElementsSet from '../data/htmlElements';
import keyMaker from './keyMaker';

function basicValidateHtml(html) {
  if (!html.length) {
    return VALIDATION_ERROR_MESSAGE.NULL;
  }

  if (!html.includes('<') || !html.includes('>')) {
    return VALIDATION_ERROR_MESSAGE.HTML.MISSING_BRACKETS;
  }

  const arrowRemoveHtml = html.replace(/=>/g, '');
  const validateBrackets =
    arrowRemoveHtml?.match(/</g)?.length ===
    arrowRemoveHtml?.match(/>/g)?.length;

  return validateBrackets ? '' : VALIDATION_ERROR_MESSAGE.HTML.MISSING_BRACKETS;
}

export function validateHtml(html) {
  if (!html) return;

  const basicValidationError = basicValidateHtml(html);

  if (basicValidationError) {
    return basicValidationError;
  }

  const bracketSplitCode = html.split(/(<!--| |-->|<|>)/);
  let tagName = '';
  let errorMessage = '';

  bracketSplitCode.forEach((item, i) => {
    if (item === '<' && bracketSplitCode[i + 1] !== '/') {
      tagName = bracketSplitCode[i + 1];

      if (tagName[0] === '/') return;

      if (!htmlElementsSet.has(tagName)) {
        errorMessage = VALIDATION_ERROR_MESSAGE.HTML.INCORRECT_ELEMENT;
      }
    }

    if (item === '>') {
      tagName = '';
    }
  });

  return errorMessage;
}

export function exportInlineStyle(code, mode) {
  const splitHtml = code.split(/(<!--| |-->|<|>|\/)/);

  let tagName = '';
  let isStyle = false;
  let style = '';
  const styleStorage = [];

  const addDatasetCode = splitHtml.reduce((acc, item, i) => {
    if (item === '<') {
      tagName = splitHtml[i + 1];

      acc.push(item);
      return acc;
    }

    if (splitHtml[i - 1] === '<') {
      if (item.slice(0, 1) === '/') {
        tagName = '';
        acc.push(item);

        return acc;
      }
      acc.push(item);

      return acc;
    }

    if (isStyle) {
      if (
        mode === 'HTML' &&
        (item.slice(-1) === "'" || item.slice(-1) === '"')
      ) {
        isStyle = false;

        style += item;
        const splitProperty = style.split(/(=)/);
        const newClass = keyMaker(5);

        acc.push(`data-${newClass}=inline `);

        styleStorage.push(
          `.${newClass}{${splitProperty[2].replace(/'|"/g, '')}}`,
        );

        return acc;
      }
      if (mode === 'JSX' && item.slice(-1) === '}') {
        isStyle = false;

        style += item;
        const splitProperty = style.split(/(=)/);
        const removeQuoteAndSemicolon = splitProperty[2]
          .replace(/"|'/g, '')
          .replace(/,/g, ';')
          .replace(/{{/g, '{')
          .replace(/}}/g, '}');

        const newClass = keyMaker(5);

        acc.push(`data-${newClass}=inline `);

        if (removeQuoteAndSemicolon.slice(-2, -1) !== ';') {
          const newCss = `${removeQuoteAndSemicolon.slice(0, -1)};}`;
          styleStorage.push(`.${newClass}${newCss}`);

          return acc;
        }

        styleStorage.push(`.${newClass}${removeQuoteAndSemicolon}`);

        return acc;
      }

      style += item;

      return acc;
    }

    if (tagName && item !== '>') {
      const splitProperty = item.split(/(=)/);

      if (splitProperty[0].length > 1) {
        if (splitProperty[0] === 'style') {
          if (
            (mode === 'HTML' && splitProperty[2].slice(-1) === "'") ||
            splitProperty[2].slice(-1) === '"'
          ) {
            const newClass = keyMaker(5);

            acc.push(`data-${newClass}=inline `);
            styleStorage.push(
              `.${newClass}{${splitProperty[2].replace(/'|"/g, '')}}`,
            );

            return acc;
          }
          if (mode === 'JSX' && splitProperty[2].slice(-1) === '}') {
            const removeQuoteAndSemicolon = splitProperty[2]
              .replace(/"|'/g, '')
              .replace(/,/g, ';')
              .replace(/{{/g, '{')
              .replace(/}}/g, '}');

            const newClass = keyMaker(5);
            acc.push(`data-${newClass}=inline `);

            if (removeQuoteAndSemicolon.slice(-2, -1) !== ';') {
              const newCss = `${removeQuoteAndSemicolon.slice(0, -1)};}`;
              styleStorage.push(`.${newClass}${newCss}`);

              return acc;
            }

            styleStorage.push(`.${newClass}${removeQuoteAndSemicolon}`);

            return acc;
          }

          isStyle = true;
          style = splitProperty.join('');

          return acc;
        }
        acc.push(item);

        return acc;
      }
      acc.push(item);

      return acc;
    }

    if (item === '>') {
      tagName = '';
      acc.push(item);

      return acc;
    }
    acc.push(item);

    return acc;
  }, []);

  return [addDatasetCode.join(''), styleStorage];
}

export function convertJsxToHtml(html) {
  const splitHtml = html.split(/(<!--| |-->|<|>|\/)/);

  let tagName = '';
  let isStyle = false;

  const convert = splitHtml.reduce((acc, item, i) => {
    if (item === '<!--' || item === '-->') {
      acc.push(item);

      return acc;
    }
    if (item === '<') {
      tagName = splitHtml[i + 1];

      acc.push(item);

      return acc;
    }

    if (item === '/>') {
      acc.push(`></${tagName}>`);

      return acc;
    }

    if (splitHtml[i - 1] === '<') {
      if (item.slice(0, 1) === '/') {
        tagName = '';

        acc.push(item);

        return acc;
      }

      acc.push(item);

      return acc;
    }

    if (isStyle) {
      if (item.slice(-1) === '}') {
        isStyle = false;

        return acc;
      }

      return acc;
    }

    if (tagName && item !== '>') {
      const splitProperty = item.split(/(=)/);

      if (splitProperty[0].length > 1) {
        if (splitProperty[0] === 'style') {
          return acc;
        }

        const convertProperty = jsxKeyOfhtmlJsxAttributes[splitProperty[0]];

        splitProperty[0] = convertProperty || splitProperty[0];

        acc.push(splitProperty.join(''));

        return acc;
      }

      acc.push(item);

      return acc;
    }

    if (item === '>') {
      tagName = '';

      acc.push(item);

      return acc;
    }

    acc.push(item);

    return acc;
  }, []);

  return convert.join('');
}

export function convertHtmlToJsx(Jsx) {
  const splitHtml = Jsx.split(/(<!--| |-->|<|>|\/)/);

  let tagName = '';
  let isStyle = false;

  const convert = splitHtml.reduce((acc, item, i) => {
    if (item === '<!--' || item === '-->') {
      acc.push(item);

      return acc;
    }
    if (item === '<') {
      tagName = splitHtml[i + 1];

      acc.push(item);

      return acc;
    }

    if (item === '/>') {
      acc.push(`></${tagName}>`);

      return acc;
    }

    if (splitHtml[i - 1] === '<') {
      if (item.slice(0, 1) === '/') {
        tagName = '';

        acc.push(item);

        return acc;
      }

      acc.push(item);

      return acc;
    }

    if (isStyle) {
      if (item.slice(-1) === '}') {
        isStyle = false;

        return acc;
      }

      return acc;
    }

    if (tagName && item !== '>') {
      const splitProperty = item.split(/(=)/);

      if (splitProperty[0].length > 1) {
        if (splitProperty[0] === 'style') {
          return acc;
        }

        const convertProperty = htmlKeyOfhtmlJsxAttributes[splitProperty[0]];
        splitProperty[0] = convertProperty || splitProperty[0];

        acc.push(splitProperty.join(''));

        return acc;
      }

      acc.push(item);

      return acc;
    }

    if (item === '>') {
      tagName = '';

      acc.push(item);

      return acc;
    }

    acc.push(item);

    return acc;
  }, []);

  return convert.join('');
}
