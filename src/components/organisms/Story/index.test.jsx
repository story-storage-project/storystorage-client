/* eslint-disable import/no-unresolved */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { exceptRecoilRender, render } from 'test/utils/testUtil';
import { RecoilRoot } from 'recoil';
import { isLogin } from 'store/userState';
import RecoilObserver from 'test/utils/RecoilObserver';
import { VALIDATION_ERROR_MESSAGE } from 'constants/errorMessage';
import { css, html, isClickedSaveButton, page } from 'store/codeState';
import useQuery from 'hooks/useQuery';
import useElementCompiler from 'hooks/useElementCompiler';
import templates from 'data/templates/templates';
import Story from '.';

jest.mock('hooks/useElementCompiler');
jest.mock('hooks/useQuery');

const params = { categoryName: 'template-button', storyId: 'z0TonHSxtj' };
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => params,
}));

describe('PreviewStory', () => {
  let htmlOnChange;
  let cssOnChange;
  let pageOnChange;

  let responseData;
  let setEditUserStory;
  let setDeleteUserStory;
  let setStyle;

  beforeEach(async () => {
    useQuery.mockReturnValue([
      { data: 'data' },
      jest.fn().mockReturnValue({ data: null, result: 'noAuth' }),
    ]);

    const promise = Promise.resolve();

    htmlOnChange = jest.fn();
    cssOnChange = jest.fn();
    pageOnChange = jest.fn();

    const userDate = {};

    responseData = templates['template-button'];
    setEditUserStory = jest.fn();
    setDeleteUserStory = jest.fn();
    setStyle = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isLogin, false);
          }}
        >
          <BrowserRouter>
            <RecoilObserver node={html} onChange={htmlOnChange} />
            <RecoilObserver node={css} onChange={cssOnChange} />
            <RecoilObserver node={page} onChange={pageOnChange} />
            <Story
              userInfo={userDate}
              responseData={responseData[0]}
              isLogin={false}
              setEditUserStory={setEditUserStory}
              setDeleteUserStory={setDeleteUserStory}
              setStyle={setStyle}
            />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);
  });

  it('should excute html, css and page setState', () => {
    expect(htmlOnChange).toHaveBeenCalled();
    expect(cssOnChange).toHaveBeenCalled();
    expect(pageOnChange).toHaveBeenCalled();
  });

  it('should excute setStyle props', () => {
    expect(setStyle).toHaveBeenCalled();
  });

  it('should render story input', () => {
    const storyInput = screen.getByRole('textbox', {
      value: templates['template-button'][0].name,
    });

    expect(storyInput).toBeInTheDocument();
  });

  it('should excute useElementCompiler', () => {
    expect(useElementCompiler).toBeCalled();
  });
});

describe('PreviewStory - onchange', () => {
  let categoryInput;
  let storyNameInput;
  let onChange;
  let storyInput;

  beforeEach(async () => {
    useQuery.mockReturnValue([
      { data: 'data' },
      jest.fn().mockReturnValue({ data: null, result: 'noAuth' }),
    ]);

    const promise = Promise.resolve();

    onChange = jest.fn();

    const userDate = {};

    const responseData = templates['template-button'][0];
    const setEditUserStory = jest.fn();
    const setDeleteUserStory = jest.fn();
    const setStyle = jest.fn();

    act(() => {
      render(
        <BrowserRouter>
          <Story
            userInfo={userDate}
            responseData={responseData}
            isLogin={false}
            setEditUserStory={setEditUserStory}
            setDeleteUserStory={setDeleteUserStory}
            setStyle={setStyle}
          />
        </BrowserRouter>,
      );
    });

    await act(() => promise);

    storyInput = screen.getByRole('textbox', {
      value: templates['template-button'][0].name,
    });
  });
  it('should work onchange event on the story input', async () => {
    fireEvent.change(storyInput, {
      target: { value: 'test' },
    });

    await waitFor(() => {
      expect(storyInput.value).toBe('test');
    });
  });

  it('should work onchange event on the story name input', async () => {
    fireEvent.change(storyInput, {
      target: { value: 'test' },
    });

    await waitFor(() => {
      expect(storyInput.value).toBe('test');
    });
  });
});

describe('Story - not Login', () => {
  beforeEach(async () => {
    useQuery.mockReturnValue([
      { data: 'data' },
      jest.fn().mockReturnValue({ data: null, result: 'noAuth' }),
    ]);
  });

  it('should not render edit button, if isLogin state is false', async () => {
    const promise = Promise.resolve();

    const userDate = {};

    const responseData = templates['template-button'];
    const setEditUserStory = jest.fn();
    const setDeleteUserStory = jest.fn();
    const setStyle = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isLogin, false);
          }}
        >
          <BrowserRouter>
            <Story
              userInfo={userDate}
              responseData={responseData[0]}
              isLogin={false}
              setEditUserStory={setEditUserStory}
              setDeleteUserStory={setDeleteUserStory}
              setStyle={setStyle}
            />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const editButton = screen.queryByText('Edit');

    await waitFor(() => {
      expect(editButton).not.toBeInTheDocument();
    });
  });
});

