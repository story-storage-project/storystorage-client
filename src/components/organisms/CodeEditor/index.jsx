import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import HtmlCodeEditor from '../HtmlCodeEditor';
import CssCodeEditor from '../CssCodeEditor';
import { codeViewMode, page, selectCodeType } from '../../../store/codeState';

export default function CodeEditor({ isLogin }) {
  const currentPage = useRecoilValue(page);
  const [editorMode, setEditorMode] = useRecoilState(codeViewMode);
  const selectedCodeType = useRecoilValue(selectCodeType);

  useEffect(() => {
    if (currentPage === 'story') {
      setEditorMode('allInOne');
    } else {
      setEditorMode('partition');
    }
  }, [currentPage]);

  useEffect(() => {
    const handleResize = () => {
      console.log(currentPage, window.innerWidth);
      if (currentPage === 'story-maker' && window.innerWidth < 1375) {
        setEditorMode('allInOne');
      }
      if (currentPage === 'story-maker' && window.innerWidth > 1375) {
        setEditorMode('partition');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container editorFlexType={editorMode}>
      {currentPage === 'story' || editorMode === 'allInOne' ? (
        <CodeEditorContainer viewMode={editorMode}>
          {selectedCodeType === 'CSS' ? (
            <CssCodeEditor isLogin={isLogin} />
          ) : (
            <HtmlCodeEditor isLogin={isLogin} />
          )}
        </CodeEditorContainer>
      ) : (
        <CodeEditorContainer viewMode={editorMode}>
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
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  @media ${props => props.theme.viewSize.tablet} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;
