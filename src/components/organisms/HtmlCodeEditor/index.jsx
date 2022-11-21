import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import styled from 'styled-components';
import useHtmlHighLightQueryText from '../../../hooks/useHtmlHighLightQueryText';
import {
  getCaretPosition,
  setCaretPosition,
  insertTab,
  insertText,
} from '../../../utils/codeEditor';
import TextEditor from '../../molecules/TextEditor';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import { validateHtml } from '../../../utils/htmlValidate';
import { CodeContext } from '../../../context/CodeProvider';

export default function HtmlCodeEditor() {
  const { html, writeHtml } = useContext(CodeContext);

  const [htmlValidateMessage, setHtmlValidateMessage] = useState('');

  const [selectedCodeMode, setSelectedCodeMode] = useState('HTML');
  const divHtmlTextAreaRef = useRef();
  const [htmlBracket, setHtmlBracket] = useState({
    isInside: false,
    data: '',
  });
  const [htmlOriginalData, setHtmlOriginalData] = useState(html);
  const [htmlCode, queryHtml, setQueryHtml] = useHtmlHighLightQueryText(html);
  const [htmlcursorPosition, setHtmlCursorPosition] = useState();
  const [autoHtmlBracketMode, setAutoHtmlBracketMode] = useState(false);

  const [prevKeyCode, setPrevKeyCode] = useState('');
  const isClickEnter = useRef();

  useEffect(() => {
    if (!htmlCode) return;

    const validateResultMessage = validateHtml(htmlCode, selectedCodeMode);

    setHtmlValidateMessage(validateResultMessage);

    if (!validateResultMessage) writeHtml(htmlCode);
  }, [htmlCode]);

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
        setQueryHtml(`${value}\n`);
        isClickEnter.current = false;
      } else {
        setQueryHtml(value);
      }
    },

    [autoHtmlBracketMode, htmlcursorPosition],
  );

  const handleHtmlScroll = e => {
    divHtmlTextAreaRef.current.scrollTop = e.target.scrollTop;
    divHtmlTextAreaRef.current.selectionDirection = e.target.selectionDirection;
  };

  return (
    <CodeEditorWrapper>
      <ValidateMessageWrapper>
        <Text>{htmlValidateMessage && htmlValidateMessage}</Text>
      </ValidateMessageWrapper>
      <TitleWrapper>
        <Button
          width="70px"
          textColor={selectedCodeMode === 'HTML' ? 'pointColor' : 'textColor'}
          onClick={() => setSelectedCodeMode('HTML')}
        >
          HTML
        </Button>
        {/* <Button
          width="70px"
          textColor={selectedCodeMode === 'JSX' ? 'pointColor' : 'textColor'}
          onClick={() => setSelectedCodeMode('JSX')}
        >
          JSX
        </Button> */}
        <Button width="70px">SAVE</Button>
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
  );
}

const CodeEditorWrapper = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  margin: 0 0 0 2rem;
`;

const ValidateMessageWrapper = styled.div`
  margin: 0 2rem;
  min-height: 2rem;
  max-height: 2rem;
`;
