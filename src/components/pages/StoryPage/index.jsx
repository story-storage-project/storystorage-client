import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import Story from '../../organisms/Story';
import Text from '../../atoms/Text';
import { userData, isLogin, userStoryList } from '../../../store/userState';

export default function StoryPage() {
  const params = useParams();
  const { categoryName, storyId } = params;
  const [userStoryLists, setUserStoryList] = useRecoilState(userStoryList);
  const userInfo = useRecoilValue(userData);
  const [story, setStory] = useState();
  const loggedIn = useRecoilValue(isLogin);

  useEffect(() => {
    const storyList = userStoryLists[categoryName];

    const filterStory = storyList.filter(data => {
      const { _id: id } = data;
      return id === storyId;
    });

    setStory(...filterStory);
  }, [userStoryLists, story, storyId]);

  const setUserStory = editData => {
    setUserStoryList(editData);
  };

  return (
    <>
      <CategoryText size="small">{categoryName}</CategoryText>
      <Container>
        <Wrapper>
          <RecoilRoot>
            {story && (
              <Story
                responseData={story}
                userInfo={userInfo}
                isLogin={loggedIn}
                setUserStoryList={setUserStory}
              />
            )}
          </RecoilRoot>
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
