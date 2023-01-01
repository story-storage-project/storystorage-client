/* eslint-disable import/no-unresolved */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import { render, exceptRecoilRender } from 'test/utils/testUtil';
import { act } from 'react-dom/test-utils';
import { RecoilRoot } from 'recoil';
import RecoilObserver from 'test/utils/RecoilObserver';
import { codeViewMode, page } from 'store/codeState';
import CodeEditor from '.';

describe('CodeEditor', () => {
  it('should render without crashing', async () => {
    const promise = Promise.resolve();

    let tree;

    act(() => {
      tree = render(
        <BrowserRouter>
          <CodeEditor isLogin={false} />
        </BrowserRouter>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      expect(tree.container).toBeDefined();
    });
  });

  it('If page state is not "story", should call RecoilSetState codeViewMode with "partition"', async () => {
    const promise = Promise.resolve();

    const onChange = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot>
          <BrowserRouter>
            <RecoilObserver node={codeViewMode} onChange={onChange} />
            <CodeEditor isLogin={false} />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith('partition');
    });
  });
  it('If page state is "story", should call RecoilSetState codeViewMode with "allInOne"', async () => {
    const promise = Promise.resolve();

    const onChange = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(page, 'story');
          }}
        >
          <BrowserRouter>
            <RecoilObserver node={codeViewMode} onChange={onChange} />

            <CodeEditor isLogin={false} />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith('allInOne');
    });
  });

  it('If page state is "story-maker" and window.innerWidth is less than 1375, should call RecoilSetState codeViewMode with "allInOne"', async () => {
    const promise = Promise.resolve();

    Object.defineProperty(window, 'innerWidth', {
      value: 500,
    });

    const onChange = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(page, 'story-maker');
          }}
        >
          <BrowserRouter>
            <RecoilObserver node={codeViewMode} onChange={onChange} />

            <CodeEditor isLogin={false} />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith('allInOne');
    });
  });

  it('If page state is "story-maker" and window.innerWidth is larger than 1375, should call RecoilSetState codeViewMode with "partition"', async () => {
    const promise = Promise.resolve();

    Object.defineProperty(window, 'innerWidth', {
      value: 1500,
    });

    const onChange = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(page, 'story-maker');
          }}
        >
          <BrowserRouter>
            <RecoilObserver node={codeViewMode} onChange={onChange} />

            <CodeEditor isLogin={false} />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith('partition');
    });
  });
});
