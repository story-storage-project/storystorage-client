import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import HtmlCodeEditor from '../HtmlCodeEditor';
import CssCodeEditor from '../CssCodeEditor';
import { codeViewMode, page, selectCodeType } from '../../../store/codeState';

export default function CodeEditor({ isLogin }) {
  const currentPage = useRecoilValue(page);
  const editorFlexType = useRecoilValue(codeViewMode);
  const selectedCodeType = useRecoilValue(selectCodeType);

  return (
    <Container editorFlexType={editorFlexType}>
      {currentPage === 'story' ? (
        <CodeEditorContainer viewMode={editorFlexType}>
          {selectedCodeType === 'CSS' ? (
            <CssCodeEditor isLogin={isLogin} />
          ) : (
            <HtmlCodeEditor isLogin={isLogin} />
          )}
        </CodeEditorContainer>
      ) : (
        <CodeEditorContainer viewMode={editorFlexType}>
          <HtmlCodeEditor isLogin={isLogin} />
          <CssCodeEditor isLogin={isLogin} />
        </CodeEditorContainer>
      )}
    </Container>
  );
}

CodeEditor.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

const Container = styled.div`
  box-sizing: border-box;
  width: inherit;
  height: auto;

  @media ${props => props.theme.viewSize.laptopHalf} {
    margin-top: ${props => (props.editorFlexType === 'row' ? 0 : '3rem')};
  }

  @media ${props => props.theme.viewSize.laptop} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
  }
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

  @media ${props => props.theme.viewSize.laptop} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;
