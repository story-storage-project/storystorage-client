import React from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import ImageIcon from '../../atoms/ImageIcon';

export default function Login() {
  return (
    <Wrapper>
      <Card>
        <Head>
          <Text size="xLarge" bold>
            Sign In
          </Text>
        </Head>
        <ImageIcon
          icon="google-login-logo"
          alt="google-login-icon"
          width="20rem"
          height="auto"
        />
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30rem;
  height: 20rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 0 1rem;
`;

const Head = styled.div`
  margin: 2rem 0 2rem 0;
`;
