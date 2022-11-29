import React from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import ImageIcon from '../../atoms/ImageIcon';

export default function Footer() {
  return (
    <FooterStyled>
      <Text textColor="darkGray">Story Storage by alex © 2022</Text>{' '}
      <ImageIcon icon="GitHub-Mark-32px" alt="github-logo" pointer border />
    </FooterStyled>
  );
}

const FooterStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5rem 5rem 5rem 0;
  width: 100%;
  height: 50px;
`;
