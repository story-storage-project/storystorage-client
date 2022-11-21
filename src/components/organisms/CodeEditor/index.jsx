import React, { useContext } from 'react';
import styled from 'styled-components';
import HtmlCodeEditor from '../HtmlCodeEditor';
import CssCodeEditor from '../CssCodeEditor';
import { CodeContext } from '../../../context/CodeProvider';

export default function CodeEditor() {
  const { codeViewMode } = useContext(CodeContext);

  return (
    <Container>
      <CodeEditorContainerAbsolute viewMode={codeViewMode}>
        <HtmlCodeEditor style={{ position: 'relative' }} />
        <CssCodeEditor style={{ position: 'absolute' }} />
      </CodeEditorContainerAbsolute>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  width: inherit;
  height: auto;
`;

const CodeEditorContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${props => props.viewMode};
  justify-content: center;
  align-items: stretch;
  position: relative;

  width: 100%;
  height: 100%;

  @media ${props => props.theme.viewSize.tablet} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
  }
`;

const CodeEditorContainerAbsolute = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${props => props.viewMode};
  justify-content: center;
  align-items: stretch;

  width: 100%;
  height: 100%;

  @media ${props => props.theme.viewSize.tablet} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
  }
`;

const HtmlCodeEditorWrapper = styled(HtmlCodeEditor)`
  position: relative;
`;
const CssCodeEditorWrapper = styled(CssCodeEditor)`
  position: absolute;
`;
