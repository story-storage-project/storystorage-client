import React from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import ImageIcon from '../../atoms/ImageIcon';
import MobileHiddenToggleViewer from '../../atoms/MobileHiddenToggleViewer';
import Button from '../../atoms/Button';
import Toggle from '../../molecules/Toggle';
import List from '../../atoms/List';
import Ul from '../../molecules/Ul';

function LeftMenu() {
  return (
    <Wrapper modalMode={false}>
      <Header className="menuheader">
        <div className="menuFirstLine">
          <Logo>
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
            <ImageIcon icon="menu" alt="menu-icon" />
          </MobileHiddenToggleViewer>
        </div>
      </Header>
      <MobileHiddenToggleViewer>
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
    width: 15rem;
    min-width: 10%;
    padding: 3rem 2rem;
    background-color: ${theme.colors.leftMenu};

    @media ${theme.viewSize.tablet} {
      width: 15rem;
      min-width: 10%;
      padding: 2rem 1rem;
    }

    @media ${theme.viewSize.mobile} {
      width: 90%;
      height: ${props.modalMode ? '100vh' : '100%'};
      padding: 1rem;
    }
`,
);

const Header = styled.div`
  @media ${props => props.theme.viewSize.mobile} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 1rem; */
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
  padding: 1rem 0;
  width: 100%;

  @media ${props => props.theme.viewSize.mobile} {
    width: 100%;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled(ImageIcon)`
  filter: invert(36%) sepia(100%) saturate(1092%) hue-rotate(189deg)
    brightness(95%) contrast(85%);
`;

export default LeftMenu;
