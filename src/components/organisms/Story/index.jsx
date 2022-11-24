import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import useElementCompiler from '../../../hooks/useElementCompiler';
import {
  getNodeList,
  storeAllElementProperties,
} from '../../../utils/stringHtmlParser';
import insertClass from '../../../utils/insertPreviewClass';
import CodeEditor from '../CodeEditor';
import Button from '../../atoms/Button';
import {
  html,
  css,
  codeViewMode,
  page,
  isClickedSaveButton,
} from '../../../store/codeState';
import { deleteStory, patchStory } from '../../../service/storyApi';
import { VALIDATION_ERROR_MESSAGE } from '../../../constants/errorMessage';
import Text from '../../atoms/Text';

export default function Story({
  userInfo,
  responseData,
  isLogin,
  setUserStoryList,
}) {
  const {
    _id: id,
    category,
    name,
    html: htmlData,
    css: cssData,
  } = responseData;
  const navigate = useNavigate();
  const [storyName, setStoryName] = useState(name);
  const [codeToggle, setCodeToggle] = useState(false);
  const [editButtonToggle, setEditButtonToggle] = useState('Edit');
  const [errorMessage, setErrorMessage] = useState('');

  const style = useRef();
  const conditionalCss = useRef();

  const [htmlCode, setHtmlCode] = useRecoilState(html);
  const [cssCode, setCssCode] = useRecoilState(css);
  const setCodeViewMode = useSetRecoilState(codeViewMode);
  const setPage = useSetRecoilState(page);
  const [isClickSaveButton, setIsClickedSaveButton] =
    useRecoilState(isClickedSaveButton);

  useEffect(() => {
    setHtmlCode(htmlData);
    setCssCode(cssData);
    setCodeViewMode('column');
    setPage('story');

    if (!style.current) {
      style.current = document.createElement('style');
      document.head.appendChild(style.current);
    }
  }, [responseData]);

  useEffect(() => {
    if (!style.current || !cssData) return;

    conditionalCss.current = insertClass(id, cssCode);

    style.current.innerHTML = conditionalCss.current;
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

  const handleOnChangeNameInput = useCallback(
    e => {
      setStoryName(e.target.value);
    },
    [storyName],
  );

  useEffect(() => {
    if (isClickSaveButton) {
      if (!htmlCode || !cssCode) {
        setErrorMessage(VALIDATION_ERROR_MESSAGE.NULL);
        return;
      }

      const editCodeHandler = async () => {
        setErrorMessage('');

        const editData = { html: htmlCode, css: cssCode };

        await patchStory(userInfo.id, id, editData);
      };

      editCodeHandler();
      setIsClickedSaveButton(false);
    }
  }, [isClickSaveButton]);

  const editNameHandler = async () => {
    if (editButtonToggle === 'Edit') {
      setEditButtonToggle('Save');
    }

    if (editButtonToggle === 'Save') {
      setEditButtonToggle('Edit');

      const editData = { name: storyName };

      await patchStory(userInfo.id, id, editData);
    }
  };

  const deleteHandler = async () => {
    await deleteStory(userInfo.id, id);
    navigate(0);
  };

  return (
    <Container codeToggle={codeToggle}>
      <Wrapper>
        <Header>
          <InputContainer>
            <InputWrapper>
              <label htmlFor="margin" id="margin">
                Story Name
              </label>
              <Input
                id="margin"
                value={storyName}
                onChange={handleOnChangeNameInput}
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
                    onClick={editNameHandler}
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
                    onClick={deleteHandler}
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
        <Link
          style={{ textDecoration: 'none' }}
          to={`/story/${category}/${id}`}
        >
          <PreviewWrapper>
            <Preview className={`a${id}`}>
              {allProperties && renderElements()}
            </Preview>
          </PreviewWrapper>
        </Link>
      </Wrapper>
      {codeToggle && (
        <OptionWrapper>
          <CodeEditor
            userInfo={userInfo}
            isLogin={isLogin}
            setUserStoryList={setUserStoryList}
          />
        </OptionWrapper>
      )}
    </Container>
  );
}

Story.propTypes = {
  userInfo: PropTypes.object.isRequired,
  isLogin: PropTypes.bool.isRequired,
  responseData: PropTypes.object.isRequired,
  setUserStoryList: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: inherit;

  @media ${props => props.theme.viewSize.tablet} {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  padding: 1rem 0 0 0;
  min-width: 11rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
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

  @media ${props => props.theme.viewSize.mobile} {
    min-width: 7rem;
    max-width: 7rem;
    margin: 0;
  }
`;

const InputWrapper = styled.div`
  padding: 0.3rem;

  label {
    padding: 0;
    color: black;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  color: #333;
  padding: 0.5rem;
  margin: 0 auto;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border-inline: 1px solid ${props => props.theme.colors.pointColor};
  min-width: 15rem;
  max-width: 15rem;

  min-height: 1rem;
  max-height: 1rem;
  display: block;
  border: 0.3px solid;
  outline: 0;

  &:hover {
    border-inline: 1px solid ${props => props.theme.colors.pointColor};
    background-color: ${props => props.theme.colors.lightGray};
  }
`;

const PreviewWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 20rem;
  min-height: 10rem;
  height: fit-content;
  /* height: 30rem; */
  margin: 1rem 2rem 0 2rem;
  padding: 0.3rem 0;
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: 10px;

  @media ${props => props.theme.viewSize.tablet} {
    height: 10rem;
  }

  a:-webkit-any-link {
    color: black;
  }
`;

const Preview = styled.div`
  margin: 2rem 1rem;
  width: fit-content;
  height: fit-content;
  padding: 0.3rem;
`;

const OptionWrapper = styled.div`
  margin: 2rem 2rem 0 2rem;
  min-width: 20rem;

  height: 100%;
`;
