import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Story from '../../organisms/Story';
import Text from '../../atoms/Text';

export default function StoryPage() {
  const { data: storyData } = useLoaderData();
  const params = useParams();
  const { categoryName } = params;

  return (
    <>
      <CategoryText size="xLarge">{categoryName}</CategoryText>
      <CategoryText size="small">Button</CategoryText>
      <Container>
        <Wrapper>
          {storyData.length &&
            storyData.map(data => {
              const { _id: id } = data;
              return <Story key={id} data={data} />;
            })}
          {storyData.length &&
            storyData.map(data => {
              const { _id: id } = data;
              return <Story key={id} data={data} />;
            })}
        </Wrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 0 0 1.5rem;
  height: auto;

  @media ${props => props.theme.viewSize.mobile} {
    padding: 0 1rem;
  }
`;

const CategoryText = styled(Text)`
  position: fixed;
  z-index: 10;
  width: 100%;
  color: white;
  background-color: #0088ff;

  @media ${props => props.theme.viewSize.tablet} {
    display: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  height: 100%;

  @media ${props => props.theme.viewSize.mobile} {
    padding: 0 0 2rem 0;
    margin: 2rem;
  }
`;
