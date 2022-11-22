import React, { useContext } from 'react';
import styled from 'styled-components';
import HtmlCodeEditor from '../HtmlCodeEditor';
import CssCodeEditor from '../CssCodeEditor';
import { CodeContext } from '../../../context/CodeProvider';

export default function CodeEditor() {
  const { codeViewMode, selectMenu, page } = useContext(CodeContext);

  return (
    <Container>
      {page === 'story' ? (
        <CodeEditorContainer viewMode={codeViewMode}>
          {selectMenu !== 'CSS' ? <HtmlCodeEditor /> : <CssCodeEditor />}
        </CodeEditorContainer>
      ) : (
        <CodeEditorContainer viewMode={codeViewMode}>
          <HtmlCodeEditor />
          <CssCodeEditor />
        </CodeEditorContainer>
      )}
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
