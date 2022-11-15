import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.ul`
  padding: 0 0 0 0.5rem;
  margin: 0;
`;

export default function Ul({ children, ...props }) {
  return <Wrapper {...props}>{children}</Wrapper>;
}

Ul.propTypes = {
  children: PropTypes.node.isRequired,
};
