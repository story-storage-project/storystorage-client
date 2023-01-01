import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextEditor = forwardRef((props, ref) => {
  return (
    <Wrapper>
      <InvisibleTextArea
        spellCheck="false"
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder}
        onScroll={props.onScroll}
      />
      <DivTextArea ref={ref} unselectable="on">
        {props.children}
      </DivTextArea>
    </Wrapper>
  );
});

TextEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  onScroll: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

TextEditor.defaultProps = {
  value: '',
};

const Wrapper = styled.div`
  box-sizing: content-box;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 2rem 2rem 2rem;
  flex: 1;

  @media (min-width: 2001px) {
    width: 700px;
    height: 700px;
  }

  @media (min-width: 1501px) and (max-width: 2000px) {
    width: 600px;
    height: 600px;
  }

  @media (min-width: 1375px) and (max-width: 1500px) {
    width: 500px;
    height: 600px;
  }

  @media (min-width: 901px) and (max-width: 1374px) {
    width: 600px;
    height: 600px;
  }

  @media (min-width: 901px) and (max-width: 1100px) {
    width: 600px;
    height: 600px;
  }

  @media (min-width: 801px) and (max-width: 900px) {
    width: 500px;
    height: 350px;
  }

  @media ${props => props.theme.codeEditorSize.tablet} {
    width: 500px;
    height: 350px;
  }

  @media (max-width: 500px) {
    width: 400px;
    height: 300px;
  }

  @media ${props => props.theme.codeEditorSize.mobile} {
    width: 300px;
    height: 300px;
  }
`;

const InvisibleTextArea = styled.textarea`
  display: block;
  position: absolute;
  overflow-x: scroll;
  white-space: break-spaces;
  word-wrap: break-word;
  word-break: break-all;
  z-index: 2;
  box-sizing: border-box;

  width: inherit;
  height: inherit;
  margin: 0;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.colors.lightGray};
  box-sizing: border-box;
  outline: none;

  resize: none;
  line-height: 1.2;
  letter-spacing: 1px;

  font-family: 'Mukta', sans-serif;
  font-size: ${props => props.theme.fontSize.code};
  font-weight: 300;
  color: transparent;
  background-color: transparent;
  caret-color: black;

  &:hover {
    border: 1px solid ${props => props.theme.colors.pointColor};
  }
`;

const DivTextArea = styled.div`
  position: absolute;
  overflow-wrap: break-word;
  white-space: break-spaces;
  word-wrap: break-word;
  word-break: break-all;

  box-sizing: border-box;
  outline: none;

  overflow-y: scroll;

  width: inherit;
  height: inherit;
  margin: 0;
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 10px;
  box-sizing: border-box;

  letter-spacing: 1px;
  line-height: 1.2;

  font-family: 'Mukta', sans-serif;
  font-size: ${props => props.theme.fontSize.code};
  font-weight: 300;
  background-color: ${props => props.theme.colors.codeTheme.backgrounColor};
`;

export default TextEditor;
