import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import Text from '../../atoms/Text';
import ImageIcon from '../../atoms/ImageIcon';
import { uiTheme } from '../../../store/globalState';

export default function Footer() {
  const theme = useRecoilValue(uiTheme);
  return (
    <FooterStyled>
      <Text textColor={theme === 'lightTheme' ? 'darkGray' : 'lightGray'}>
        Story Storage by alex © 2022
      </Text>{' '}
      <ImageIcon
        icon="GitHub-Mark-32px"
        alt="github-logo"
        pointer
        border
        invert={theme !== 'lightTheme'}
      />
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
