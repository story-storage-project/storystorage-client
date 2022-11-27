import React from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';

export default function ServerError() {
  return (
    <Container>
      <Wrapper>
        <Text size="xLarge" bold padding="0">
          Internal Server Error
        </Text>
        <Text size="xLarge" bold padding="0">
          500 🌨
        </Text>
        <Text>
          Oh no! something went wrong <br />
          {`Please Try to refresh this page `}
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