describe('Story - Login', () => {
  it('should render edit and delete button, if isLogin state is true', async () => {
    useQuery.mockReturnValue([
      { data: 'data' },
      jest.fn().mockReturnValue({ data: 'data', result: 'success' }),
    ]);

    const promise = Promise.resolve();

    const userDate = {};

    const responseData = templates['template-button'];
    const setEditUserStory = jest.fn();
    const setDeleteUserStory = jest.fn();
    const setStyle = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot>
          <BrowserRouter>
            <Story
              userInfo={userDate}
              responseData={responseData[0]}
              isLogin
              setEditUserStory={setEditUserStory}
              setDeleteUserStory={setDeleteUserStory}
              setStyle={setStyle}
            />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const editButton = screen.queryByText('Edit');
    const deleteButton = screen.queryByText('Delete');

    await waitFor(() => {
      expect(editButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
    });
  });

  it('should render error message, if there are not html and css', async () => {
    useQuery.mockReturnValue([
      { data: 'data' },
      jest.fn().mockReturnValue({ data: 'data', result: 'success' }),
    ]);

    const promise = Promise.resolve();

    const userDate = {};

    const responseData = { ...templates['template-button'][0] };

    responseData.html = '';
    responseData.css = '';
    const setEditUserStory = jest.fn();
    const setDeleteUserStory = jest.fn();
    const setStyle = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isClickedSaveButton, true);
          }}
        >
          <BrowserRouter>
            <Story
              userInfo={userDate}
              responseData={responseData}
              isLogin
              setEditUserStory={setEditUserStory}
              setDeleteUserStory={setDeleteUserStory}
              setStyle={setStyle}
            />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      const errorMessage = screen.getByText(VALIDATION_ERROR_MESSAGE.NULL);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should excute useQuery, if there are html and css', async () => {
    const mockQuery = jest.fn();

    useQuery.mockReturnValue([
      { data: 'data' },
      mockQuery.mockReturnValue({ data: 'test', result: 'success' }),
    ]);

    const promise = Promise.resolve();

    const userDate = {};

    const responseData = { ...templates['template-button'][0] };

    const setEditUserStory = jest.fn();
    const setDeleteUserStory = jest.fn();
    const setStyle = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isClickedSaveButton, true);
            set(html, 'test');
            set(css, 'test');
          }}
        >
          <BrowserRouter>
            <Story
              userInfo={userDate}
              responseData={responseData}
              isLogin
              setEditUserStory={setEditUserStory}
              setDeleteUserStory={setDeleteUserStory}
              setStyle={setStyle}
            />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      expect(mockQuery).toHaveBeenCalled();
    });
  });

  it('should render error message, if query result is fail', async () => {
    useQuery.mockReturnValue([
      { data: 'data' },
      jest.fn().mockReturnValue({ data: 'error', result: 'fail' }),
    ]);

    const promise = Promise.resolve();

    const userDate = {};

    const responseData = { ...templates['template-button'][0] };

    const setEditUserStory = jest.fn();
    const setDeleteUserStory = jest.fn();
    const setStyle = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isClickedSaveButton, true);
            set(html, 'test');
            set(css, 'test');
          }}
        >
          <BrowserRouter>
            <Story
              userInfo={userDate}
              responseData={responseData}
              isLogin
              setEditUserStory={setEditUserStory}
              setDeleteUserStory={setDeleteUserStory}
              setStyle={setStyle}
            />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      const errorMessage = screen.getByText('error');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should render save button, when edit button is clicked', async () => {
    const mockQuery = jest.fn();
    useQuery.mockReturnValue([
      { data: 'data' },
      mockQuery.mockReturnValue({ data: 'error', result: 'fail' }),
    ]);

    const promise = Promise.resolve();

    const userDate = {};

    const responseData = { ...templates['template-button'][0] };

    const setEditUserStory = jest.fn();
    const setDeleteUserStory = jest.fn();
    const setStyle = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot>
          <BrowserRouter>
            <Story
              userInfo={userDate}
              responseData={responseData}
              isLogin
              setEditUserStory={setEditUserStory}
              setDeleteUserStory={setDeleteUserStory}
              setStyle={setStyle}
            />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const storyNameInput = screen.getByRole('textbox', {
      value: responseData.name,
    });

    fireEvent.change(storyNameInput, {
      target: { value: 'test' },
    });

    const editButton = screen.queryByText('Edit');

    fireEvent.click(editButton);
    const saveButton = screen.queryByText('Save');

    await waitFor(() => {
      expect(saveButton).toBeInTheDocument();
    });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(editButton).toBeInTheDocument();
      expect(mockQuery).toHaveBeenCalled();
    });
  });

  it('should excute usequery, when delete button is clicked', async () => {
    const mockQuery = jest.fn();
    useQuery.mockReturnValue([
      { data: 'data' },
      mockQuery.mockReturnValue({ data: 'error', result: 'fail' }),
    ]);

    const promise = Promise.resolve();

    const userDate = {};

    const responseData = { ...templates['template-button'][0] };

    const setEditUserStory = jest.fn();
    const setDeleteUserStory = jest.fn();
    const setStyle = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot>
          <BrowserRouter>
            <Story
              userInfo={userDate}
              responseData={responseData}
              isLogin
              setEditUserStory={setEditUserStory}
              setDeleteUserStory={setDeleteUserStory}
              setStyle={setStyle}
            />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const deleteButton = screen.queryByText('Delete');

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockQuery).toHaveBeenCalled();
    });
  });
});
