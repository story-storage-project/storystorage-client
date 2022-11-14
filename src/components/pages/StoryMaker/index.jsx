import React from 'react';
import styled from 'styled-components';

export default function StoryMaker() {
  const html = `
  <table>
	<thead>
      <tr>
        <th>&nbsp;</th>
        <th>Widget</th>
        <th>Wingding</th>
        <th>Whatsit</th>
        <th>Whirlygig</th>
      </tr>
  </thead>
  <tbody>
      <tr>
        <td>CompanyA</td>
        <td>5</td>
        <td>8</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>CompanyB</td>
  `;

  const css = `
  table, th, td {
    border: solid 1px #000;
    padding: 10px;
  }
  
  table {
      border-collapse:collapse;
      caption-side:bottom;
  }
  `;
  return (
    <Container>
      <Wrapper>
        <InputWrapper>
          <label htmlFor="margin" id="margin">
            Category
          </label>
          <input id="margin" />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="margin" id="margin">
            Element Name
          </label>
          <input id="margin" />
        </InputWrapper>
        <CodeEditorWrapper>
          <TextArea value={html} />
          <TextArea value={css} />
        </CodeEditorWrapper>
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

const InputWrapper = styled.div`
  padding: 0.3rem 0;
  label {
    display: inline-block;
    min-width: 6rem;
    padding-left: 1rem;
  }
`;

const CodeEditorWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media ${props => props.theme.viewSize.tablet} {
    flex-direction: column;
  }
`;

const TextArea = styled.textarea`
  width: 30rem;
  height: 30rem;
`;
