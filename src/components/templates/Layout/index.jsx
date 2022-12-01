import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Modal from '../../molecules/Modal';
import LeftMenu from '../../organisms/LeftMenu';
import Footer from '../../organisms/Footer';
import { NOT_LOGIN } from '../../../constants/errorMessage';
import { isOnLoginReqModal } from '../../../store/globalState';

export default function Layout() {
  const [isLogModal, setIsLoginModal] = useRecoilState(isOnLoginReqModal);

  return (
    <>
      {isLogModal && (
        <Modal onClick={() => setIsLoginModal(false)}>{NOT_LOGIN}</Modal>
      )}
      <Wrapper>
        <LeftMenu />
        <BodyContainer>
          <BodyWrapper>
            <Body>
              <Outlet />
            </Body>
          </BodyWrapper>
          <Footer />
        </BodyContainer>
      </Wrapper>
    </>
  );
}

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;

  @media ${props => props.theme.viewSize.tablet} {
    flex-direction: column;
    height: 100%;
  }

  @media ${props => props.theme.viewSize.tablet} {
    height: auto;
  }

  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

const BodyWrapper = styled.div`
  display: flex;

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
