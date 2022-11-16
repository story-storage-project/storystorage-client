import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import htmlElementsSet from '../../../data/htmlElements';
import cssPropertiesMap from '../../../data/cssProperties';
import {
  htmlKeyOfhtmlJsxAttributes,
  jsxKeyOfhtmlJsxAttributes,
} from '../../../data/htmlJsxAttributes';
import {
  getCaretPosition,
  setCaretPosition,
  insertTab,
  insertBracket,
} from '../../../utils/codeEditor';
import keyMaker from '../../../utils/keyMaker';
import TextEditor from '../../molecules/TextEditor';

export default function StoryMaker() {
  const divHtmlTextAreaRef = useRef();
  const [htmlBracket, setHtmlBracket] = useState({
    isInside: false,
    data: '',
  });
  const [htmlOriginalData, setHtmlOriginalData] = useState('');
  const [htmlcursorPosition, setHtmlCursorPosition] = useState();
  const [autoHtmlBracketMode, setAutoHtmlBracketMode] = useState(false);
  const [html, setHtml] = useState('');
  const isClickEnter = useRef();

  const divCssTextAreaRef = useRef();
  const [cssOriginalData, setCssOriginalData] = useState('');
  const [css, setCss] = useState('');

  const handleHtmlKeyDown = useCallback(
    e => {
      setHtml(htmlOriginalData);

      if (e.key === 'Tab') {
        const htmlValue = insertTab(
          e.currentTarget,
          e.currentTarget.selectionStart,
        );
        e.preventDefault();

        setHtmlOriginalData(htmlValue);
        setHtml(htmlValue);
      }

      if (e.key === 'Enter') {
        isClickEnter.current = true;
      }

      if (e.key === '<') {
        setHtmlBracket(() => ({
          isInside: true,
          data: '',
        }));
      }

      if (htmlBracket.isInside) {
        if (e.key === '/') {
          setHtmlBracket(() => ({
            isInside: false,
            data: '',
          }));

          return;
        }

        if (e.key.length > 1) {
          return;
        }

        if (e.key === 'Backspace') {
          setHtmlBracket(prev => ({
            ...prev,
            data: prev.data.slice(0, -1),
          }));
        }
        setHtmlBracket(prev => ({
          ...prev,
          data: prev.data + e.key,
        }));
      }

      if (e.key === '>' && htmlBracket.data) {
        setHtmlBracket(() => ({
          isInside: false,
          data: '',
        }));
        const newValue = insertBracket(
          e.currentTarget,
          e.currentTarget.selectionStart,
          `<${htmlBracket.data}>`,
        );

        setHtmlOriginalData(newValue);
        setHtml(newValue);

        const caretPosition = getCaretPosition(
          e.currentTarget,
          e.currentTarget.selectionStart,
        );

        setHtmlCursorPosition(caretPosition);
        setAutoHtmlBracketMode(true);
      }
    },
    [htmlOriginalData, html],
  );

  const handleHtmlTextChange = useCallback(
    e => {
      if (autoHtmlBracketMode) {
        setAutoHtmlBracketMode(false);
        setCaretPosition(e.target, htmlcursorPosition + 1);
        e.target.focus();
      }

      const { value } = e.target;
      setHtmlOriginalData(value);

      if (isClickEnter.current) {
        setHtml(`${value}\n`);
        isClickEnter.current = false;
      } else {
        setHtml(value);
      }
    },
    [autoHtmlBracketMode, htmlcursorPosition],
  );

  const handleHtmlScroll = e => {
    divHtmlTextAreaRef.current.scrollTop = e.target.scrollTop;
    divHtmlTextAreaRef.current.selectionDirection = e.target.selectionDirection;
  };

  const handleCssKeyDOwn = useCallback(
    e => {
      setCss(cssOriginalData);

      if (e.key === 'Tab') {
        const cssValue = insertTab(
          e.currentTarget,
          e.currentTarget.selectionStart,
        );
        e.preventDefault();

        setCssOriginalData(cssValue);
        setCss(cssValue);
      }

      if (e.key === 'Enter') {
        isClickEnter.current = true;
      }

      if (e.key === '{' || e.key === '`') {
        const newValue = insertBracket(
          e.currentTarget,
          e.currentTarget.selectionStart,
          e.key === '{' ? '}' : '`',
        );

        setCssOriginalData(newValue);
        setCss(newValue);
      }
    },
    [cssOriginalData],
  );

  const handleCssTextChange = useCallback(e => {
    const { value } = e.target;
    setCssOriginalData(value);

    if (isClickEnter.current) {
      setCss(`${value}\n`);
      isClickEnter.current = false;
    } else {
      setCss(value);
    }
  }, []);

  const handleCssScroll = e => {
    divCssTextAreaRef.current.scrollTop = e.target.scrollTop;
    divCssTextAreaRef.current.selectionDirection = e.target.selectionDirection;
  };

  const htmlHighlightQueryText = useCallback(code => {
    const bracketSplit = code.split(/(<!--| |-->|<|>)/);

    let tagName = '';

    return bracketSplit.map((item, i) => {
      if (bracketSplit[i - 1] === '<!--' && bracketSplit[i + 1] === '-->') {
        return <Punctuati key={keyMaker(10) + item}>{item}</Punctuati>;
      }

      if (item === '<') {
        tagName = bracketSplit[i + 1];
        return <Punctuati key={keyMaker(10) + item}>{item}</Punctuati>;
      }

      if (bracketSplit[i - 1] === '<') {
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
        const attributeName = splitAttribute[0];
        const isCorrectAttributeName =
          htmlKeyOfhtmlJsxAttributes[attributeName] ||
          jsxKeyOfhtmlJsxAttributes[attributeName];

        return isCorrectAttributeName ? (
          <>
            <AttributeName key={keyMaker(10) + item}>
              {splitAttribute[0]}
            </AttributeName>
            <Punctuati key={keyMaker(10) + item}>{splitAttribute[1]}</Punctuati>
            <AttributeValue key={keyMaker(10) + item}>
              {splitAttribute[2]}
            </AttributeValue>
          </>
        ) : (
          <>
            <InCorrectAttributeName key={keyMaker(10) + item}>
              {splitAttribute[0]}
            </InCorrectAttributeName>
            <Punctuati key={keyMaker(10) + item}>{splitAttribute[1]}</Punctuati>
            <AttributeValue key={keyMaker(10) + item}>
              {splitAttribute[2]}
            </AttributeValue>
          </>
        );
      }

      if (item === '>') {
        tagName = '';
        return <Punctuati key={keyMaker(10) + item}>{item}</Punctuati>;
      }

      return item;
    });
  }, []);

  const cssHighlightQueryText = useCallback(code => {
    const bracketSplit = code.split(/(<!--|{|-->|}|;|:)/);
    let isInTag = false;

    return bracketSplit.map((item, i) => {
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
        const isCssProperty = cssPropertiesMap.has(removeEscapeChr);
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
        const removeSpace = item.replace(/ /g, '');

        return bracketSplit[i + 1] === ';' &&
          removeSpace[0] === '"' &&
          removeSpace.slice(-1) === '"' ? (
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
  }, []);

  return (
    <Container>
      <Wrapper>
        <InputWrapper>
          <label htmlFor="margin" id="margin">
            Category
          </label>
          <input id="margin" />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="margin" id="margin">
            Element Name
          </label>
          <input id="margin" />
        </InputWrapper>
        <CodeEditorContainer>
          <TextEditor
            value={htmlOriginalData}
            onChange={handleHtmlTextChange}
            onKeyDown={handleHtmlKeyDown}
            placeholder="Please enter HTML code"
            onScroll={handleHtmlScroll}
            ref={divHtmlTextAreaRef}
          >
            {htmlHighlightQueryText(html)}
          </TextEditor>
          <TextEditor
            value={cssOriginalData}
            onChange={handleCssTextChange}
            onKeyDown={handleCssKeyDOwn}
            placeholder="Please enter CSS code"
            onScroll={handleCssScroll}
            ref={divCssTextAreaRef}
          >
            {cssHighlightQueryText(css)}
          </TextEditor>
        </CodeEditorContainer>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 1.5rem;

  @media ${props => props.theme.viewSize.mobile} {
    padding: 0;
  }
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  width: inherit;
  height: inherit;
  padding: 3rem 0;

  @media ${props => props.theme.viewSize.mobile} {
    padding: 2rem 0;
  }
`;

const InputWrapper = styled.div`
  padding: 0.3rem 0;
  label {
    display: inline-block;
    min-width: 6rem;
    padding-left: 1rem;
  }
`;

const CodeEditorContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  overflow-y: scroll;

  width: 100%;
  height: 100%;

  @media ${props => props.theme.viewSize.tablet} {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Code = styled.span`
  max-width: inherit;
  word-break: break-all;
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
