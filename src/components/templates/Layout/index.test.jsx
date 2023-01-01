/* eslint-disable import/no-unresolved */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { exceptRecoilRender } from 'test/utils/testUtil';
import { RecoilRoot } from 'recoil';
import { isOnLoginReqModal } from 'store/globalState';
import RecoilObserver from 'test/utils/RecoilObserver';

import Layout from '.';

describe('Layout', () => {
  it('Should show modal, if isOnLoginReqModal state value is true', async () => {
    const promise = Promise.resolve();

    const onChange = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isOnLoginReqModal, true);
          }}
        >
          <BrowserRouter>
            <RecoilObserver node={isOnLoginReqModal} onChange={onChange} />
            <Layout />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);
    const loginMessageModal = screen.getByText(/Please Log In/);

    await waitFor(() => {
      expect(loginMessageModal).toBeInTheDocument();
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(loginMessageModal);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(false);
    });
  });

  it('Should not show modal, if isOnLoginReqModal state value is true', async () => {
    const promise = Promise.resolve();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isOnLoginReqModal, false);
          }}
        >
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      expect(screen.queryByText(/Please Log In/)).not.toBeInTheDocument();
    });
  });
});
