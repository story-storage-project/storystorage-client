import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button(
  ({ theme, ...props }) => `
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  justify-content: center;
  text-decoration: none;
  box-sizing: border-box;
  transition: background-color 250ms ease-out, color 250ms ease-out,
    border-color 250ms ease-out;
  border: 0.0625em solid ${
    props.border ? theme.colors.darkGray : 'transparent'
  };
  border-radius: ${props.borderRadius ? props.borderRadius : 0};
  background-color: ${props.bg ? theme.colors[props.bg] : 'transparent'};
  padding: ${props.padding ? props.padding : '0.5rem'};
  margin: ${props.margin ? props.margin : 0.3};
  color: ${
    props.textColor ? theme.colors[props.textColor] : theme.colors.textColor
  }
`,
);

function Button({ children, bg, ...props }) {
  return (
    <StyledButton bg={bg} {...props}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  bg: PropTypes.string,
};

Button.defaultProps = {
  textColor: 'textColor',
  bg: 'lightGray',
};

export default Button;
