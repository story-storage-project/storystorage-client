import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LeftMenu from '../../organisms/LeftMenu';
import RightMenu from '../../organisms/RightMenu';

export default function Layout({ children }) {
  return (
    <div>
      <Wrapper>
        <LeftMenu />
        <BodyWrapper>
          <Body>{children}</Body>
          <RightMenu />
        </BodyWrapper>
      </Wrapper>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;

  @media ${props => props.theme.viewSize.mobile} {
    flex-direction: column;
    height: auto;
  }
`;

const BodyWrapper = styled.div`
  display: flex;
  width: 100%;

  @media ${props => props.theme.viewSize.tablet} {
    flex-direction: column;
  }
`;

const Body = styled.div`
  box-sizing: content-box;
  height: 100%;
  width: 100%;

  @media ${props => props.theme.viewSize.tablet} {
    /* height: auto; */
  }
`;
