import { VALIDATION_ERROR_MESSAGE } from '../constants/errorMessage';
import {
  htmlKeyOfhtmlJsxAttributes,
  jsxKeyOfhtmlJsxAttributes,
} from '../data/htmlJsxAttributes';

function basicValidateHtml(html) {
  if (!html.length) {
    return VALIDATION_ERROR_MESSAGE.NULL;
  }

  if (!html.includes('<') || !html.includes('>')) {
    return VALIDATION_ERROR_MESSAGE.HTML.MISSING_BRACKETS;
  }

  const validateBrackets = html.match(/</g).length === html.match(/>/g).length;

  return validateBrackets
    ? 'pass'
    : VALIDATION_ERROR_MESSAGE.HTML.MISSING_BRACKETS;
}

export default function validateHtml(html) {
  basicValidateHtml(html);

  let element = '';
  let isInsideBracket = false;

  [...html].forEach((value, i) => {
    if (value === '<' && html[i + 1] !== '/') {
      isInsideBracket = true;
    }

    if (value === '>') {
      if (element) {
        const splitSpaceArr = element.split(' ');
        const cleanElement = splitSpaceArr[0].replace(/\//g, '');

        const isCorrectElement =
          htmlKeyOfhtmlJsxAttributes[cleanElement] ||
          jsxKeyOfhtmlJsxAttributes[cleanElement];

        if (!isCorrectElement) {
          return VALIDATION_ERROR_MESSAGE.HTML.INCORRECT_ELEMENT;
        }
      }

      isInsideBracket = false;
    }

    if (isInsideBracket) {
      element += value;
    }
  });

  return 'pass';
}
