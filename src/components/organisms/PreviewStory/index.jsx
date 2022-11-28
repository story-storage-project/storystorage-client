import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useElementCompiler from '../../../hooks/useElementCompiler';
import Button from '../../atoms/Button';
import CodeEditor from '../CodeEditor';
import Input from '../../atoms/Input';
import {
  getNodeList,
  storeAllElementProperties,
} from '../../../utils/stringHtmlParser';
import insertClass from '../../../utils/insertPreviewClass';

import { html, css, page } from '../../../store/codeState';
import Text from '../../atoms/Text';
import { userData, userStoryList, isLogin } from '../../../store/userState';
import {
  NOT_LOGIN,
  VALIDATION_ERROR_MESSAGE,
} from '../../../constants/errorMessage';

export default function PreviewStory({
  createFailMessage,
  createStoryRequest,
}) {
  const loggedIn = useRecoilValue(isLogin);
  const [storyName, setStoryName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const style = useRef();
  const conditionalCss = useRef();
  const [storyList, setUserStoryList] = useRecoilState(userStoryList);
  const userInfo = useRecoilValue(userData);

  const htmlCode = useRecoilValue(html);
  const cssCode = useRecoilValue(css);
  const setPage = useSetRecoilState(page);

  useEffect(() => {
    setPage('story-maker');
    if (!style.current) {
      style.current = document.createElement('style');
      document.head.appendChild(style.current);
    }
  }, []);

  useEffect(() => {
    setErrorMessage(createFailMessage);
  }, [createFailMessage]);

  useEffect(() => {
    if (!style.current || !cssCode) return;
    conditionalCss.current = insertClass('preview', cssCode);

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

  const handleOnChangeCategoryInput = useCallback(
    e => {
      setCategoryName(e.target.value);
    },
    [categoryName],
  );

  const createStoryHandler = () => {
    if (!loggedIn) {
      alert(NOT_LOGIN);
    }

    if (!categoryName || !storyName || !htmlCode || !cssCode) {
      setErrorMessage(VALIDATION_ERROR_MESSAGE.NULL);
      return;
    }

    setErrorMessage('');

    const data = {
      category: categoryName,
      name: storyName,
      html: htmlCode,
      css: cssCode,
    };

    createStoryRequest(data);
  };

  const setUserStory = editData => {
    setUserStoryList(editData);
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <InputContainer>
            <InputWrapper>
              <label htmlFor="category">
                Category
                <Input
                  list="category"
                  name="categroy"
                  onChange={handleOnChangeCategoryInput}
                  placeholder="Please select or enter a category"
                  value={categoryName}
                />
              </label>
              <datalist id="category">
                {Object.keys(storyList).map(category => (
                  <option key={category} value={category} label={category} />
                ))}
              </datalist>
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="margin" id="margin">
                Story Name
              </label>
              <Input
                id="margin"
                value={storyName}
                onChange={handleOnChangeNameInput}
                placeholder="Please enter a story name"
              />
            </InputWrapper>
            <InputWrapper>
              <Button
                border
                borderRadius="3px"
                bg="lightGray"
                onClick={createStoryHandler}
              >
                Save
              </Button>
            </InputWrapper>
          </InputContainer>
          {errorMessage && (
            <Message>
              <Text>{errorMessage}</Text>
            </Message>
          )}
        </Header>
        <PreviewWrapper>
          <Preview className="apreview">
            {allProperties && renderElements()}
          </Preview>
        </PreviewWrapper>
      </Wrapper>
      <OptionWrapper>
        <CodeEditor
          userInfo={userInfo}
          isLogin={loggedIn}
          setUserStoryList={setUserStory}
        />
      </OptionWrapper>
    </Container>
  );
}

PreviewStory.propTypes = {
  createFailMessage: PropTypes.string,
  createStoryRequest: PropTypes.func.isRequired,
};

PreviewStory.defaultProps = {
  createFailMessage: '',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: inherit;
`;

const Wrapper = styled.div`
  padding: 1rem 0 0 0;
  min-width: 11rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  @media ${props => props.theme.viewSize.mobile} {
    justify-content: center;
    align-items: center;
  }
`;

const Message = styled.div`
  margin: 0 0 0 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  min-width: 15rem;
  max-width: 15rem;

  margin: 0 0 0 2rem;
  min-height: 3rem;

  @media ${props => props.theme.viewSize.mobile} {
    flex-direction: column;
    justify-content: center;
  }
`;

const InputWrapper = styled.div`
  padding: 0.3rem;

  label {
    padding: 0;
    color: black;
  }
`;

// const Input = styled.input`
//   font-family: 'Roboto', sans-serif;
//   color: #333;
//   padding: 0.5rem;
//   margin: 0 auto;
//   border-radius: 0.2rem;
//   background-color: rgb(255, 255, 255);
//   border-inline: 1px solid ${props => props.theme.colors.pointColor};
//   min-width: 15rem;
//   max-width: 15rem;

//   min-height: 1rem;
//   max-height: 1rem;
//   display: block;
//   border: 0.3px solid;
//   outline: 0;

//   &:hover {
//     border-inline: 1px solid ${props => props.theme.colors.pointColor};
//     background-color: ${props => props.theme.colors.lightGray};
//   }
// `;

const PreviewWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow: scroll;
  align-items: center;
  margin: 1rem 2rem 0 2rem;
  padding: 0.3rem 0;
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: 10px;
`;

const Preview = styled.div`
  margin: 2rem 0;
  width: fit-content;
  padding: 0.3rem;
`;

const OptionWrapper = styled.div`
  min-width: 20rem;

  height: 100%;
`;
