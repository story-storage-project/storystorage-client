import { VALIDATION_ERROR_MESSAGE } from '../constants/errorMessage';

export default function validateCss(css) {
  if (!css.length) {
    return VALIDATION_ERROR_MESSAGE.NULL;
  }
  if (
    !css.includes('{') ||
    !css.includes('}') ||
    !css.includes(':') ||
    !css.includes(';')
  ) {
    return VALIDATION_ERROR_MESSAGE.CSS.MISSING_ALL;
  }

  const validateBrackets = css.match(/{/g).length === css.match(/}/g).length;
  const validateSemicolon = true;

  if (validateBrackets && validateSemicolon) {
    return '';
  }

  if (!validateBrackets && !validateSemicolon) {
    return VALIDATION_ERROR_MESSAGE.CSS.MISSING_ALL;
  }

  if (!validateBrackets) {
    return VALIDATION_ERROR_MESSAGE.CSS.MISSING_BRACKETS;
  }

  return VALIDATION_ERROR_MESSAGE.CSS.MISSING_SEMICOLON;
}
