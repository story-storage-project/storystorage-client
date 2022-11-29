import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
//
const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.darkGray};

  @media ${props => props.theme.viewSize.mobile} {
    height: 110vh;
  }
`;

const ModalWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.theme.fontSize.defaultLarge};
  width: 20rem;
  height: 5rem;
  margin-top: 10rem;

  border-radius: 20px;
  background-color: ${props => props.theme.colors.greenColor};
  color: white;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

export default function Modal({ children, ...props }) {
  return (
    <ModalContainer {...props}>
      <ModalWrapper>{children}</ModalWrapper>
    </ModalContainer>
  );
}

Modal.propTypes = {
  children: PropTypes.string.isRequired,
};
