/* eslint-disable import/no-unresolved */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'test/utils/testUtil';

import StoryMaker from '.';

describe('StoryMaker', () => {
  it('Should show modal, if isOnLoginReqModal state value is true', async () => {
    const promise = Promise.resolve();

    act(() => {
      render(
        <BrowserRouter>
          <StoryMaker />
        </BrowserRouter>,
      );
    });

    await act(() => promise);

    const PreviewStoryComponent = screen.getByTestId('previewStory');

    await waitFor(() => {
      expect(PreviewStoryComponent).toBeInTheDocument();
    });
  });
});
