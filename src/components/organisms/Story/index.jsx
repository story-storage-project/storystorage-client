import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import styled, { css as styledCss } from 'styled-components';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import Input from '../../atoms/Input';
import CodeEditor from '../CodeEditor';
import { VALIDATION_ERROR_MESSAGE } from '../../../constants/errorMessage';
import insertClass from '../../../utils/insertPreviewClass';
import {
  getNodeList,
  storeAllElementProperties,
} from '../../../utils/stringHtmlParser';
import { deleteStory, patchStory } from '../../../service/storyApi';
import useElementCompiler from '../../../hooks/useElementCompiler';
import useQuery from '../../../hooks/useQuery';
import { html, css, page, isClickedSaveButton } from '../../../store/codeState';

export default function Story({
  userInfo,
  responseData,
  isLogin,
  setEditUserStory,
  setDeleteUserStory,
  setStyle,
}) {
  const {
    _id: id,
    category,
    name,
    html: htmlData,
    css: cssData,
  } = responseData;

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [codeToggle, setCodeToggle] = useState(false);
  const [editButtonToggle, setEditButtonToggle] = useState('Edit');

  const [storyName, setStoryName] = useState(name);
  const [htmlCode, setHtmlCode] = useRecoilState(html);
  const [cssCode, setCssCode] = useRecoilState(css);
  const setPage = useSetRecoilState(page);
  const [isClickSaveButton, setIsClickedSaveButton] =
    useRecoilState(isClickedSaveButton);
  const [response, query] = useQuery();

  useEffect(() => {
    setHtmlCode(htmlData);
    setCssCode(cssData);
    setPage('story');
  }, [responseData]);

  useEffect(() => {
    if (!cssData) return;

    setStyle('update', id, insertClass(id, cssCode));
  }, [cssCode]);

  const allProperties = useMemo(() => {
    const nodeList = getNodeList(`${htmlCode}`);
    const parsedElement = storeAllElementProperties(nodeList);

    return parsedElement;
  }, [htmlCode]);

  const renderElements = () => {
    if (!allProperties) return;

    return useElementCompiler(allProperties);
  };

  useEffect(() => {
    if (!isClickSaveButton) return;

    if (!htmlCode || !cssCode) {
      setErrorMessage(VALIDATION_ERROR_MESSAGE.NULL);
      return;
    }

    const handleEditCode = async () => {
      setErrorMessage('');

      const editData = { html: htmlCode, css: cssCode };
      const res = await query(patchStory, userInfo.id, id, editData);

      if (res.result === 'fail') {
        setErrorMessage(res.data);
      }

      setEditUserStory([category, id, res.data]);
    };

    handleEditCode();
    setIsClickedSaveButton(false);
  }, [isClickSaveButton, response]);

  const handleEditStoryName = async () => {
    if (editButtonToggle === 'Save') {
      setEditButtonToggle('Edit');

      if (storyName === name) return;

      const editData = { name: storyName };

      const res = await query(patchStory, userInfo.id, id, editData);

      if (res.result === 'fail') {
        setErrorMessage(res.data);
      }

      setEditUserStory([category, id, res.data]);
      return;
    }

    setEditButtonToggle('Save');
  };

  const handleDeleteStory = async () => {
    const res = await query(deleteStory, userInfo.id, id);

    if (res.result === 'fail') {
      setErrorMessage(res.data);
    }

    setDeleteUserStory([category, id]);
    navigate('/');
  };

  const handleMoveLocation = () => {
    navigate(`/story/${category}/${id}`);
  };

  return (
    <Container codeToggle={codeToggle}>
      <Wrapper>
        <Header isLogin={isLogin}>
          <InputContainer isLogin={isLogin}>
            <InputWrapper>
              <label htmlFor="margin" id="margin">
                Story Name
              </label>
              <Input
                id="margin"
                value={storyName}
                onChange={e => setStoryName(e.target.value)}
                disabled={editButtonToggle === 'Edit'}
              />
            </InputWrapper>
            <ButtonWrapper>
              {isLogin && (
                <InputWrapper>
                  <Button
                    border
                    borderRadius="3px"
                    bg="lightGray"
                    width="2.5rem"
                    padding="0.5rem 1.5rem"
                    onClick={handleEditStoryName}
                  >
                    {editButtonToggle}
                  </Button>
                </InputWrapper>
              )}
              <InputWrapper>
                <Button
                  border
                  borderRadius="3px"
                  bg="lightGray"
                  width="2.5rem"
                  padding="0.5rem 1.5rem"
                  onClick={() => setCodeToggle(!codeToggle)}
                >
                  Code
                </Button>
              </InputWrapper>
              {isLogin && (
                <InputWrapper>
                  <Button
                    border
                    borderRadius="3px"
                    bg="lightGray"
                    width="2.5rem"
                    padding="0.5rem 1.5rem"
                    onClick={handleDeleteStory}
                  >
                    Delete
                  </Button>
                </InputWrapper>
              )}
            </ButtonWrapper>
          </InputContainer>
          {errorMessage && (
            <Message>
              <Text>{errorMessage}</Text>
            </Message>
          )}
        </Header>
        <PreviewContainer onClick={handleMoveLocation}>
          <PreviewWrapper>
            <Preview className={`a${id}`}>
              {allProperties && renderElements()}
            </Preview>
          </PreviewWrapper>
        </PreviewContainer>
      </Wrapper>
      {codeToggle && (
        <OptionWrapper>
          <CodeEditor isLogin={isLogin} />
        </OptionWrapper>
      )}
    </Container>
  );
}

