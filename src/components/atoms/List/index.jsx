import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../Text';

const Wrapper = styled.li`
  list-style: none;
  margin: 0.3rem;
  font-weight: 400;
`;

const EmojiText = styled(Text)`
  display: inline;
  font-size: 3px;
`;

export default function List({ children, ...props }) {
  return (
    <Wrapper {...props}>
      <EmojiText>◽️</EmojiText>
      {children}
    </Wrapper>
  );
}

List.propTypes = {
  children: PropTypes.node.isRequired,
};
