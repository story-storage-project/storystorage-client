import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import ImageIcon from '../../atoms/ImageIcon';
import getGoogleUrl from '../../../service/getGoogleUrl';

export default function Login() {
  const location = useLocation();
  const from = location.state?.from?.pathnames || '/';

  return (
    <Wrapper>
      <Card>
        <Head>
          <Text size="xLarge" bold>
            Sign In
          </Text>
        </Head>
        <a href={getGoogleUrl(from)}>
          <ImageIcon
            icon="google-login-logo"
            alt="google-login-icon"
            width="20rem"
            height="auto"
            pointer
          />
        </a>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  margin: 7rem 15rem 0 0;
  justify-content: center;

  @media ${props => props.theme.viewSize.laptopHalf} {
    margin: 7rem 7rem 0 0;
    height: 100%;
  }

  @media ${props => props.theme.viewSize.tablet} {
    margin: 1rem;
    height: 80vh;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30rem;
  height: 20rem;
  border-radius: 50px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 0 1rem;
  border: 1px solid ${props => props.theme.colors.pointColor};
`;

const Head = styled.div`
  margin: 2rem 0 2rem 0;
`;
