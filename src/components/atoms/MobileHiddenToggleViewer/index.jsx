import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.span(
  ({ ...props }) => `
    display: ${props.reverse && 'none'};
    @media ${props.theme.viewSize.mobile} {
      display: ${(props.reverse && 'block') || (!props.open && 'none')};
    }
`,
);

export default function MobileHiddenToggleViewer({ children, ...props }) {
  return <Wrapper {...props}>{children}</Wrapper>;
}

MobileHiddenToggleViewer.propTypes = {
  children: PropTypes.node.isRequired,
};
