import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyleInput = styled.input`
  font-family: 'Roboto', sans-serif;
  color: #333;
  padding: 0.5rem;
  margin: 0 auto;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border-inline: 1px solid ${props => props.theme.colors.pointColor};
  min-width: 15rem;
  max-width: 15rem;
  min-height: 1rem;
  max-height: 1rem;
  display: block;
  border: 0.3px solid;
  outline: 0;

  &:hover {
    /* border: none; */
    border: 1px solid ${props => props.theme.colors.pointColor};
    background-color: ${props => props.theme.colors.lightGray};
  }
`;

export default function Input({ value, ...props }) {
  return <StyleInput value={value} {...props} />;
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
};
