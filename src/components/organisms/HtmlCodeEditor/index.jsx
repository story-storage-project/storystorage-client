import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue } from 'recoil';
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
import {
  validateHtml,
  convertHtmlToJsx,
  convertJsxToHtml,
} from '../../../utils/htmlValidate';
import {
  html,
  page,
  selectCodeType,
  isClickedSaveButton,
} from '../../../store/codeState';

export default function HtmlCodeEditor({ isLogin }) {
  const [htmlData, setHtmlCode] = useRecoilState(html);
  const currentPage = useRecoilValue(page);
  const [selectedCodeType, setSelectCodeType] = useRecoilState(selectCodeType);
  const [isClickSaveButton, setIsClickedSaveButton] =
    useRecoilState(isClickedSaveButton);

  const [htmlValidateMessage, setHtmlValidateMessage] = useState('');

  const divHtmlTextAreaRef = useRef();
  const [htmlBracket, setHtmlBracket] = useState({
    isInside: false,
    data: '',
  });
  const [htmlOriginalData, setHtmlOriginalData] = useState(htmlData);
  const [htmlCode, queryHtml, setQueryHtml] =
    useHtmlHighLightQueryText(htmlData);
  const [htmlcursorPosition, setHtmlCursorPosition] = useState();
  const [autoHtmlBracketMode, setAutoHtmlBracketMode] = useState(false);

  const [prevKeyCode, setPrevKeyCode] = useState('');
  const isClickEnter = useRef();

  useEffect(() => {
    if (!htmlCode) return;

    const validateResultMessage = validateHtml(htmlCode, selectedCodeType);

    setHtmlValidateMessage(validateResultMessage);

    if (!validateResultMessage) {
      setHtmlCode(convertJsxToHtml(htmlCode));
    }
  }, [htmlCode]);

  const menuClickHandle = e => {
    const menuTitle = e.target.value;
    setSelectCodeType(menuTitle);

    if (menuTitle === 'CSS') return;

    if (menuTitle === 'HTML') {
      setQueryHtml(convertJsxToHtml(htmlCode));
    } else {
      setQueryHtml(convertHtmlToJsx(htmlCode));
    }
  };

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
        <MenuButton
          value="HTML"
          textColor={selectCodeType === 'HTML' ? 'pointColor' : 'textColor'}
          onClick={menuClickHandle}
        >
          HTML
        </MenuButton>
        <MenuButton
          value="JSX"
          textColor={selectCodeType === 'JSX' ? 'pointColor' : 'textColor'}
          onClick={menuClickHandle}
        >
          JSX
        </MenuButton>
        {currentPage === 'story' && (
          <>
            <MenuButton
              value="CSS"
              textColor={selectCodeType === 'CSS' ? 'pointColor' : 'textColor'}
              onClick={menuClickHandle}
            >
              CSS
            </MenuButton>
            {isLogin && (
              <MenuButton
                onClick={() => setIsClickedSaveButton(!isClickSaveButton)}
              >
                SAVE
              </MenuButton>
            )}
          </>
        )}
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

HtmlCodeEditor.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

const CodeEditorWrapper = styled.div``;

const ValidateMessageWrapper = styled.div`
  margin: 0 2rem;
  min-height: 2rem;
  max-height: 2rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  margin: 0 0 0 2rem;
`;

const MenuButton = styled(Button)`
  width: 70px;
`;
