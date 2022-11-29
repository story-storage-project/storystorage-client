import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  cssKeyOfcssProperties,
  jsxKeyOfCssProperties,
} from '../data/cssJsxProperties';
import keyMaker from '../utils/keyMaker';

export default function useCssHighLightQueryText(cssCode) {
  const copyCssCode = useRef(cssCode);
  const highlightElement = useRef(cssCode);
  const [, setRender] = useState(cssCode);

  const query = useCallback(code => {
    copyCssCode.current = code;

    const bracketSplit = code.split(/(<!--|{|-->|}|;|:)/);
    let isInTag = false;

    const element = bracketSplit.map((item, i) => {
      if (bracketSplit[i - 1] === '<!--' && bracketSplit[i + 1] === '-->') {
        return <Punctuati key={keyMaker(10) + item}>{item}</Punctuati>;
      }

      if (item === '{') {
        isInTag = true;
        return <Punctuati key={keyMaker(10) + item}>{item}</Punctuati>;
      }

      if (
        (isInTag && bracketSplit[i - 1] === '{') ||
        bracketSplit[i - 1] === ';'
      ) {
        const removeEscapeChr = item.replace(/\n| |\t/g, '');
        const isCssProperty =
          cssKeyOfcssProperties[removeEscapeChr] ||
          jsxKeyOfCssProperties[removeEscapeChr];
        return isCssProperty ? (
          <TagCode key={keyMaker(10) + item}>{item}</TagCode>
        ) : (
          <IncorrectTagCode key={keyMaker(10) + item}>{item}</IncorrectTagCode>
        );
      }

      if (isInTag && item === ':') {
        return <Punctuati key={keyMaker(10) + item}>{item}</Punctuati>;
      }

      if (isInTag && bracketSplit[i - 1] === ':') {
        return bracketSplit[i + 1] === ';' ? (
          <AttributeName key={keyMaker(10) + item}>{item}</AttributeName>
        ) : (
          <InCorrectAttributeName key={keyMaker(10) + item}>
            {item}
          </InCorrectAttributeName>
        );
      }

      if (item === '}') {
        isInTag = false;
        return <Punctuati key={keyMaker(10) + item}>{item}</Punctuati>;
      }

      return item;
    });

    highlightElement.current = element;
    setRender(element);
  }, []);

  useEffect(() => {
    query(cssCode);
  }, []);

  return [copyCssCode.current, highlightElement.current, query];
}

const Code = styled.span`
  max-width: inherit;
  overflow-wrap: break-word;
  white-space: break-spaces;
  word-wrap: break-word;
  word-break: break-all;
  box-sizing: border-box;
`;

const TagCode = styled(Code)`
  max-width: inherit;
  word-break: break-all;
  color: ${props => props.theme.colors.codeTheme.tagColor};
`;

const IncorrectTagCode = styled(TagCode)`
  text-decoration: underline dotted;
`;

const Punctuati = styled(Code)`
  max-width: inherit;
  word-break: break-all;
  color: ${props => props.theme.colors.codeTheme.punctuation};
`;

const AttributeName = styled(Code)`
  color: ${props => props.theme.colors.codeTheme.cssAttributeValue};
`;

const InCorrectAttributeName = styled(AttributeName)`
  text-decoration: underline dotted;
`;
