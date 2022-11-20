import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useHtmlHighLightQueryText from '../../../hooks/useHtmlHighLightQueryText';
import useCssHighLightQueryText from '../../../hooks/useCssHighLightQueryText';
import {
  getCaretPosition,
  setCaretPosition,
  insertTab,
  insertText,
} from '../../../utils/codeEditor';
import TextEditor from '../../molecules/TextEditor';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import cssPropertyParser from '../../../utils/cssPropertyParser';
import {
  convertJsxToHtml,
  validateHtml,
  exportInlineStyle,
} from '../../../utils/htmlValidate';
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
  const [htmlCode, queryHtml, setQueryHtml] = useHtmlHighLightQueryText();

  const [cssCode, queryCss, setQueryCss] = useCssHighLightQueryText('asdfasdf');
  const isClickEnter = useRef();
  const [prevKeyCode, setPrevKeyCode] = useState('');
  const divCssTextAreaRef = useRef();
  const [cssOriginalData, setCssOriginalData] = useState('');

  const handleOnClick = () => {
    if (validateMessage) {
      setValidateMessage('');
    }

    if (!htmlCode || !cssCode || !storyName || !categoryName) {
      setValidateMessage(VALIDATION_ERROR_MESSAGE.NULL);
      return;
    }

    const [deleteInlineStyleHtml, inlineStyle] = exportInlineStyle(
      htmlCode,
      selectedCodeMode,
    );

    let html = deleteInlineStyleHtml;
    let css = cssCode;

    if (inlineStyle) {
      inlineStyle.forEach(style => {
        css += style;
      });
    }

    if (selectedCodeMode === 'JSX') {
      html = convertJsxToHtml(htmlCode);
    }

    const validateHtmlResult = validateHtml(html, selectedCodeMode);

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
      if (e.key === 'v' && prevKeyCode === 91) {
        return insertText(
          e.currentTarget,
          e.currentTarget.selectionStart,
          '   ',
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
        setQueryHtml(htmlValue);
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
        setQueryHtml(newValue);

        const caretPosition = getCaretPosition(
          e.currentTarget,
          e.currentTarget.selectionStart,
        );

        setHtmlCursorPosition(caretPosition);
        setAutoHtmlBracketMode(true);
      }
      setQueryHtml(htmlOriginalData);
    },
    [htmlOriginalData, htmlBracket, prevKeyCode, htmlCode],
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
        // setHtml(`${value}\n`);
        setQueryHtml(`${value}\n`);
        isClickEnter.current = false;
      } else {
        // setHtml(value);
        setQueryHtml(value);
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
      setQueryCss(cssOriginalData);

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
        setQueryCss(cssValue);
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
        setQueryCss(newValue);
      }
    },
    [cssOriginalData],
  );

  const handleCssTextChange = useCallback(e => {
    const { value } = e.target;
    setCssOriginalData(value);

    if (isClickEnter.current) {
      setQueryCss(`${value}\n`);
      isClickEnter.current = false;
    } else {
      setQueryCss(value);
    }
  }, []);

  const handleCssScroll = e => {
    divCssTextAreaRef.current.scrollTop = e.target.scrollTop;
    divCssTextAreaRef.current.selectionDirection = e.target.selectionDirection;
  };

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
            {queryHtml}
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
            {queryCss}
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
