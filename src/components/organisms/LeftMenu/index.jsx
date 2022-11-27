import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { getMe, logout } from '../../../service/authApi';
import useQuery from '../../../hooks/useQuery';
import Text from '../../atoms/Text';
import ImageIcon from '../../atoms/ImageIcon';
import MobileHiddenToggleViewer from '../../atoms/MobileHiddenToggleViewer';
import Button from '../../atoms/Button';
import List from '../../atoms/List';
import Toggle from '../../molecules/Toggle';
import Ul from '../../molecules/Ul';
import {
  userData,
  isLogin,
  isFinishPatch,
  userStoryList,
} from '../../../store/userState';

export default function LeftMenu() {
  const navigate = useNavigate();
  const [onToggle, setOnToggle] = useState(false);
  const [loggedIn, setIsLogin] = useRecoilState(isLogin);
  const [userStories, setUserStoryList] = useRecoilState(userStoryList);
  const setUser = useSetRecoilState(userData);
  const setIsFinishPatch = useSetRecoilState(isFinishPatch);
  const [userInfo, query] = useQuery();
  useEffect(() => {
    setIsFinishPatch(false);

    query(getMe);
  }, []);

  useEffect(() => {
    if (!userInfo) return;

    if (userInfo.result === 'fail' || !userInfo) {
      setIsLogin(false);
      setUserStoryList('reset');
      setIsFinishPatch(true);

      return setUser(() => ({}));
    }

    const { _id: id, email, name, picture, elementList } = userInfo.data;

    setUser(() => ({ id, email, name, picture }));
    setIsLogin(true);
    setUserStoryList(() => elementList);
    setIsFinishPatch(true);
  }, [userInfo]);

  const handleClickLogo = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogOut = async () => {
    await logout();

    setIsLogin(false);
    setUser(() => ({}));
    setUserStoryList('reset');

    navigate(0);
  };

  const handleClickAddButton = () => {
    navigate('/story-maker');
  };

  const handleClickMenu = () => {
    setOnToggle(!onToggle);
  };

  const handleClickCategory = category => {
    navigate(`story/${category}`);
  };

  const handleClickCategoryList = (category, id) => {
    navigate(`story/${category}/${id}`);
  };

  return (
    <Wrapper modalMode={false}>
      <Header className="menuheader">
        <div className="menuFirstLine">
          <Logo onClick={handleClickLogo}>
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
              onClick={handleClickMenu}
            />
          </MobileHiddenToggleViewer>
        </div>
      </Header>
      <MobileHiddenToggleViewer toggle={onToggle}>
        <Body>
          {loggedIn ? (
            <>
              <Button
                border
                borderRadius="20rem"
                margin="0 0 1rem 0"
                onClick={handleLogOut}
              >
                Sign out
              </Button>
              <Button
                border
                bg="pointColor"
                borderRadius="20rem"
                margin="0 0 1rem 0"
                textColor="whiteColor"
                onClick={handleClickAddButton}
              >
                Add Story
              </Button>
            </>
          ) : (
            <Button
              border
              borderRadius="20rem"
              margin="0 0 1rem 0"
              onClick={handleLogin}
            >
              Sign in
            </Button>
          )}{' '}
          <Text size="small" color="DarkGray" margin="0.5rem 0">
            Element
          </Text>
          {Object.entries(userStories).map(stories => {
            const [category, storiesArray] = stories;

            return (
              <Toggle summary={category} key={category}>
                <Ul>
                  <List onClick={() => handleClickCategory(category)}>All</List>
                  {storiesArray.map(story => {
                    const { _id: id } = story;

                    return (
                      <List
                        key={id}
                        onClick={() => handleClickCategoryList(category, id)}
                      >
                        {story.name}
                      </List>
                    );
                  })}
                </Ul>
              </Toggle>
            );
          })}
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
    overflow-y: scroll;

    @media ${theme.viewSize.tablet} {
      box-sizing: border-box;
      width: 100%;
      height: ${props.modalMode ? '100vh' : 'auto'};
      padding: 1rem;
    }

    @media ${theme.viewSize.mobile} {
      height: auto;
    }
`,
);

const Header = styled.div`
  .menuFirstLine {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  @media ${props => props.theme.viewSize.tablet} {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