Story.propTypes = {
  userInfo: PropTypes.object.isRequired,
  isLogin: PropTypes.bool.isRequired,
  responseData: PropTypes.object.isRequired,
  setEditUserStory: PropTypes.func.isRequired,
  setDeleteUserStory: PropTypes.func.isRequired,
  setStyle: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: inherit;

  @media ${props => props.theme.viewSize.mobile} {
    align-items: center;
  }

  @media ${props => props.theme.viewSize.tablet} {
  }

  @media ${props => props.theme.viewSize.laptopHalf} {
    flex-direction: column;
    overflow-x: hidden;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  padding: 1rem 0 0 0;
  min-width: 11rem;

  .link {
    text-decoration: none;

    &:hover {
      color: #00f;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;

  ${props => {
    if (props.isLogin) {
      return styledCss`
        @media ${props.theme.viewSize.mobileS} {
          min-width: 20rem;
          max-width: 20rem;
          align-items: center;
        }
      `;
    }
  }}
`;

const Message = styled.div`
  margin: 0 0 0 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  min-width: 10rem;
  max-width: 10rem;

  margin: 0 0 0 2rem;
  min-height: 3rem;

  @media ${props => props.theme.viewSize.mobileS} {
    margin: 0 0 0 3.5rem;
  }

  ${props => {
    if (props.isLogin) {
      return styledCss`
        @media ${props.theme.viewSize.mobileS} {
          flex-direction: column;
          align-items: flex-start;
          margin: 0;
        }
      `;
    }
  }}
`;

const InputWrapper = styled.div`
  padding: 0.3rem;

  label {
    padding: 0;
    color: ${props => props.theme.colors.textColor};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  min-width: 23rem;
  max-width: 80vw;
  max-height: 50vw;
  min-height: 10rem;
  margin: 1rem 2rem 0 2rem;
  padding: 0.3rem 0;
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: 10px;
  overflow-x: scroll;
  overflow-y: scroll;

  a:-webkit-any-link {
    color: black;
  }

  @media ${props => props.theme.viewSize.mobileS} {
    justify-content: center;
  }
`;

const PreviewWrapper = styled.div`
  margin: 2rem 1rem;
  place-content: center;
  padding: 0.3rem;
  display: flex;
`;

const Preview = styled.div`
  flex: 2;
  width: fit-content;
  height: fit-content;
`;

const OptionWrapper = styled.div`
  margin: 2rem 2rem 0 2rem;
  min-width: 20rem;

  height: 100%;
`;
