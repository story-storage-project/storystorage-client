import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Story from '../../organisms/Story';
import Text from '../../atoms/Text';
import CodeProvider from '../../../context/CodeProvider';

export default function StoryPage() {
  const { data: storyData } = useLoaderData();
  const params = useParams();
  const { categoryName } = params;

  return (
    <>
      <CategoryText size="small">{categoryName}</CategoryText>
      <Container>
        <Wrapper>
          <CodeProvider>
            {storyData.length &&
              storyData.map(data => {
                const { _id: id } = data;

                return <Story key={id} responseData={data} />;
              })}
          </CodeProvider>
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
  position: relative;
  width: 100%;
  height: 100%;
  margin: 1rem 0 0 0;

  @media ${props => props.theme.viewSize.mobile} {
    padding: 0 0 2rem 0;
    margin: 2rem;
  }
`;
