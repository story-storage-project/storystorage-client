import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextStyle = styled.div(
  ({ theme, ...props }) => `
    padding: ${props.padding ? props.padding : '0.3rem'};
    margin: ${props.margin ? props.margin : '0'};
    color: ${props.color ? props.color : theme.colors[props.textColor]};
    font-size: ${
      props.size ? theme.fontSize[props.size] : theme.fontSize.default
    };
    background-color: ${props.bg ? theme.colors.lightGray : 'none'};
    font-weight: ${props.bold ? props.bold : '300'};
    border-bottom: ${props.bolder ? '4px' : 0} solid ${theme.colors.lightGray};
  `,
);

function Text({ children, ...props }) {
  return <TextStyle {...props}>{children}</TextStyle>;
}

Text.propTypes = {
  children: PropTypes.node,
  textColor: PropTypes.oneOf([
    'textColor',
    'lightGray',
    'darkGray',
    'pointColor',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xLarge']),
  bg: PropTypes.bool,
};

Text.defaultProps = {
  children: <span />,
  textColor: 'textColor',
  size: 'medium',
  bg: false,
};

export default Text;
