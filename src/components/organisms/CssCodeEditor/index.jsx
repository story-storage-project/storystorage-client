import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import useCssHighLightQueryText from '../../../hooks/useCssHighLightQueryText';
import TextEditor from '../../molecules/TextEditor';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { insertTab, insertText } from '../../../utils/codeEditor';
import validateCss from '../../../utils/cssValidate';
import {
  css,
  page,
  isClickedSaveButton,
  selectCodeType,
} from '../../../store/codeState';

export default function CssCodeEditor({ isLogin }) {
  const currentPageName = useRecoilValue(page);
  const [selectedCodeType, setSelectedCodeType] =
    useRecoilState(selectCodeType);
  const [isClickSaveButton, setIsClickedSaveButton] =
    useRecoilState(isClickedSaveButton);
  const [cssValidateWarningMessage, setCssValidateWarningMessage] =
    useState('');

  const [cssData, parsingCss] = useRecoilState(css);
  const [cssCode, queryCss, setQueryCss] = useCssHighLightQueryText(cssData);
  const [cssTextAreaData, setCssTextAreaData] = useState(cssData);

  const divCssTextAreaRef = useRef();
  const codeOption = useRef({
    prevKeyCode: '',
    isClickEnter: false,
  }).current;

  useEffect(() => {
    if (!cssCode) return;

    const validateResultMessage = validateCss(cssCode);

    return validateResultMessage
      ? setCssValidateWarningMessage(validateResultMessage)
      : parsingCss(cssCode);
  }, [cssCode]);

  const handleClickMenu = e => {
    const menuTitle = e.target.value;
    setSelectedCodeType(menuTitle);
  };

  const handleCssKeyDOwn = useCallback(
    e => {
      if (e.key === 'v' && codeOption.prevKeyCode === 91) {
        return insertText(
          e.currentTarget,
          e.currentTarget.selectionStart,
          '   ',
        );
      }

      codeOption.prevKeyCode = e.keyCode;
      setQueryCss(cssTextAreaData);

      // eslint-disable-next-line default-case
      switch (e.key) {
        case 'Tab': {
          const cssValue = insertTab(
            e,
            e.currentTarget,
            e.currentTarget.selectionStart,
          );

          setCssTextAreaData(cssValue);
          setQueryCss(cssValue);
          return;
        }
        case 'Enter':
          codeOption.isClickEnter = true;
          return;
        case '{' || '`': {
          const newValue = insertText(
            e.currentTarget,
            e.currentTarget.selectionStart,
            e.key === '{' ? '}' : '`',
          );

          setCssTextAreaData(newValue);
          setQueryCss(newValue);
        }
      }
    },
    [cssTextAreaData, cssCode, queryCss],
  );

  const handleCssTextChange = useCallback(
    e => {
      const { value } = e.target;
      setCssTextAreaData(value);

      if (codeOption.isClickEnter) {
        setQueryCss(`${value}\n`);
        codeOption.isClickEnter = false;
      } else {
        setQueryCss(value);
      }
    },
    [cssTextAreaData, queryCss],
  );

  const handleCssScroll = e => {
    divCssTextAreaRef.current.scrollTop = e.target.scrollTop;
    divCssTextAreaRef.current.selectionDirection = e.target.selectionDirection;
  };

  return (
    <CodeEditorWrapper>
      <ValidateMessageWrapper>
        <Text>{cssValidateWarningMessage && cssValidateWarningMessage}</Text>
      </ValidateMessageWrapper>
      <TitleWrapper>
        {currentPageName === 'story' && (
          <>
            <MenuButton
              value="HTML"
              textColor={
                selectedCodeType === 'HTML' ? 'pointColor' : 'textColor'
              }
              onClick={handleClickMenu}
            >
              HTML
            </MenuButton>
            <MenuButton
              value="JSX"
              textColor={
                selectedCodeType === 'JSX' ? 'pointColor' : 'textColor'
              }
              onClick={handleClickMenu}
            >
              JSX
            </MenuButton>
          </>
        )}
        <MenuButton
          value="CSS"
          textColor={selectedCodeType === 'CSS' ? 'pointColor' : 'textColor'}
          onClick={handleClickMenu}
        >
          CSS
        </MenuButton>
        {currentPageName === 'story' && isLogin && (
          <MenuButton
            onClick={() => setIsClickedSaveButton(!isClickSaveButton)}
          >
            SAVE
          </MenuButton>
        )}
      </TitleWrapper>
      <TextEditor
        title="CSS"
        value={cssTextAreaData}
        onChange={handleCssTextChange}
        onKeyDown={handleCssKeyDOwn}
        placeholder="Please enter CSS code"
        onScroll={handleCssScroll}
        ref={divCssTextAreaRef}
      >
        {queryCss}
      </TextEditor>
    </CodeEditorWrapper>
  );
}

CssCodeEditor.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

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

const MenuButton = styled(Button)`
  width: 70px;
`;
