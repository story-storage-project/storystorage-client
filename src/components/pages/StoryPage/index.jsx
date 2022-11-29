import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import Text from '../../atoms/Text';
import Story from '../../organisms/Story';
import {
  userData,
  isLogin,
  isFinishPatch,
  selectStory,
  editUserStoryList,
} from '../../../store/userState';

export default function StoryPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { categoryName, storyId } = params;
  const userInfo = useRecoilValue(userData);
  const loggedIn = useRecoilValue(isLogin);
  const isFinishedPatch = useRecoilValue(isFinishPatch);
  const setEditUserStoryList = useSetRecoilState(editUserStoryList);
  const storyData = useRecoilValue(selectStory({ categoryName, storyId }));

  const setEditUserStory = (...editData) => {
    setEditUserStoryList(...editData);
  };

  useEffect(() => {
    if (isFinishedPatch && !storyData) {
      navigate('/');
    }
  }, [isFinishedPatch, storyData]);

  return (
    <>
      <CategoryText size="small">{categoryName}</CategoryText>
      <Container>
        <Wrapper>
          <RecoilRoot>
            {isFinishedPatch && storyData && (
              <Story
                responseData={storyData}
                userInfo={userInfo}
                isLogin={loggedIn}
                setEditUserStory={setEditUserStory}
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
  min-height: 70vh;

  @media ${props => props.theme.viewSize.mobile} {
    padding: 0 1rem;
  }
`;

const CategoryText = styled(Text)`
  position: fixed;
  z-index: 10;
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
