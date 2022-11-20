import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Text from '../../atoms/Text';
import ImageIcon from '../../atoms/ImageIcon';
import MobileHiddenToggleViewer from '../../atoms/MobileHiddenToggleViewer';
import Button from '../../atoms/Button';
import Toggle from '../../molecules/Toggle';
import List from '../../atoms/List';
import Ul from '../../molecules/Ul';

export default function LeftMenu() {
  const [onToggle, setOnToggle] = useState(false);
  const navigate = useNavigate();

  const logoClickHandler = () => {
    navigate('/');
  };

  const addStoryClickHandler = () => {
    navigate('/story-maker');
  };

  const menuClickHandler = () => {
    setOnToggle(!onToggle);
  };

  return (
    <Wrapper modalMode={false}>
      <Header className="menuheader">
        <div className="menuFirstLine">
          <Logo onClick={logoClickHandler}>
            <LogoIcon
              icon="storybook_logo_icon"
              alt="storybook-logo"
              width="1.4rem"
              height="1.4rem"
            />
            <Text textColor="pointColor" size="large" bold="600">
              StoryStorage
            </Text>
          </Logo>
          <MobileHiddenToggleViewer reverse>
            <ImageIcon
              icon="menu"
              alt="menu-icon"
              pointer
              onClick={menuClickHandler}
            />
          </MobileHiddenToggleViewer>
        </div>
      </Header>
      <MobileHiddenToggleViewer toggle={onToggle}>
        <Body>
          {/* <Button border borderRadius="20rem" margin="0 0 1rem 0">
            Sign in
          </Button> */}
          <Button
            border
            bg="pointColor"
            borderRadius="20rem"
            margin="0 0 1rem 0"
            textColor="whiteColor"
            onClick={addStoryClickHandler}
          >
            Add Story
          </Button>
          <Text size="small" color="DarkGray" margin="0.5rem 0">
            Element
          </Text>
          <Toggle summary="All Button">
            <Ul>
              <List>list</List>
              <List>list</List>
              <List>list</List>
              <List>list</List>
            </Ul>
          </Toggle>
        </Body>
      </MobileHiddenToggleViewer>
    </Wrapper>
  );
}

const Wrapper = styled.div(
  ({ theme, ...props }) => `
    display: flex;
    flex-direction: column;
    position: sticky;
    z-index: 10;
    top: 0;
    width: 10rem;
    height: 100%;
    min-width: 10rem;
    padding: 3rem 2rem;
    background-color: ${theme.colors.leftMenu};

    @media ${theme.viewSize.tablet} {
      box-sizing: border-box;
      width: 100%;
      height: ${props.modalMode ? '100vh' : '5rem'};
      padding: 1rem;
    }
`,
);

const Header = styled.div`
  @media ${props => props.theme.viewSize.tablet} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .menuFirstLine {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  padding: 1rem 0;
  width: 100%;
  height: inherit;

  @media ${props => props.theme.viewSize.mobile} {
    width: 100%;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
`;

const LogoIcon = styled(ImageIcon)`
  filter: invert(36%) sepia(100%) saturate(1092%) hue-rotate(189deg)
    brightness(95%) contrast(85%);
`;
