/* eslint-disable import/no-unresolved */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { exceptRecoilRender } from 'test/utils/testUtil';
import { RecoilRoot } from 'recoil';

import { isFinishLoad } from 'store/userState';
import StoryPage from '.';

const params = {};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => params,
}));

describe('StoryPage', () => {
  it('Should show story component, if isFinishLoad state value is true and params have value', async () => {
    const promise = Promise.resolve();

    params.categoryName = 'template-button';
    params.storyId = 'z0TonHSxtj';

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isFinishLoad, true);
          }}
        >
          <BrowserRouter>
            <StoryPage />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const storyComponent = screen.getByText(/Story Name/);
    await waitFor(() => {
      expect(storyComponent).toBeInTheDocument();
    });
  });

  it('Should not show story component, if isFinishLoad state value is false and no params value', async () => {
    const promise = Promise.resolve();

    params.categoryName = 'template-button';
    params.storyId = 'z0TonHSxtj';

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isFinishLoad, false);
          }}
        >
          <BrowserRouter>
            <StoryPage />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const storyComponent = screen.queryByText(/Story Name/);
    await waitFor(() => {
      expect(storyComponent).not.toBeInTheDocument();
    });
  });
});
