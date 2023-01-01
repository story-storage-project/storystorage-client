/* eslint-disable import/no-unresolved */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { render } from 'test/utils/testUtil';
import Login from '.';

describe('Login', () => {
  beforeEach(async () => {
    const promise = Promise.resolve();

    act(() => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>,
      );
    });

    await act(() => promise);
  });
  it('There must be "Sign In" text', () => {
    const signInText = screen.getByText(/Sign In/);

    expect(signInText).toBeInTheDocument();
  });
});
