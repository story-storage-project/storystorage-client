import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import Story from '../../organisms/Story';
import Text from '../../atoms/Text';
import { userData, isLogin, userStoryList } from '../../../store/userState';

export default function StoryAllPage() {
  const params = useParams();
  const { categoryName } = params;
  const [userStoryLists, setUserStoryList] = useRecoilState(userStoryList);
  const [storyCategoryList, setUserCategoryStoryList] =
    useState(userStoryLists);
  const userInfo = useRecoilValue(userData);
  const loggedIn = useRecoilValue(isLogin);

  useEffect(() => {
    if (!categoryName) {
      return setUserCategoryStoryList(userStoryLists);
    }

    const list = {};
    list[categoryName] = userStoryLists[categoryName];

    setUserCategoryStoryList(() => ({ ...list }));
  }, [userStoryLists]);

  const setUserStory = editData => {
    setUserStoryList(editData);
  };

  return (
    <>
      {Object.entries(storyCategoryList).map(stories => {
        const [category, storiesArray] = stories;

        return (
          <>
            <CategoryText size="small" key={category}>
              {category}
            </CategoryText>
            <Container>
              <Wrapper>
                {storiesArray.map(story => {
                  const { _id: id } = story;

                  return (
                    <RecoilRoot>
                      <Story
                        key={id}
                        userInfo={userInfo}
                        responseData={story}
                        isLogin={loggedIn}
                        setUserStoryList={setUserStory}
                      />
                    </RecoilRoot>
                  );
                })}
              </Wrapper>
            </Container>
          </>
        );
      })}
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
