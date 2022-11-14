import React from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import ImageIcon from '../../atoms/ImageIcon';
import MobileHiddenToggleViewer from '../../atoms/MobileHiddenToggleViewer';
import Button from '../../atoms/Button';

function LeftMenu() {
  return (
    <Wrapper modalMode={false}>
      <Header className="menuheader">
        <div className="menuFirstLine">
          <Text textColor="pointColor" size="large">
            StoryStorage
          </Text>
          <MobileHiddenToggleViewer reverse>
            <ImageIcon icon="menu" alt="menu-icon" />
          </MobileHiddenToggleViewer>
        </div>
      </Header>
      <MobileHiddenToggleViewer>
        <Body>
          <Button border borderRadius="20rem" margin="0 0 1rem 0">
            Sign in
          </Button>
          <Toggle>
            <summary>category</summary>
            <div className="list">
              <div>list</div>
              <div>list</div>
              <div>list</div>
              <div>list</div>
            </div>
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
    border: 1px solid black;

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

const Toggle = styled.details`
  summary {
    list-style: none;
  }
  summary::-webkit-details-marker {
    display: none;
    width: 100px;
  }

  & summary::before {
    display: inline-block;
    content: '▸ ';
    color: ${props => props.theme.colors.darkGray};
    width: 15px;
  }

  &[open] summary::before {
    display: inline-block;
    content: '▾ ';
    color: ${props => props.theme.colors.pointColor};
    width: 15px;
  }

  .list {
    padding-left: 1rem;
  }
`;

export default LeftMenu;
