import React from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';

export default function NotFound() {
  return (
    <Container>
      <Wrapper>
        <Text size="xLarge" bold padding="0">
          Not Found
        </Text>
        <Text size="xLarge" bold padding="0">
          404 🥲
        </Text>
        <Text>
          Oh no! Page not found. <br />
          {`You've found a page that doesn't exist`}
        </Text>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 0 1.5rem;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10rem 5rem;

  @media ${props => props.theme.viewSize.mobile} {
    padding: 2rem 1rem;
  }
`;
