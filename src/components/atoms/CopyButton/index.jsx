import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => (props.width ? props.width : '3rem')};
  height: ${props => (props.height ? props.height : '3rem')};
  cursor: ${props => (props.pointer ? 'pointer' : 'default')};
  /* border: 1px solid ${props => props.theme.colors.lightGray}; */
  margin: ${props => (props.margin ? props.margin : 0)};
  border-radius: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.pointColor};
    color: white;
  }
`;

function Icon({ children, ...props }) {
  return <Wrapper {...props}>{children}</Wrapper>;
}

Icon.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Icon;
