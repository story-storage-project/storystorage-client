import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Wrapper = styled.img`
  display: inline-block;
  width: ${props => (props.width ? props.width : '1rem')};
  height: ${props => (props.height ? props.height : '1rem')};
  cursor: ${props => (props.pointer ? 'pointer' : 'default')};

  ${props => {
    if (props.border) {
      return css`
        border-radius: 50%;
        padding: 5px;
        border: 1px solid ${props.theme.colors.darkGray};
      `;
    }
  }}

  ${props => {
    if (props.hover) {
      return css`
        padding: 3px;
        transition: all 0.1s ease-in-out;
        &:hover {
          transform: scale(1.3);
        }
      `;
    }
  }}
`;

function ImageIcon({ icon, alt, ...props }) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const png = require(`../../../assets/${icon}.png`);

  return <Wrapper src={png} alt={alt} {...props} />;
}

ImageIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageIcon;
