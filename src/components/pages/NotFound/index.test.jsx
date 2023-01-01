/* eslint-disable import/no-unresolved */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { render } from 'test/utils/testUtil';
import NotFound from '.';

describe('NotFound', () => {
  beforeEach(async () => {
    const promise = Promise.resolve();

    act(() => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>,
      );
    });

    await act(() => promise);
  });
  it('There must be "Sign In" text', () => {
    const signInText = screen.getByText(/Not Found/);

    expect(signInText).toBeInTheDocument();
  });
});
