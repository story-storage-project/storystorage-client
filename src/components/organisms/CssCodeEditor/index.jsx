import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import TextEditor from '../../molecules/TextEditor';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import {
  css,
  page,
  isClickedSaveButton,
  selectCodeType,
} from '../../../store/codeState';
import useCssHighLightQueryText from '../../../hooks/useCssHighLightQueryText';
import { insertTab, insertText } from '../../../utils/codeEditor';
import validateCss from '../../../utils/cssValidate';

export default function CssCodeEditor({ userInfo, isLogin, setUserStoryList }) {
  const [cssData, setCssCode] = useRecoilState(css);
  const currentPage = useRecoilValue(page);
  const [isClickSaveButton, setIsClickedSaveButton] =
    useRecoilState(isClickedSaveButton);
  const [selectedCodeType, setSelectedCodeType] =
    useRecoilState(selectCodeType);

  const [cssValidateMessage, setCssValidateMessage] = useState('');
  const [cssOriginalData, setCssOriginalData] = useState(cssData);
  const [cssCode, queryCss, setQueryCss] = useCssHighLightQueryText(cssData);
  const [prevKeyCode, setPrevKeyCode] = useState('');

  const isClickEnter = useRef();
  const divCssTextAreaRef = useRef();

  useEffect(() => {
    if (!cssCode) return;

    const validateResultMessage = validateCss(cssCode);

    setCssValidateMessage(validateResultMessage);

    if (!validateResultMessage) {
      setCssCode(cssCode);
    }
  }, [cssCode]);

  const menuClickHandle = e => {
    const menuTitle = e.target.value;
    setSelectedCodeType(menuTitle);
  };

  const handleCssKeyDOwn = useCallback(
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
      setQueryCss(cssOriginalData);
    },
    [cssOriginalData, cssCode, queryCss],
  );

  const handleCssTextChange = useCallback(
    e => {
      const { value } = e.target;
      setCssOriginalData(value);

      if (isClickEnter.current) {
        setQueryCss(`${value}\n`);
        isClickEnter.current = false;
      } else {
        setQueryCss(value);
      }
    },
    [cssOriginalData, queryCss],
  );

  const handleCssScroll = e => {
    divCssTextAreaRef.current.scrollTop = e.target.scrollTop;
    divCssTextAreaRef.current.selectionDirection = e.target.selectionDirection;
  };

  return (
    <CodeEditorWrapper>
      <ValidateMessageWrapper>
        <Text>{cssValidateMessage && cssValidateMessage}</Text>
      </ValidateMessageWrapper>
      <TitleWrapper>
        {currentPage === 'story' && (
          <>
            <MenuButton
              value="HTML"
              textColor={
                selectedCodeType === 'HTML' ? 'pointColor' : 'textColor'
              }
              onClick={menuClickHandle}
            >
              HTML
            </MenuButton>
            <MenuButton
              value="JSX"
              textColor={
                selectedCodeType === 'JSX' ? 'pointColor' : 'textColor'
              }
              onClick={menuClickHandle}
            >
              JSX
            </MenuButton>
          </>
        )}
        <MenuButton
          value="CSS"
          textColor={selectedCodeType === 'CSS' ? 'pointColor' : 'textColor'}
          onClick={menuClickHandle}
        >
          CSS
        </MenuButton>
        {currentPage === 'story' && isLogin && (
          <MenuButton
            onClick={() => setIsClickedSaveButton(!isClickSaveButton)}
          >
            SAVE
          </MenuButton>
        )}
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
  );
}

CssCodeEditor.propTypes = {
  userInfo: PropTypes.object.isRequired,
  isLogin: PropTypes.bool.isRequired,
  setUserStoryList: PropTypes.func.isRequired,
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
