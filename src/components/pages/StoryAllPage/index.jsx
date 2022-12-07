import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import Text from '../../atoms/Text';
import Story from '../../organisms/Story';
import {
  storyList,
  userData,
  isLogin,
  editUserStoryList,
  deleteUserStoryList,
  isFinishLoad,
} from '../../../store/userState';
import { updateStyle } from '../../../store/globalState';

export default function StoryAllPage() {
  const params = useParams();
  const { categoryName } = params;
  const isLoad = useRecoilValue(isFinishLoad);
  const loggedIn = useRecoilValue(isLogin);
  const userInfo = useRecoilValue(userData);
  const userStoryLists = useRecoilValue(storyList);
  const setEditUserStoryList = useSetRecoilState(editUserStoryList);
  const setDeleteUserStoryList = useSetRecoilState(deleteUserStoryList);
  const setUpdateStyle = useSetRecoilState(updateStyle);
  const [fetch, setFetch] = useState(false);
  const [storyCategoryList, setUserCategoryStoryList] =
    useState(userStoryLists);

  useEffect(() => {
    if (!isLoad) return;
    setFetch(false);

    if (!categoryName) {
      setFetch(true);

      return setUserCategoryStoryList(userStoryLists);
    }

    const list = {};
    list[categoryName] = userStoryLists[categoryName];
    setUserCategoryStoryList(() => list);
    setFetch(true);
  }, [storyCategoryList, isLoad, userStoryLists, categoryName]);

  const setStyle = (mode, id, data) => {
    return setUpdateStyle([mode, id, data]);
  };

  const setEditUserStory = (...editData) => {
    setEditUserStoryList(...editData);
  };

  const setDeleteUserStory = deleteData => {
    const [, id] = deleteData;

    setStyle('delete', id);
    setDeleteUserStoryList(deleteData);
  };

  return (
    <div>
      {fetch &&
        Object.values(storyCategoryList)[0] &&
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
                          setDeleteUserStory={setDeleteUserStory}
                          setStyle={setStyle}
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
`;
