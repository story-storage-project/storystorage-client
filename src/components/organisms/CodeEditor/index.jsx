import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import HtmlCodeEditor from '../HtmlCodeEditor';
import CssCodeEditor from '../CssCodeEditor';
import { codeViewMode, page, selectCodeType } from '../../../store/codeState';

export default function CodeEditor({ userInfo, isLogin, setUserStoryList }) {
  const currentPage = useRecoilValue(page);
  const editorFlexType = useRecoilValue(codeViewMode);
  const selectedCodeType = useRecoilValue(selectCodeType);

  return (
    <Container>
      {currentPage === 'story' ? (
        <CodeEditorContainer viewMode={editorFlexType}>
          {selectedCodeType === 'CSS' ? (
            <CssCodeEditor
              userInfo={userInfo}
              isLogin={isLogin}
              setUserStoryList={setUserStoryList}
            />
          ) : (
            <HtmlCodeEditor
              userInfo={userInfo}
              isLogin={isLogin}
              setUserStoryList={setUserStoryList}
            />
          )}
        </CodeEditorContainer>
      ) : (
        <CodeEditorContainer viewMode={editorFlexType}>
          <HtmlCodeEditor
            userInfo={userInfo}
            isLogin={isLogin}
            setUserStoryList={setUserStoryList}
          />
          <CssCodeEditor
            userInfo={userInfo}
            isLogin={isLogin}
            setUserStoryList={setUserStoryList}
          />
        </CodeEditorContainer>
      )}
    </Container>
  );
}

CodeEditor.propTypes = {
  userInfo: PropTypes.object.isRequired,
  isLogin: PropTypes.bool.isRequired,
  setUserStoryList: PropTypes.func.isRequired,
};

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
  }
`;
