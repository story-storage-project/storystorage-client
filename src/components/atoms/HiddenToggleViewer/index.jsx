import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.span(
  ({ ...props }) => `
    display: ${props.reverse && 'none'};
    @media ${props.theme.viewSize[props.hiddenView]} {
      display: ${
        (props.reverse && 'block') || (!props.toggle === true && 'none')
      };
    }
`,
);

export default function HiddenToggleViewer({ children, ...props }) {
  return <Wrapper {...props}>{children}</Wrapper>;
}

HiddenToggleViewer.propTypes = {
  children: PropTypes.node.isRequired,
};
