import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useQuery from 'hooks/useQuery';
import PreviewStory from '../../organisms/PreviewStory';
import { REQUEST_ERROR } from '../../../constants/errorMessage';
import { createStory } from '../../../service/storyApi';
import { userData, addUserStoryList } from '../../../store/userState';
import { updateStyle } from '../../../store/globalState';

export default function StoryMaker() {
  const navigate = useNavigate();
  const [createFailMessage, setCreateFailMessage] = useState('');
  const userInfo = useRecoilValue(userData);
  const addUserStory = useSetRecoilState(addUserStoryList);
  const setUpdateStyle = useSetRecoilState(updateStyle);
  const [, query] = useQuery();

  const saveStoryData = async storyData => {
    if (!storyData) return;

    const createdStoryData = await query(createStory, userInfo.id, storyData);

    if (createdStoryData.result === 'fail') {
      return setCreateFailMessage(REQUEST_ERROR);
    }

    const { _id: id, category } = createdStoryData.data;

    addUserStory([storyData.category, createdStoryData.data]);

    navigate(`/story/${category}/${id}`);
  };

  const setStyle = (mode, id, data) => {
    return setUpdateStyle([mode, id, data]);
  };

  return (
    <Container>
      <PreviewStory
        createFailMessage={createFailMessage}
        createStoryRequest={saveStoryData}
        setStyle={setStyle}
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
