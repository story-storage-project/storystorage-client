import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Text from '../../atoms/Text';
import ImageIcon from '../../atoms/ImageIcon';
import MobileHiddenToggleViewer from '../../atoms/MobileHiddenToggleViewer';
import Button from '../../atoms/Button';
import Toggle from '../../molecules/Toggle';
import List from '../../atoms/List';
import Ul from '../../molecules/Ul';
import { userData, isLogin, userStoryList } from '../../../store/userState';
import { getMe, logout } from '../../../service/authApi';
import useQuery from '../../../hooks/useQuery';

export default function LeftMenu() {
  const [onToggle, setOnToggle] = useState(false);
  const [loggedIn, setIsLogin] = useRecoilState(isLogin);
  const setUser = useSetRecoilState(userData);
  const [storyList, setStoryList] = useRecoilState(userStoryList);
  const { data, result } = useQuery({
    api: getMe,
    isRequireLogin: true,
  });

  useEffect(() => {
    if (!result) return;

    if (result === 'authError' || !data) {
      setIsLogin(false);
      return setUser(() => ({}));
    }

    const { _id: id, email, name, picture, elementList } = data;
    setUser(() => ({ id, email, name, picture }));
    setIsLogin(true);

    const elements = elementList.reduce((category, element) => {
      if (category[element.category]) {
        category[element.category].push(element);
        return category;
      }
      // eslint-disable-next-line no-param-reassign
      category[element.category] = [];
      category[element.category].push(element);
      return category;
    }, {});

    setStoryList(() => ({ ...elements }));
  }, [data]);

  const navigate = useNavigate();

  const logoClickHandler = () => {
    navigate('/');
  };

  const loginClickHandler = () => {
    navigate('/login');
  };

  const logOutClickHandler = () => {
    logout();

    setIsLogin(false);
    setUser(() => ({}));

    navigate(0);
  };

  const addStoryClickHandler = () => {
    navigate('/story-maker');
  };

  const menuClickHandler = () => {
    setOnToggle(!onToggle);
  };

  const categoryClickHandler = category => {
    navigate(`story/${category}`);
  };

  const categoryListClickHandler = (category, id) => {
    navigate(`story/${category}/${id}`);
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
          {loggedIn ? (
            <>
              <Button
                border
                borderRadius="20rem"
                margin="0 0 1rem 0"
                onClick={logOutClickHandler}
              >
                Sign out
              </Button>
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
            </>
          ) : (
            <Button
              border
              borderRadius="20rem"
              margin="0 0 1rem 0"
              onClick={loginClickHandler}
            >
              Sign in
            </Button>
          )}{' '}
          <Text size="small" color="DarkGray" margin="0.5rem 0">
            Element
          </Text>
          {Object.entries(storyList).map(stories => {
            const [category, storiesArray] = stories;
            return (
              <Toggle summary={category} key={category}>
                <Ul>
                  <List onClick={() => categoryClickHandler(category)}>
                    All
                  </List>
                  {storiesArray.map(story => {
                    const { _id: id } = story;

                    return (
                      <List
                        key={id}
                        onClick={() => categoryListClickHandler(category, id)}
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
