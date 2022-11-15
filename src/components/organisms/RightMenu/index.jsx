import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';

export default function RightMenu() {
  return (
    <Container>
      <Nav>
        <Text padding="0.7rem 1rem" textColor="pointColor" bold bolder>
          Code
        </Text>
        <Text padding="0.7rem 1rem">Option</Text>
      </Nav>
      <Code>
        <Head>
          <Heading>
            <Text padding="0.7rem 1rem" size="large" margin="1rem 0">
              JSX
            </Text>
            <Button
              textColor="darkGray"
              bg
              borderRadius="1rem"
              margin="0 0 0 1rem"
            >
              Copy
            </Button>
          </Heading>
          <CheckBox>
            <input id="html" type="radio" />
            <label htmlFor="html" id="html">
              HTML
            </label>
            <input id="html" checked type="radio" />
            <label htmlFor="JSX" id="JSX">
              JSX
            </label>
          </CheckBox>
        </Head>
        <div>{'<button>Button</button>'}</div>
      </Code>
      <Code>
        <Head>
          <Heading>
            <Text padding="0.7rem 1rem" size="large" margin="1rem 0">
              CSS
            </Text>
            <Button
              textColor="darkGray"
              bg
              borderRadius="1rem"
              margin="0 0 0 1rem"
            >
              Copy
            </Button>
          </Heading>
          <CheckBox>
            <input id="html" checked type="radio" />
            <label htmlFor="css" id="css">
              CSS
            </label>
            <input id="html" type="radio" />
            <label htmlFor="sc" id="sc">
              Styled Components
            </label>
          </CheckBox>
        </Head>
        <div>
          {`.btn {
            width: 10rem;
            height: 3rem;
            margin: 0px;
            font-size: 20px;
            color: #2c2c2c;
          }
          `}
        </div>
      </Code>
      {/* <Nav>
        <Text padding="0.7rem 1rem">Code</Text>
        <Text padding="0.7rem 1rem" textColor="pointColor" bold bolder>
          Option
        </Text>
      </Nav>
      <Code>
        <Head>
          <Heading>
            <Text padding="0.7rem 1rem" size="large" margin="1rem 0">
              Button
            </Text>
          </Heading>
        </Head>
        <InputWrapper>
          <label id="value">valu</label>
          <input id="value" />
        </InputWrapper>
        <Head>
          <Heading>
            <Text padding="0.7rem 1rem" size="large" margin="1rem 0">
              CSS
            </Text>
          </Heading>
        </Head>
        <InputWrapper>
          <label id="width">width</label>
          <input id="width" />
        </InputWrapper>
        <InputWrapper>
          <label id="height">height</label>
          <input id="height" />
        </InputWrapper>
        <InputWrapper>
          <label id="margin">margin</label>
          <input id="margin" />
        </InputWrapper>
      </Code> */}
    </Container>
  );
}

const Container = styled.div`
  padding: 4rem 1.5rem;
  background-color: ${props => props.theme.colors.rightMenu};
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
`;

const Code = styled.div``;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CheckBox = styled.div``;

const CodeWrapper = styled.div``;

const InputWrapper = styled.div`
  padding: 0.7rem 0;
  label {
    display: inline-block;
    min-width: 4rem;
    padding-left: 1rem;
  }
`;
