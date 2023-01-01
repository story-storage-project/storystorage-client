/* eslint-disable import/no-unresolved */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import { render, exceptRecoilRender } from 'test/utils/testUtil';
import { isLogin } from 'store/userState';
import useQuery from 'hooks/useQuery';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@storybook/testing-library';
import { RecoilRoot } from 'recoil';
import { styleObject, updateStyle } from 'store/globalState';
import { mockData } from 'test/mocks/handlers';
import RecoilObserver from 'test/utils/RecoilObserver';
import LeftMenu from '.';

jest.mock('hooks/useQuery');

jest.mock('service/authApi', () => ({
  getMe: jest.fn().mockImplementation(() => ({ data: 'data' })),
  logout: jest.fn(),
}));

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('LeftMenu - default UI', () => {
  let tree;
  beforeEach(async () => {
    const promise = Promise.resolve();

    useQuery.mockReturnValue([
      { data: 'data' },
      jest.fn().mockReturnValue({ data: null, result: 'noAuth' }),
    ]);

    act(() => {
      tree = render(
        <BrowserRouter>
          <LeftMenu />
        </BrowserRouter>,
      );
    });

    await act(() => promise);
  });

  it('should render without crashing', async () => {
    await waitFor(() => {
      expect(tree).toBeDefined();
    });
  });

  it('should render StoryStorage text and logo', async () => {
    const icon = screen.getByAltText('storybook-logo');
    const storyStorageText = screen.getByText(/StoryStorage/);

    await waitFor(() => {
      expect(icon).toBeInTheDocument();
      expect(storyStorageText).toBeInTheDocument();
    });
  });

  it('should render Add Story Button', async () => {
    const addStoryButton = screen.getByRole('button', {
      name: 'Add Story',
    });

    await waitFor(() => {
      expect(addStoryButton).toBeInTheDocument();
    });
  });
});

describe('LeftMenu - click event', () => {
  beforeEach(() => {
    useQuery.mockReturnValue([
      { data: 'data' },
      jest.fn().mockReturnValue({ data: null, result: 'noAuth' }),
    ]);
  });

  it('If Clicked the theme button, should change to a moon button', async () => {
    const promise = Promise.resolve();

    act(() => {
      render(
        <BrowserRouter>
          <LeftMenu />
        </BrowserRouter>,
      );
    });

    await act(() => promise);

    const lightThemeButton = screen.getByAltText('sun');

    expect(lightThemeButton).toBeInTheDocument();

    fireEvent.click(lightThemeButton);
    await screen.findByAltText('moon');
  });

  it('If Clicked the Add Story button, should call recoil state', async () => {
    const promise = Promise.resolve();

    useQuery.mockReturnValue([
      { data: 'data' },
      jest.fn().mockReturnValue({ data: mockData.loginUserData }),
    ]);

    const onChange = jest.fn();

    exceptRecoilRender(
      <RecoilRoot
        initializeState={({ set }) => {
          set(styleObject, () => ({ test: 'tests' }));
        }}
      >
        <BrowserRouter>
          <RecoilObserver node={updateStyle} onChange={onChange} />
          <LeftMenu />
        </BrowserRouter>
      </RecoilRoot>,
    );

    await act(() => promise);

    const addStoryButton = screen.getByRole('button', {
      name: 'Add Story',
    });

    fireEvent.click(addStoryButton);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });
});

describe('LeftMenu - navigate', () => {
  beforeEach(async () => {
    const promise = Promise.resolve();

    useQuery.mockReturnValue([
      { data: 'data' },
      jest.fn().mockReturnValue({ data: null, result: 'noAuth' }),
    ]);

    act(() => {
      render(
        <BrowserRouter>
          <LeftMenu />
        </BrowserRouter>,
      );
    });

    await act(() => promise);
  });

  it('If Clicked the add story button, should call navigate', async () => {
    const addStoryButton = screen.getByRole('button', {
      name: 'Add Story',
    });

    fireEvent.click(addStoryButton);

    await waitFor(() => {
      expect(mockedUsedNavigate).toBeCalledTimes(1);
    });
  });

  it('If Clicked the logo, should call navigate', async () => {
    const logo = screen.getByAltText('storybook-logo');

    fireEvent.click(logo);

    await waitFor(() => {
      expect(mockedUsedNavigate).toBeCalledTimes(1);
    });
  });

  it('If Clicked the Sign in button, should call navigate', async () => {
    const signInButton = screen.getByRole('button', {
      name: 'Sign in',
    });

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(mockedUsedNavigate).toBeCalledTimes(1);
    });
  });

  it('If Clicked the category "All", should call navigate', async () => {
    const categoryAll = screen.getByText('All');

    fireEvent.click(categoryAll);

    await waitFor(() => {
      expect(mockedUsedNavigate).toBeCalledTimes(1);
    });
  });

  it('If Clicked the category list, should call navigate', async () => {
    const categoryList = screen.getByText('template-button-01');

    fireEvent.click(categoryList);

    await waitFor(() => {
      expect(mockedUsedNavigate).toBeCalledTimes(1);
    });
  });
});

describe('LeftMenu - Sign out', () => {
  beforeEach(async () => {
    const promise = Promise.resolve();

    useQuery.mockReturnValue([
      { data: 'data' },
      jest.fn().mockReturnValue({ data: mockData.loginUserData }),
    ]);

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isLogin, true);
          }}
        >
          <BrowserRouter>
            <LeftMenu />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);
  });

  it('If Clicked the Sign out button, should call navigate twice', async () => {
    const signOutButton = screen.getByRole('button', {
      name: 'Sign out',
    });

    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(mockedUsedNavigate).toBeCalledTimes(2);
    });
  });
});
