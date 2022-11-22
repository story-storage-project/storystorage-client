import React, {
  Fragment,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import styled from 'styled-components';
import htmlElementsSet from '../data/htmlElements';
import {
  htmlKeyOfhtmlJsxAttributes,
  jsxKeyOfhtmlJsxAttributes,
} from '../data/htmlJsxAttributes';
import keyMaker from '../utils/keyMaker';

export default function useHtmlHighLightQueryText(htmlCode) {
  const copyHtmlCode = useRef(htmlCode);
  const highlightElement = useRef(htmlCode);
  const [, setRender] = useState(htmlCode);

  const query = useCallback(code => {
    copyHtmlCode.current = code;

    const bracketSplitCode = code.split(/(<!--| |-->|<|>)/);
    let tagName = '';

    const element = bracketSplitCode.map((item, i) => {
      if (
        bracketSplitCode[i - 1] === '<!--' &&
        bracketSplitCode[i + 1] === '-->'
      ) {
        return <Punctuati key={keyMaker(10) + item}>{item}</Punctuati>;
      }

      if (item === '<') {
        tagName = bracketSplitCode[i + 1];
        return <Punctuati key={keyMaker(10) + item}>{item}</Punctuati>;
      }

      if (bracketSplitCode[i - 1] === '<') {
        const itemData = item[0] === '/' ? item.slice(1) : item;
        const isHtmlElement = htmlElementsSet.has(itemData);

        return isHtmlElement ? (
          <TagCode key={keyMaker(10) + item}>{item}</TagCode>
        ) : (
          <IncorrectTagCode key={keyMaker(10) + item}>{item}</IncorrectTagCode>
        );
      }

      if (tagName && item !== '>') {
        const splitAttribute = item.split(/(=)/);
        const equalLength = splitAttribute.filter(itme => itme === '=').length;

        if (equalLength > 1) {
          return (
            <AttributeValue key={keyMaker(10) + item}>{item}</AttributeValue>
          );
        }

        const attributeName = splitAttribute[0];
        const isCorrectAttributeName =
          htmlKeyOfhtmlJsxAttributes[attributeName] ||
          jsxKeyOfhtmlJsxAttributes[attributeName];

        return isCorrectAttributeName ? (
          <Fragment key={keyMaker(10) + item}>
            <AttributeName>{splitAttribute[0]}</AttributeName>
            <Punctuati>{splitAttribute[1]}</Punctuati>
            <AttributeValue>{splitAttribute[2]}</AttributeValue>
          </Fragment>
        ) : (
          <Fragment key={keyMaker(10) + item}>
            <InCorrectAttributeName>{splitAttribute[0]}</InCorrectAttributeName>
            <Punctuati>{splitAttribute[1]}</Punctuati>
            <AttributeValue>{splitAttribute[2]}</AttributeValue>
          </Fragment>
        );
      }

      if (item === '>') {
        tagName = '';
        return <Punctuati key={keyMaker(10) + item}>{item}</Punctuati>;
      }

      return item;
    });

    highlightElement.current = element;
    setRender(element);
  }, []);

  useEffect(() => {
    query(htmlCode);
  }, []);

  return [copyHtmlCode.current, highlightElement.current, query];
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
  color: ${props => props.theme.codeThemeBright.tagColor};
`;

const IncorrectTagCode = styled(TagCode)`
  text-decoration: underline dotted;
`;

const Punctuati = styled(Code)`
  max-width: inherit;
  word-break: break-all;
  color: ${props => props.theme.codeThemeBright.punctuation};
`;

const AttributeName = styled(Code)`
  color: ${props => props.theme.codeThemeBright.attributeName};
`;

const InCorrectAttributeName = styled(AttributeName)`
  text-decoration: underline dotted;
`;

const AttributeValue = styled(Code)`
  color: ${props => props.theme.codeThemeBright.attributeValue};
`;
