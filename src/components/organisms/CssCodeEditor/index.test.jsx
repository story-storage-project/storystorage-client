/* eslint-disable import/no-unresolved */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import { render, exceptRecoilRender } from 'test/utils/testUtil';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@storybook/testing-library';
import { RecoilRoot } from 'recoil';
import RecoilObserver from 'test/utils/RecoilObserver';
import {
  codeViewMode,
  isClickedSaveButton,
  selectCodeType,
  css,
} from 'store/codeState';
import { insertTab, insertText } from 'utils/codeEditor';
import useCssHighLightQueryText from 'hooks/useCssHighLightQueryText';
import validateCss from 'utils/cssValidate';
import CssCodeEditor from '.';

jest.mock('hooks/useCssHighLightQueryText');
jest.mock('utils/cssValidate');
jest.mock('utils/codeEditor');

describe('CssCodeEditor - default UI', () => {
  beforeEach(() => {
    useCssHighLightQueryText.mockReturnValue(['test', 'test', jest.fn()]);
  });

  it('should render without crashing', async () => {
    const promise = Promise.resolve();
    let tree;

    act(() => {
      tree = render(
        <BrowserRouter>
          <CssCodeEditor isLogin={false} />
        </BrowserRouter>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      expect(tree.container).toBeDefined();
    });
  });

  it('If codeviewMode is "allInOne", should render all buttons', async () => {
    const promise = Promise.resolve();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(codeViewMode, 'allInOne');
          }}
        >
          <BrowserRouter>
            <CssCodeEditor isLogin={false} />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const htmlButton = screen.getByRole('button', {
      name: 'HTML',
    });
    const jsxButton = screen.getByRole('button', {
      name: 'JSX',
    });
    const cssButton = screen.getByRole('button', {
      name: 'CSS',
    });
    await waitFor(() => {
      expect(htmlButton).toBeInTheDocument();
      expect(jsxButton).toBeInTheDocument();
      expect(cssButton).toBeInTheDocument();
    });
  });

  it('If codeviewMode is not "allInOne", should render only css button', async () => {
    const promise = Promise.resolve();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot>
          <BrowserRouter>
            <CssCodeEditor isLogin={false} />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const htmlButton = screen.queryByText('HTML');
    const jsxButton = screen.queryByText('HTML');
    const cssButton = screen.getByRole('button', {
      name: 'CSS',
    });
    await waitFor(() => {
      expect(htmlButton).toBeNull();
      expect(jsxButton).toBeNull();
      expect(cssButton).toBeInTheDocument();
    });
  });
});

describe('CssCodeEditor - validate', () => {
  it('If there is no css text, validate should not be executed.', async () => {
    const promise = Promise.resolve();

    useCssHighLightQueryText.mockReturnValue([null, 'test', jest.fn()]);

    act(() => {
      render(
        <BrowserRouter>
          <CssCodeEditor isLogin={false} />
        </BrowserRouter>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      expect(validateCss).not.toBeCalled();
    });
  });

  it('If there is css text, validate should be executed.', async () => {
    const promise = Promise.resolve();

    useCssHighLightQueryText.mockReturnValue(['test', 'test', jest.fn()]);

    act(() => {
      render(
        <BrowserRouter>
          <CssCodeEditor isLogin={false} />
        </BrowserRouter>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      expect(validateCss).toBeCalled();
    });
  });
});

describe('CssCodeEditor - click event', () => {
  it('If there is no css text, validate should not be executed.', async () => {
    const promise = Promise.resolve();

    useCssHighLightQueryText.mockReturnValue([null, 'test', jest.fn()]);

    act(() => {
      render(
        <BrowserRouter>
          <CssCodeEditor isLogin={false} />
        </BrowserRouter>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      expect(validateCss).not.toBeCalled();
    });
  });

  it('If Clicked the CSS button, should call recoil set state.', async () => {
    const promise = Promise.resolve();

    useCssHighLightQueryText.mockReturnValue([null, 'test', jest.fn()]);

    const onChange = jest.fn();

    act(() => {
      render(
        <BrowserRouter>
          <RecoilObserver node={selectCodeType} onChange={onChange} />
          <CssCodeEditor isLogin={false} />
        </BrowserRouter>,
      );
    });

    await act(() => promise);

    const cssButton = screen.getByRole('button', {
      name: 'CSS',
    });

    fireEvent.click(cssButton);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toBeCalledWith('CSS');
    });
  });

  it('If Clicked the SAVE button, should call recoil set state.', async () => {
    const promise = Promise.resolve();

    useCssHighLightQueryText.mockReturnValue([null, 'test', jest.fn()]);

    const onChange = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(codeViewMode, 'allInOne');
          }}
        >
          <BrowserRouter>
            <RecoilObserver node={isClickedSaveButton} onChange={onChange} />
            <CssCodeEditor isLogin />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const saveButton = screen.getByRole('button', {
      name: 'SAVE',
    });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });
});

