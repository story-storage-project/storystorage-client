import { string } from 'prop-types';
import React from 'react';
import { useRecoilState } from 'recoil';
import Modal from '.';
import { isOnLoginReqModal } from '../../../store/globalState';

export default {
  title: 'Molecules/Modal',
  component: Modal,
  argTypes: {
    children: {
      type: string,
      defaultValue: 'login',
    },
  },
};

export function Template(args) {
  const [isOnLoginModal, setIsLoginModal] = useRecoilState(isOnLoginReqModal);

  return (
    <div>
      <button type="button" onClick={() => setIsLoginModal(!isOnLoginModal)}>
        open
      </button>
      {isOnLoginModal && <Modal {...args} />}
    </div>
  );
}
