import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useElementCompiler from '../../../hooks/useElementCompiler';
import {
  getNodeList,
  storeAllElementProperties,
} from '../../../utils/stringHtmlParser';
import insertClass from '../../../utils/insertPreviewClass';
import CodeEditor from '../CodeEditor';
import Button from '../../atoms/Button';
import { CodeContext } from '../../../context/CodeProvider';

export default function Story({ responseData }) {
  const {
    _id: id,
    category,
    name,
    html: htmlCode,
    css: cssCode,
  } = responseData;
  const { html, writeHtml, css, writeCss, changeCodeViewMode } =
    useContext(CodeContext);
  const [storyName, setStoryName] = useState(name);
  const [categoryName, setCategoryName] = useState(category);
  const [codeToggle, setCodeToggle] = useState(false);
  const style = useRef();
  const conditionalCss = useRef();

  useEffect(() => {
    writeHtml(htmlCode);
    writeCss(cssCode);
    changeCodeViewMode('column');

    if (!style.current) {
      style.current = document.createElement('style');
      document.head.appendChild(style.current);
    }
  }, []);

  useEffect(() => {
    if (!style.current || !css) return;
    conditionalCss.current = insertClass(id, css);

    style.current.innerHTML = conditionalCss.current;
  }, [css]);

  const allProperties = useMemo(() => {
    const nodeList = getNodeList(`${html}`);
    const parsedElement = storeAllElementProperties(nodeList);

    return parsedElement;
  }, [html]);

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

  const onClickHandler = () => {
    const data = {
      category: categoryName,
      name: storyName,
      html,
      css,
    };

    // createStoryRequest(data);
  };

  // TODO class이름 id로 바꾸기
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
              />
            </InputWrapper>
            <InputWrapper>
              <Button
                border
                borderRadius="3px"
                bg="lightGray"
                width="2.5rem"
                onClick={onClickHandler}
              >
                Edit
              </Button>
            </InputWrapper>
            <InputWrapper>
              <Button
                border
                borderRadius="3px"
                bg="lightGray"
                width="2.5rem"
                onClick={() => setCodeToggle(!codeToggle)}
              >
                Code
              </Button>
            </InputWrapper>
          </InputContainer>
        </Header>
        <PreviewWrapper>
          <Preview className={`a${id}`}>
            {allProperties && renderElements()}
          </Preview>
        </PreviewWrapper>
      </Wrapper>
      <OptionWrapper>{codeToggle && <CodeEditor />}</OptionWrapper>
    </Container>
  );
}

Story.propTypes = {
  responseData: PropTypes.object.isRequired,
};

const Container = styled.div`
  display: flex;
  /* flex-direction: ${props => (props.codeToggle ? 'row' : 'column')}; */
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
  }
`;

const InputWrapper = styled.div`
  padding: 0.3rem;

  label {
    padding: 0;
    color: black;
  }
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
  height: 30rem;
  margin: 1rem 2rem 0 2rem;
  padding: 0.3rem 0;
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: 10px;

  @media ${props => props.theme.viewSize.tablet} {
    height: 10rem;
  }
`;

const Preview = styled.div`
  margin: 2rem 0;
  width: fit-content;
  padding: 0.3rem;
`;

const OptionWrapper = styled.div`
  margin: 2rem 2rem 0 2rem;
  min-width: 20rem;

  height: 100%;
`;