describe('CssCodeEditor - keyDown event', () => {
  let textArea;

  beforeEach(async () => {
    useCssHighLightQueryText.mockReturnValue(['test', 'test', jest.fn()]);

    const promise = Promise.resolve();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(css, 'test');
          }}
        >
          <BrowserRouter>
            <CssCodeEditor isLogin={false} />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    textArea = screen.getByRole('textbox');
  });

  it('If pressed command + c, should call insertText function.', async () => {
    fireEvent.keyDown(textArea, {
      key: 'Meta',
      code: 'MetaLeft',
      keyCode: 91,
      charCode: 91,
    });

    fireEvent.keyDown(textArea, {
      key: 'v',
      code: 'keyV',
      keyCode: 86,
      charCode: 86,
    });

    await waitFor(() => {
      expect(insertText).toHaveBeenCalledTimes(1);
    });
  });

  it('If pressed Tab key, should call insertTab function.', async () => {
    fireEvent.keyDown(textArea, {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
      charCode: 9,
    });

    await waitFor(() => {
      expect(insertTab).toHaveBeenCalledTimes(1);
    });
  });

  it('If pressed Enter key, should not call insertText function.', async () => {
    fireEvent.keyDown(textArea, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });

    await waitFor(() => {
      expect(insertText).toHaveBeenCalledTimes(0);
    });
  });

  it('If pressed "{" or "`" key, should call insertText function.', async () => {
    fireEvent.keyDown(textArea, {
      key: '{',
      code: 'BracketLeft',
      keyCode: 219,
      charCode: 219,
    });

    await waitFor(() => {
      expect(insertText).toHaveBeenCalledTimes(1);
    });

    fireEvent.keyDown(textArea, {
      key: '`',
      code: 'Backquote',
      keyCode: 192,
      charCode: 192,
    });

    await waitFor(() => {
      expect(insertText).toHaveBeenCalledTimes(1);
    });
  });
});

describe('CssCodeEditor - onChange event', () => {
  const mockSetQueryCss = jest.fn();
  beforeEach(async () => {
    useCssHighLightQueryText.mockReturnValue(['test', 'test', mockSetQueryCss]);

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(initialState => [initialState, setState]);

    const promise = Promise.resolve();
    const onChange = jest.fn();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(codeViewMode, 'allInOne');
          }}
        >
          <BrowserRouter>
            <RecoilObserver node={isClickedSaveButton} onChange={onChange} />
            <CssCodeEditor isLogin />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);
  });

  it('Should call useCssHighLightQueryText with input text, when onchange event fired', async () => {
    const textArea = screen.getByRole('textbox');

    expect(useCssHighLightQueryText).toHaveBeenCalledWith('');

    fireEvent.change(textArea, {
      target: { value: 'test' },
    });

    await waitFor(() => {
      expect(useCssHighLightQueryText).toHaveBeenCalledWith('test');
    });
  });

  it('Should call useCssHighLightQueryText with input text, when onchange event fired', async () => {
    const textArea = screen.getByRole('textbox');

    fireEvent.keyDown(textArea, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });

    fireEvent.change(textArea, {
      target: { value: 'test' },
    });

    await waitFor(() => {
      expect(mockSetQueryCss).toHaveBeenCalledWith('test\n');
    });
  });
});
