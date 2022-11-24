import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import PreviewStory from '../../organisms/PreviewStory';
import { createStory } from '../../../service/storyApi';
import { userData, userStoryList } from '../../../store/userState';
import { REQUEST_ERROR } from '../../../constants/errorMessage';

export default function StoryMaker() {
  const navigate = useNavigate();
  const [createFailMessage, setCreateFailMessage] = useState('');
  const userInfo = useRecoilValue(userData);
  const setUserStoryList = useSetRecoilState(userStoryList);

  const saveStoryData = async storyData => {
    if (!storyData) return;

    try {
      const createdStoryData = await createStory(userInfo.id, storyData);
      const { _id: id, category } = createdStoryData.data;

      setUserStoryList(prev => ({
        ...prev,
        [category]: [...prev[category], createdStoryData.data],
      }));

      navigate(`/story/${category}/${id}`);
    } catch (error) {
      if (!error.response) {
        setCreateFailMessage(REQUEST_ERROR.TIME_OUT);
      }

      if (error.status === 404) {
        navigate('/not-found');
      }

      if (error.status >= 500) {
        navigate('/500');
      }
    }
  };

  return (
    <Container>
      <PreviewStory
        createFailMessage={createFailMessage}
        createStoryRequest={saveStoryData}
      />
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: inherit;
  padding: 0 1.5rem;

  @media ${props => props.theme.viewSize.mobile} {
    padding: 0;
  }
`;
