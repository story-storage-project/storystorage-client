import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import TextEditor from '../../molecules/TextEditor';
import useHtmlHighLightQueryText from '../../../hooks/useHtmlHighLightQueryText';
import {
  getCaretPosition,
  setCaretPosition,
  insertTab,
  insertText,
} from '../../../utils/codeEditor';
import {
  validateHtml,
  convertHtmlToJsx,
  convertJsxToHtml,
} from '../../../utils/htmlValidate';
import {
  html,
  selectCodeType,
  isClickedSaveButton,
  codeViewMode,
} from '../../../store/codeState';

export default function HtmlCodeEditor({ isLogin }) {
  const codeMode = useRecoilValue(codeViewMode);
  const [selectedCodeType, setSelectCodeType] = useRecoilState(selectCodeType);
  const [isClickSaveButton, setIsClickedSaveButton] =
    useRecoilState(isClickedSaveButton);
  const [htmlValidateWarningMessage, setHtmlValidateWarningMessage] =
    useState('');

  const [htmlData, parsingHtml] = useRecoilState(html);
  const [htmlCode, queryHtml, setQueryHtml] =
    useHtmlHighLightQueryText(htmlData);
  const [htmlTextAreaData, setHtmlTextAreaData] = useState(htmlCode);

  const divHtmlTextAreaRef = useRef();
  const codeOption = useRef({
    prevKeyCode: '',
    autoBracketMode: false,
    cursorPosition: 0,
    isClickEnter: false,
    isInsideBracket: false,
    dataInTheBracket: '',
  }).current;

  useEffect(() => {
    if (!htmlCode) return;
    setHtmlValidateWarningMessage('');

    const validateResultMessage = validateHtml(htmlCode, selectedCodeType);

    return validateResultMessage
      ? setHtmlValidateWarningMessage(validateResultMessage)
      : parsingHtml(convertJsxToHtml(htmlCode));
  }, [htmlCode]);

  const handleClickMenu = e => {
    const menuTitle = e.target.value;
    setSelectCodeType(menuTitle);

    switch (menuTitle) {
      case 'CSS':
        return;
      case 'HTML': {
        const convertData = convertJsxToHtml(htmlCode);
        setHtmlTextAreaData(convertData);
        return setQueryHtml(convertData);
      }
      case 'JSX': {
        const convertData = convertHtmlToJsx(htmlCode);
        setHtmlTextAreaData(convertData);
        return setQueryHtml(convertHtmlToJsx(htmlCode));
      }
      default:
    }
  };

  const handleHtmlKeyDown = useCallback(
    e => {
      if (e.key === 'v' && codeOption.prevKeyCode === 91) {
        return insertText(
          e.currentTarget,
          e.currentTarget.selectionStart,
          '   ',
        );
      }

      codeOption.prevKeyCode = e.keyCode;

      // eslint-disable-next-line default-case
      switch (e.key) {
        case 'Tab': {
          const htmlValue = insertTab(
            e,
            e.currentTarget,
            e.currentTarget.selectionStart,
          );

          setHtmlTextAreaData(() => htmlValue);
          setQueryHtml(htmlValue);
          return;
        }
        case 'Enter': {
          codeOption.isClickEnter = true;
          return setQueryHtml(htmlTextAreaData);
        }
        case '<': {
          codeOption.isInsideBracket = true;
          codeOption.dataInTheBracket = '';
          return setQueryHtml(htmlTextAreaData);
        }
      }

      if (codeOption.isInsideBracket) {
        // eslint-disable-next-line default-case
        switch (e.key) {
          case '/': {
            codeOption.isInsideBracket = false;
            codeOption.dataInTheBracket = '';

            return;
          }
          case 'Backspace': {
            codeOption.dataInTheBracket = codeOption.dataInTheBracket.slice(
              0,
              -1,
            );
            return;
          }
        }

        if (e.key.length > 1) {
          return;
        }

        codeOption.dataInTheBracket += e.key;
      }

      if (e.key === '>' && codeOption.dataInTheBracket) {
        const newValue = insertText(
          e.currentTarget,
          e.currentTarget.selectionStart,
          `</${codeOption.dataInTheBracket}`,
        );

        const caretPosition = getCaretPosition(
          e.currentTarget,
          e.currentTarget.selectionStart,
        );

        setHtmlTextAreaData(newValue);
        setQueryHtml(newValue);

        codeOption.cursorPosition = caretPosition;
        codeOption.dataInTheBracket = '';
        codeOption.autoBracketMode = true;
        codeOption.isInsideBracket = false;
      }

      setQueryHtml(htmlTextAreaData);
    },
    [htmlTextAreaData, codeOption, htmlCode],
  );

  const handleHtmlTextChange = useCallback(
    e => {
      const { value } = e.target;
      setHtmlTextAreaData(value);

      if (codeOption.autoBracketMode) {
        codeOption.autoBracketMode = false;
        setCaretPosition(e.target, codeOption.cursorPosition + 1);
        e.target.focus();
      }

      if (codeOption.isClickEnter) {
        setQueryHtml(`${value}\n`);
        codeOption.isClickEnter = false;
      } else {
        setQueryHtml(value);
      }
    },

    [codeOption],
  );

  const handleHtmlScroll = e => {
    divHtmlTextAreaRef.current.scrollTop = e.target.scrollTop;
    divHtmlTextAreaRef.current.selectionDirection = e.target.selectionDirection;
  };

  return (
    <CodeEditorWrapper>
      <ValidateMessageWrapper>
        <Text>{htmlValidateWarningMessage && htmlValidateWarningMessage}</Text>
      </ValidateMessageWrapper>
      <TitleWrapper>
        <MenuButton
          value="HTML"
          textColor={selectedCodeType === 'HTML' ? 'pointColor' : 'textColor'}
          onClick={handleClickMenu}
        >
          HTML
        </MenuButton>
        <MenuButton
          value="JSX"
          textColor={selectedCodeType === 'JSX' ? 'pointColor' : 'textColor'}
          onClick={handleClickMenu}
        >
          JSX
        </MenuButton>
        {codeMode === 'allInOne' && (
          <>
            <MenuButton
              value="CSS"
              textColor={
                selectedCodeType === 'CSS' ? 'pointColor' : 'textColor'
              }
              onClick={handleClickMenu}
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
        value={htmlTextAreaData}
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
