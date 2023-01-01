import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import Text from '../../atoms/Text';
import Story from '../../organisms/Story';
import {
  userData,
  isLogin,
  selectStory,
  editUserStoryList,
  deleteUserStoryList,
  isFinishLoad,
} from '../../../store/userState';
import { updateStyle } from '../../../store/globalState';

export default function StoryPage() {
  const params = useParams();
  const { categoryName, storyId } = params;
  const isLoad = useRecoilValue(isFinishLoad);
  const loggedIn = useRecoilValue(isLogin);
  const userInfo = useRecoilValue(userData);
  const storyData = useRecoilValue(selectStory({ categoryName, storyId }));
  const setEditUserStoryList = useSetRecoilState(editUserStoryList);
  const setDeleteUserStoryList = useSetRecoilState(deleteUserStoryList);
  const setUpdateStyle = useSetRecoilState(updateStyle);

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
    <>
      <CategoryText size="small">{categoryName}</CategoryText>
      <Container>
        <Wrapper>
          <RecoilRoot>
            {isLoad && storyData && (
              <Story
                responseData={storyData}
                userInfo={userInfo}
                isLogin={loggedIn}
                setEditUserStory={setEditUserStory}
                setDeleteUserStory={setDeleteUserStory}
                setStyle={setStyle}
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
`;
