import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import htmlElementsSet from '../../../data/htmlElements';
import reactHtmlAttributes from '../../../data/reactHtmlAttributes';
import {
  getCaretPosition,
  setCaretPosition,
  insertTab,
  insertBracket,
} from '../../../utils/codeEditor';
import keyMaker from '../../../utils/keyMaker';

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

  const handleHtmlKeyDOwn = e => {
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
  };

  const handleHtmlTextChange = e => {
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
  };

  const handleHtmlScroll = e => {
    divHtmlTextAreaRef.current.scrollTop = e.target.scrollTop;
    divHtmlTextAreaRef.current.selectionDirection = e.target.selectionDirection;
  };

  const handleCssKeyDOwn = e => {
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
        e.key === '{' ? '{' : '`',
      );

      setCssOriginalData(newValue);
      setCss(newValue);
    }
  };
  const handleCssTextChange = e => {
    const { value } = e.target;
    setCssOriginalData(value);

    if (isClickEnter.current) {
      setCss(`${value}\n`);
      isClickEnter.current = false;
    } else {
      setCss(value);
    }
  };

  const handleCssScroll = e => {
    divCssTextAreaRef.current.scrollTop = e.target.scrollTop;
    divCssTextAreaRef.current.selectionDirection = e.target.selectionDirection;
  };

  const htmlHighlightQueryText = code => {
    const bracketSplit = code.split(/(<!--| |-->|<|>)/);
    // input.split(/(\/\/)/)

    let isInTag = false;

    return bracketSplit.map((item, i) => {
      if (bracketSplit[i - 1] === '<!--' && bracketSplit[i + 1] === '-->') {
        return <Punctuati key={keyMaker(10) + item}>{item}</Punctuati>;
      }

      if (item === '<') {
        isInTag = true;
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

      if (isInTag && item !== '>') {
        const splitAttribute = item.split(/(=)/);
        const lowerCase = splitAttribute[0].toLowerCase();
        const isHtmlAttribute = reactHtmlAttributes[lowerCase];
        return isHtmlAttribute ? (
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
        isInTag = false;
        return <Punctuati key={keyMaker(10) + item}>{item}</Punctuati>;
      }

      return item;
    });
  };

  const cssHighlightQueryText = code => {
    const bracketSplit = code.split(/(<!--| |-->|<|>|)/);
    let isInTag = false;

    return bracketSplit.map((item, i) => {
      if (bracketSplit[i - 1] === '<!--' && bracketSplit[i + 1] === '-->') {
        return <Punctuati key={keyMaker(10) + item}>{item}</Punctuati>;
      }

      if (item === '<') {
        isInTag = true;
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

      if (isInTag && item !== '>') {
        const splitAttribute = item.split(/(=)/);
        const lowerCase = splitAttribute[0].toLowerCase();
        const isHtmlAttribute = reactHtmlAttributes[lowerCase];
        return isHtmlAttribute ? (
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
        isInTag = false;
        return <Punctuati key={keyMaker(10) + item}>{item}</Punctuati>;
      }

      return item;
    });
  };

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
          <CodeEditorWrapper>
            <InvisibleHtmlTextArea
              spellCheck="false"
              value={htmlOriginalData}
              onChange={handleHtmlTextChange}
              onKeyDown={handleHtmlKeyDOwn}
              placeholder="Please enter HTML code"
              onScroll={handleHtmlScroll}
              wrap="hard"
              cols="20"
              rows="3"
            />
            <DivHtmlTextArea ref={divHtmlTextAreaRef} unselectable="on">
              {htmlHighlightQueryText(html)}
            </DivHtmlTextArea>
          </CodeEditorWrapper>
          <CodeEditorWrapper>
            <InvisibleHtmlTextArea
              spellCheck="false"
              value={cssOriginalData}
              onChange={handleCssTextChange}
              onKeyDown={handleCssKeyDOwn}
              placeholder="Please enter CSS code"
              onScroll={handleCssScroll}
              wrap="hard"
              cols="20"
              rows="3"
            />
            <DivCssTextArea ref={divCssTextAreaRef} unselectable="on">
              {css}
            </DivCssTextArea>
          </CodeEditorWrapper>
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

const CodeEditorWrapper = styled.div`
  box-sizing: content-box;
  position: relative;
  width: 50%;
  height: 100%;
  margin: 2rem;

  @media ${props => props.theme.viewSize.tablet} {
    width: 90%;
    height: 100vh;
    flex-shrink: 1;
  }
`;

const InvisibleHtmlTextArea = styled.textarea`
  display: block;
  position: absolute;
  overflow-wrap: break-word;
  white-space: break-spaces;
  word-wrap: break-word;
  word-break: break-all;
  z-index: 2;
  box-sizing: border-box;

  width: 100%;
  height: 80%;
  margin: 0;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid ${props => props.theme.colors.lightGray};
  box-sizing: border-box;
  outline: none;

  resize: none;
  line-height: 1.2;
  letter-spacing: 1px;

  font-family: 'Mukta', sans-serif;
  font-size: ${props => props.theme.fontSize.code};
  font-weight: 300;
  color: transparent;
  background-color: transparent;
  caret-color: black;

  &:hover {
    border: 1px solid ${props => props.theme.colors.pointColor};
  }
`;

const DivHtmlTextArea = styled.div`
  position: absolute;
  overflow-wrap: break-word;
  white-space: break-spaces;
  word-wrap: break-word;
  word-break: break-all;
  box-sizing: border-box;

  overflow: scroll;
  overflow-y: scroll;

  width: 100%;
  height: 80%;
  margin: 0;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  box-sizing: border-box;

  letter-spacing: 1px;
  line-height: 1.2;

  font-family: 'Mukta', sans-serif;
  font-size: ${props => props.theme.fontSize.code};
  font-weight: 300;
  background-color: ${props => props.theme.codeThemeBright.backgrounColor};
`;

const DivCssTextArea = styled(DivHtmlTextArea)``;

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
