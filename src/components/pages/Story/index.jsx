import React from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';

export default function Story() {
  return (
    <Container>
      <Wrapper>
        <Text size="xLarge">Button</Text>
        <P>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galle
        </P>
        <Preview>
          <Button margin="0.5rem" borderRadius="20rem">
            Button
          </Button>
          <Button margin="0.5rem" borderRadius="20rem" bg textColor="lightGray">
            Button
          </Button>
          <Button margin="0.5rem" borderRadius="20rem" bg textColor="darkgray">
            Button
          </Button>
        </Preview>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 1.5rem;

  @media ${props => props.theme.viewSize.mobile} {
    padding: 0;
  }
`;

const Wrapper = styled.div`
  padding: 3rem 0;

  @media ${props => props.theme.viewSize.mobile} {
    padding: 2rem 0;
  }
`;

const P = styled.p`
  margin: 1rem 0 2rem 0;
  padding: 0.3rem;
`;

const Preview = styled.div`
  margin-bottom: 2rem;
`;
