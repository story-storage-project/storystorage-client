import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CodeEditor from '../../organisms/CodeEditor';
import { createStory } from '../../../service/api';
import { REQUEST_ERROR } from '../../../constants/errorMessage';

export default function StoryMaker() {
  const navigate = useNavigate();
  const [createFailMessage, setCreateFailMessage] = useState('');

  const saveStoryData = async data => {
    if (!data) return;

    try {
      const createdStoryData = await createStory(data);
      const { _id: id, category } = createdStoryData.data[0];

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
      <CodeEditor
        createFailMessage={createFailMessage}
        saveStoryData={saveStoryData}
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
