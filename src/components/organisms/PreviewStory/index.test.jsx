/* eslint-disable import/no-unresolved */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { exceptRecoilRender, render } from 'test/utils/testUtil';
import { RecoilRoot } from 'recoil';
import { isOnLoginReqModal } from 'store/globalState';
import { isLogin } from 'store/userState';
import RecoilObserver from 'test/utils/RecoilObserver';
import { VALIDATION_ERROR_MESSAGE } from 'constants/errorMessage';
import { css, html } from 'store/codeState';
import useElementCompiler from 'hooks/useElementCompiler';
import PreviewStory from '.';

jest.mock('hooks/useElementCompiler');

describe('PreviewStory', () => {
  beforeEach(async () => {
    const promise = Promise.resolve();

    const saveStoryData = jest.fn();
    const setStyle = jest.fn();

    act(() => {
      render(
        <BrowserRouter>
          <PreviewStory
            createFailMessage=""
            createStoryRequest={saveStoryData}
            setStyle={setStyle}
          />
        </BrowserRouter>,
      );
    });

    await act(() => promise);
  });
  it('should be visible a "Category" text', () => {
    const categoryInput = screen.getByPlaceholderText(
      /Please select or enter a category/,
    );

    expect(categoryInput).toBeInTheDocument();
  });

  it('should render story input', () => {
    const storyInput = screen.getByPlaceholderText(/Please enter a story name/);

    expect(storyInput).toBeInTheDocument();
  });

  it('should excute useElementCompiler', () => {
    expect(useElementCompiler).toBeCalledTimes(1);
  });
});

describe('PreviewStory - onchange', () => {
  let categoryInput;
  let storyNameInput;

  let onChange;

  beforeEach(async () => {
    const promise = Promise.resolve();

    onChange = jest.fn();

    const saveStoryData = jest.fn();
    const setStyle = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isLogin, false);
          }}
        >
          <BrowserRouter>
            <RecoilObserver node={isOnLoginReqModal} onChange={onChange} />
            <PreviewStory
              createFailMessage=""
              createStoryRequest={saveStoryData}
              setStyle={setStyle}
            />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    categoryInput = screen.getByPlaceholderText(
      /Please select or enter a category/,
    );

    storyNameInput = screen.getByPlaceholderText(/Please enter a story name/);
  });
  it('should work onchange event on the category input', async () => {
    fireEvent.change(categoryInput, {
      target: { value: 'test' },
    });

    await waitFor(() => {
      expect(categoryInput.value).toBe('test');
    });
  });

  it('should work onchange event on the story name input', async () => {
    fireEvent.change(storyNameInput, {
      target: { value: 'test' },
    });

    await waitFor(() => {
      expect(storyNameInput.value).toBe('test');
    });
  });
});

describe('PreviewStory - click', () => {
  it('should call isOnLoginReqModal state, when the save button is clicked', async () => {
    const promise = Promise.resolve();

    const onChange = jest.fn();

    const saveStoryData = jest.fn();
    const setStyle = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isLogin, false);
          }}
        >
          <BrowserRouter>
            <RecoilObserver node={isOnLoginReqModal} onChange={onChange} />
            <PreviewStory
              createFailMessage=""
              createStoryRequest={saveStoryData}
              setStyle={setStyle}
            />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const categoryInput = screen.getByPlaceholderText(
      /Please select or enter a category/,
    );

    const saveButton = screen.getByRole('button', {
      name: 'Save',
    });

    fireEvent.change(categoryInput, {
      target: { value: '' },
    });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });

  it('should be visible error message, when the islogin state value is true and data is not completely entered.', async () => {
    const promise = Promise.resolve();

    const onChange = jest.fn();

    const saveStoryData = jest.fn();
    const setStyle = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isLogin, true);
          }}
        >
          <BrowserRouter>
            <RecoilObserver node={isOnLoginReqModal} onChange={onChange} />
            <PreviewStory
              createFailMessage=""
              createStoryRequest={saveStoryData}
              setStyle={setStyle}
            />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const categoryInput = screen.getByPlaceholderText(
      /Please select or enter a category/,
    );

    const saveButton = screen.getByRole('button', {
      name: 'Save',
    });

    fireEvent.change(categoryInput, {
      target: { value: '' },
    });

    fireEvent.click(saveButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(VALIDATION_ERROR_MESSAGE.NULL);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should excute saveStoryData props, when the islogin state value is true and data is completely entered.', async () => {
    const promise = Promise.resolve();

    const onChange = jest.fn();

    const saveStoryData = jest.fn();
    const setStyle = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(isLogin, true);
            set(html, 'test');
            set(css, 'test');
          }}
        >
          <BrowserRouter>
            <RecoilObserver node={isOnLoginReqModal} onChange={onChange} />
            <PreviewStory
              createFailMessage=""
              createStoryRequest={saveStoryData}
              setStyle={setStyle}
            />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const categoryInput = screen.getByPlaceholderText(
      /Please select or enter a category/,
    );

    const storyNameInput = screen.getByPlaceholderText(
      /Please enter a story name/,
    );

    const saveButton = screen.getByRole('button', {
      name: 'Save',
    });

    fireEvent.change(storyNameInput, {
      target: { value: 'test' },
    });

    fireEvent.change(categoryInput, {
      target: { value: 'test' },
    });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(saveStoryData).toBeCalledTimes(1);
    });
  });
});
