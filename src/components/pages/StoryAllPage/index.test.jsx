/* eslint-disable import/no-unresolved */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { exceptRecoilRender, render } from 'test/utils/testUtil';
import { RecoilRoot } from 'recoil';
import { isFinishLoad } from 'store/userState';
import StoryAllPage from '.';

describe('StoryAllPage', () => {
  it('Should show story elements, if isFinishLoad state value is true', async () => {
    const promise = Promise.resolve();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isFinishLoad, true);
          }}
        >
          <BrowserRouter>
            <StoryAllPage />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const category = screen.getByText(/template-button/);
    await waitFor(() => {
      expect(category).toBeInTheDocument();
    });
  });

  it('Should not show story elements, if isFinishLoad state value is false', async () => {
    const promise = Promise.resolve();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isFinishLoad, false);
          }}
        >
          <BrowserRouter>
            <StoryAllPage />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const category = screen.queryByText(/template-button/);
    await waitFor(() => {
      expect(category).not.toBeInTheDocument();
    });
  });
});
