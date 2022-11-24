import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.details`
  summary {
    list-style: none;
  }
  summary::-webkit-details-marker {
    display: none;
    width: 100px;
  }

  & summary::before {
    display: inline-block;
    content: '▸ ';
    color: ${props => props.theme.colors.darkGray};
    width: 15px;
  }

  &[open] summary::before {
    display: inline-block;
    content: '▾ ';
    color: ${props => props.theme.colors.pointColor};
    width: 15px;
  }
`;

export default function Toggle({ summary, children, ...props }) {
  return (
    <Wrapper {...props}>
      <summary>{summary}</summary>
      {children}
    </Wrapper>
  );
}

Toggle.propTypes = {
  summary: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
