import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Text from '../../atoms/Text';
import ImageIcon from '../../atoms/ImageIcon';
import HiddenToggleViewer from '../../atoms/HiddenToggleViewer';
import Button from '../../atoms/Button';
import List from '../../atoms/List';
import Toggle from '../../molecules/Toggle';
import Ul from '../../molecules/Ul';
import { getMe, logout } from '../../../service/authApi';
import useQuery from '../../../hooks/useQuery';
import {
  uiTheme,
  styleInnerHTML,
  styleObject,
  editStyle,
} from '../../../store/globalState';
import { userData, isLogin, userStoryList } from '../../../store/userState';

export default function LeftMenu() {
  const navigate = useNavigate();
  const locate = useLocation();
  const [onToggle, setOnToggle] = useState(false);
  const [loggedIn, setIsLogin] = useRecoilState(isLogin);
  const [userStories, setUserStoryList] = useRecoilState(userStoryList);
  const setUser = useSetRecoilState(userData);
  const [userInfo, query] = useQuery();
  const [themeColor, setThemeColor] = useRecoilState(uiTheme);
  const styleObjectData = useRecoilValue(styleObject);
  const styleStringCode = useRecoilValue(styleInnerHTML);
  const setEditStyle = useSetRecoilState(editStyle);
  const style = useRef();

  useEffect(() => {
    query(getMe);
  }, []);

  useEffect(() => {
    if (!userInfo) return;

    if (
      !userInfo ||
      userInfo.result === 'noAuth' ||
      userInfo.result === 'fail'
    ) {
      setIsLogin(false);
      setUserStoryList('reset');

      return setUser(() => ({}));
    }

    const { _id: id, email, name, picture, elementList } = userInfo.data;

    setUser(() => ({ id, email, name, picture }));
    setIsLogin(true);
    setUserStoryList(() => elementList);
  }, [userInfo]);

  useEffect(() => {
    if (!style.current) {
      style.current = document.createElement('style');
      document.head.appendChild(style.current);
    }

    if (locate.pathname === '/story-maker') {
      setEditStyle('reset');
    }
  }, [locate.pathname]);

  useEffect(() => {
    if (!style.current) return;

    style.current.innerHTML = styleStringCode;
  }, [styleObjectData]);

  const handleChangeTheme = () => {
    return themeColor === 'lightTheme'
      ? setThemeColor('darkTheme')
      : setThemeColor('lightTheme');
  };

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

    navigate('/');
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
    <Wrapper>
      <Header className="menuheader">
        <div className="menuFirstLine">
          <Logo>
            <LogoIcon
              icon="storybook_logo_icon"
              alt="storybook-logo"
              width="1.4rem"
              height="1.4rem"
              onClick={handleClickLogo}
            />
            <Text
              textColor="pointColor"
              size="large"
              bold="600"
              onClick={handleClickLogo}
            >
              StoryStorage
            </Text>{' '}
            <ImageIcon
              icon={themeColor === 'lightTheme' ? 'sun' : 'moon'}
              alt="moon"
              pointer
              hover
              width="1.4rem"
              height="1.4rem"
              onClick={handleChangeTheme}
            />
          </Logo>
          <HiddenToggleViewer hiddenView="tablet" reverse>
            <ImageIcon
              icon="menu"
              alt="menu-icon"
              pointer
              onClick={handleClickMenu}
            />
          </HiddenToggleViewer>
        </div>
      </Header>
      <HiddenToggleViewer hiddenView="tablet" toggle={onToggle}>
        <Body>
          {loggedIn ? (
            <Button
              border
              borderRadius="20rem"
              margin="0 0 1rem 0"
              onClick={handleLogOut}
            >
              Sign out
            </Button>
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
      </HiddenToggleViewer>
    </Wrapper>
  );
}

const Wrapper = styled.div(
  ({ theme }) => `
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
      height: auto;
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
  filter: ${props => props.theme.colors.filter};
`;
