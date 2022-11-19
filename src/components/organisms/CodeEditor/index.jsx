import React, { useCallback, Fragment, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import htmlElementsSet from '../../../data/htmlElements';
import {
  cssKeyOfcssProperties,
  jsxKeyOfCssProperties,
} from '../../../data/cssJsxProperties';
import {
  htmlKeyOfhtmlJsxAttributes,
  jsxKeyOfhtmlJsxAttributes,
} from '../../../data/htmlJsxAttributes';
import {
  getCaretPosition,
  setCaretPosition,
  insertTab,
  insertText,
} from '../../../utils/codeEditor';
import keyMaker from '../../../utils/keyMaker';
import TextEditor from '../../molecules/TextEditor';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import cssPropertyParser from '../../../utils/cssPropertyParser';
import validateHtml from '../../../utils/htmlValidate';
import { VALIDATION_ERROR_MESSAGE } from '../../../constants/errorMessage';

export default function CodeEditor({ saveStoryData }) {
  const [storyName, setStoryName] = useState('test');
  const [categoryName, setCategoryName] = useState('test');
  const [validateMessage, setValidateMessage] = useState('');

  const [selectedCodeMode, setSelectedCodeMode] = useState('HTML');
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
  const [prevKeyCode, setPrevKeyCode] = useState('');
  const divCssTextAreaRef = useRef();
  const [cssOriginalData, setCssOriginalData] = useState('');
  const [css, setCss] = useState(`
    .test {
      color: red;
    }
  `);

  const handleOnClick = () => {
    if (validateMessage) {
      setValidateMessage('');
    }
    if (!html || !css || !storyName || !categoryName) {
      setValidateMessage(VALIDATION_ERROR_MESSAGE.NULL);
      return;
    }
    const validateHtmlResult = validateHtml(html);
    if (validateHtmlResult !== 'pass') {
      setValidateMessage(prev => `${prev} ${validateHtmlResult}`);
      return;
    }
    const parsingCssResult = cssPropertyParser(css);
    if (typeof parsingCssResult === 'string') {
      setValidateMessage(prev => `${prev} ${parsingCssResult}`);
      return;
    }
    const data = {
      name: storyName,
      category: categoryName,
      code: html,
      css: parsingCssResult,
    };
    saveStoryData(data);
  };

  const handleOnChangeNameInput = useCallback(
    e => {
      setStoryName(e.target.value);
    },
    [storyName],
  );

  const handleOnChangeCategoryInput = useCallback(
    e => {
      setCategoryName(e.target.value);
    },
    [categoryName],
  );

  const handleHtmlKeyDown = useCallback(
    e => {
      setHtml(htmlOriginalData);

      if (e.key === 'v' && prevKeyCode === 91) {
        return insertText(
          e.currentTarget,
          e.currentTarget.selectionStart,
          '  ',
        );
      }

      setPrevKeyCode(e.keyCode);

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

        if (e.key === 'Backspace') {
          setHtmlBracket(prev => ({
            ...prev,
            data: prev.data.slice(0, -1),
          }));
          return;
        }

        if (e.key.length > 1) {
          return;
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
        const cleanData = htmlBracket.data.split(' ')[0];
        const newValue = insertText(
          e.currentTarget,
          e.currentTarget.selectionStart,
          `</${cleanData}>`,
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
    [htmlOriginalData, htmlBracket, html, prevKeyCode],
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

      if (e.key === 'v' && e.target.value.slice(-1) !== 'v') {
        insertText(e.currentTarget, e.currentTarget.selectionStart, '  ');
      }

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
        const newValue = insertText(
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
  }, []);

  return (
    <Container>
      <Header>
        <InputContainer>
          <InputWrapper>
            <label htmlFor="margin" id="margin">
              Category
            </label>
            <input
              id="margin"
              value={categoryName}
              onChange={handleOnChangeCategoryInput}
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="margin" id="margin">
              Element Name
            </label>
            <input
              id="margin"
              value={storyName}
              onChange={handleOnChangeNameInput}
            />
          </InputWrapper>
        </InputContainer>
        <Button bg="lightGray" margin="0 0 0 3rem" onClick={handleOnClick}>
          submit
        </Button>
      </Header>
      <Text>{validateMessage && validateMessage}</Text>
      <CodeEditorContainer>
        <CodeEditorWrapper>
          <TitleWrapper>
            <Button
              textColor={
                selectedCodeMode === 'HTML' ? 'pointColor' : 'textColor'
              }
              onClick={() => setSelectedCodeMode('HTML')}
            >
              HTML
            </Button>
            <Button
              textColor={
                selectedCodeMode === 'JSX' ? 'pointColor' : 'textColor'
              }
              onClick={() => setSelectedCodeMode('JSX')}
            >
              JSX
            </Button>
          </TitleWrapper>
          <TextEditor
            title="HTML"
            titleOption={['HTML', 'JSX']}
            value={htmlOriginalData}
            onChange={handleHtmlTextChange}
            onKeyDown={handleHtmlKeyDown}
            placeholder="Please enter HTML code"
            onScroll={handleHtmlScroll}
            ref={divHtmlTextAreaRef}
          >
            {htmlHighlightQueryText(html)}
          </TextEditor>
        </CodeEditorWrapper>
        <CodeEditorWrapper>
          <TitleWrapper>
            <Text>CSS</Text>
          </TitleWrapper>
          <TextEditor
            title="CSS"
            value={cssOriginalData}
            onChange={handleCssTextChange}
            onKeyDown={handleCssKeyDOwn}
            placeholder="Please enter CSS code"
            onScroll={handleCssScroll}
            ref={divCssTextAreaRef}
          >
            {cssHighlightQueryText(css)}
          </TextEditor>
        </CodeEditorWrapper>
      </CodeEditorContainer>
    </Container>
  );
}

CodeEditor.propTypes = {
  saveStoryData: PropTypes.func.isRequired,
};

const Container = styled.div`
  box-sizing: border-box;
  width: inherit;
  height: auto;
  padding: 3rem 0 0 0;

  @media ${props => props.theme.viewSize.mobile} {
    padding: 2rem 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0 2rem;
`;

const InputWrapper = styled.div`
  padding: 0.3rem 0;
  label {
    display: inline-block;
    min-width: 6rem;
  }
`;

const Wrapper = styled.div``;

const CodeEditorWrapper = styled.div`
  margin-top: 1rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  margin: 0 0 0 2rem;
`;

const CodeEditorContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;

  width: 100%;
  height: 100%;

  @media ${props => props.theme.viewSize.tablet} {
    flex-direction: column;
    justify-content: flex-start;
    height: 100vh;
  }
`;

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
