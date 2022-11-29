import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import Text from '../../atoms/Text';
import Story from '../../organisms/Story';
import {
  userData,
  isLogin,
  userStoryList,
  editUserStoryList,
} from '../../../store/userState';

export default function StoryAllPage() {
  const params = useParams();
  const { categoryName } = params;
  const userStoryLists = useRecoilValue(userStoryList);
  const [storyCategoryList, setUserCategoryStoryList] =
    useState(userStoryLists);
  const setEditUserStoryList = useSetRecoilState(editUserStoryList);
  const userInfo = useRecoilValue(userData);
  const loggedIn = useRecoilValue(isLogin);

  useEffect(() => {
    if (!categoryName) {
      return setUserCategoryStoryList(userStoryLists);
    }

    const list = {};
    list[categoryName] = userStoryLists[categoryName];
    setUserCategoryStoryList(() => list);
  }, [userStoryLists, categoryName]);

  const setEditUserStory = (...editData) => {
    setEditUserStoryList(...editData);
  };

  return (
    <div>
      {Object.values(storyCategoryList)[0] &&
        Object.entries(storyCategoryList).map(stories => {
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
                          setEditUserStory={setEditUserStory}
                        />
                      </RecoilRoot>
                    );
                  })}
                </Wrapper>
              </Container>
            </>
          );
        })}
    </div>
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
  width: 100%;
  color: white;
  background-color: ${props => props.theme.colors.pointColor};

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
