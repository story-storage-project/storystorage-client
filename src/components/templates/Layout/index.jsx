import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import LeftMenu from '../../organisms/LeftMenu';

export default function Layout() {
  return (
    <div>
      <Wrapper>
        <LeftMenu />
        <BodyWrapper>
          <Body>
            <Outlet />
          </Body>
        </BodyWrapper>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  height: 100vh;
  overflow: hidden;

  @media ${props => props.theme.viewSize.tablet} {
    flex-direction: column;
    height: 100%;
  }

  @media ${props => props.theme.viewSize.tablet} {
    height: auto;
  }
`;

const BodyWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  overflow: auto;

  @media ${props => props.theme.viewSize.tablet} {
    flex-direction: column;
  }
`;

const Body = styled.div`
  box-sizing: content-box;
  width: 100%;

  @media ${props => props.theme.viewSize.tablet} {
    overflow: auto;
  }
`;
