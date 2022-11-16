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
        wrap="hard"
        cols="20"
        rows="3"
      />
      <DivTextArea ref={ref} unselectable="on">
        {props.children}
      </DivTextArea>
    </Wrapper>
  );
});

TextEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  onScroll: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const Wrapper = styled.div`
  box-sizing: content-box;
  position: relative;
  width: 50%;
  height: 100%;
  margin: 2rem;

  @media ${props => props.theme.viewSize.tablet} {
    width: 90%;
    height: 100vh;
    flex-shrink: 1;
  }
`;

const InvisibleTextArea = styled.textarea`
  display: block;
  position: absolute;
  overflow-wrap: break-word;
  white-space: break-spaces;
  word-wrap: break-word;
  word-break: break-all;
  z-index: 2;
  box-sizing: border-box;

  width: 100%;
  height: 80%;
  margin: 0;
  padding: 1rem;
  border-radius: 1rem;
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

  overflow: scroll;
  overflow-y: scroll;

  width: 100%;
  height: 80%;
  margin: 0;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  box-sizing: border-box;

  letter-spacing: 1px;
  line-height: 1.2;

  font-family: 'Mukta', sans-serif;
  font-size: ${props => props.theme.fontSize.code};
  font-weight: 300;
  background-color: ${props => props.theme.codeThemeBright.backgrounColor};
`;

export default TextEditor;
