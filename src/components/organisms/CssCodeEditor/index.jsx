import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import useCssHighLightQueryText from '../../../hooks/useCssHighLightQueryText';
import { insertTab, insertText } from '../../../utils/codeEditor';
import TextEditor from '../../molecules/TextEditor';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import validateCss from '../../../utils/cssValidate';
import { CodeContext } from '../../../context/CodeProvider';

export default function CssCodeEditor() {
  const { writeCss, css } = useContext(CodeContext);
  const [cssValidateMessage, setCssValidateMessage] = useState('');
  const [cssOriginalData, setCssOriginalData] = useState(css);
  const [cssCode, queryCss, setQueryCss] = useCssHighLightQueryText(css);
  const isClickEnter = useRef();
  const divCssTextAreaRef = useRef();

  useEffect(() => {
    if (!cssCode) return;

    const validateResultMessage = validateCss(cssCode);

    setCssValidateMessage(validateResultMessage);

    if (!validateResultMessage) {
      writeCss(cssCode);
    }
  }, [cssCode]);

  const handleCssKeyDOwn = useCallback(
    e => {
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
        <Button width="70px">CSS</Button>
        <Button width="70px">SAVE</Button>
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
