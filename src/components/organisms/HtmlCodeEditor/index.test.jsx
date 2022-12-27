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
  html,
} from 'store/codeState';
import { insertTab, insertText, setCaretPosition } from 'utils/codeEditor';
import useHtmlHighLightQueryText from 'hooks/useHtmlHighLightQueryText';
import { validateHtml, convertJsxToHtml } from 'utils/htmlValidate';
import HtmlCodeEditor from '.';

jest.mock('hooks/useHtmlHighLightQueryText');
jest.mock('utils/htmlValidate');
jest.mock('utils/codeEditor');

describe('HtmlCodeEditor - default UI', () => {
  const mockSetQueryHtml = jest.fn();
  beforeEach(async () => {
    useHtmlHighLightQueryText.mockReturnValue([
      'test',
      'test',
      mockSetQueryHtml,
    ]);
  });

  it('should render without crashing', async () => {
    const promise = Promise.resolve();
    let tree;

    act(() => {
      tree = render(
        <BrowserRouter>
          <HtmlCodeEditor isLogin={false} />
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
            <HtmlCodeEditor isLogin={false} />
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

  it('If codeviewMode is not "allInOne", should render only html and jsx button', async () => {
    const promise = Promise.resolve();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot>
          <BrowserRouter>
            <HtmlCodeEditor isLogin={false} />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const htmlButton = screen.queryByText('HTML');
    const jsxButton = screen.queryByText('JSX');
    const cssButton = screen.queryByText('CSS');
    await waitFor(() => {
      expect(htmlButton).toBeInTheDocument();
      expect(jsxButton).toBeInTheDocument();
      expect(cssButton).toBeNull();
    });
  });

  // 클릭이벤트 이름 바꾸깅
  it('If codeviewMode is not "allInOne", should render only html and jsx button', async () => {
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
            <RecoilObserver node={selectCodeType} onChange={onChange} />

            <HtmlCodeEditor isLogin={false} />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const cssButton = screen.getByRole('button', {
      name: 'CSS',
    });

    fireEvent.click(cssButton);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });

  it('If codeviewMode is "allInOne", should render all buttons', async () => {
    const promise = Promise.resolve();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectCodeType, 'HTML');
          }}
        >
          <BrowserRouter>
            <HtmlCodeEditor isLogin={false} />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    const htmlButton = screen.getByRole('button', {
      name: 'HTML',
    });

    fireEvent.click(htmlButton);

    await waitFor(() => {
      expect(htmlButton).toBeInTheDocument();
      expect(convertJsxToHtml).toBeCalledTimes(2);
      expect(mockSetQueryHtml).toBeCalledTimes(1);
    });
  });
});

describe('HtmlCodeEditor - validate', () => {
  it('If there is no css text, validate should not be executed.', async () => {
    const promise = Promise.resolve();

    useHtmlHighLightQueryText.mockReturnValue(['', 'test', jest.fn()]);

    act(() => {
      render(
        <BrowserRouter>
          <HtmlCodeEditor isLogin={false} />
        </BrowserRouter>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      expect(validateHtml).not.toBeCalled();
    });
  });

  it('If there is css text, validate should be executed.', async () => {
    const promise = Promise.resolve();

    useHtmlHighLightQueryText.mockReturnValue(['test', 'test', jest.fn()]);

    act(() => {
      render(
        <BrowserRouter>
          <HtmlCodeEditor isLogin={false} />
        </BrowserRouter>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      expect(validateHtml).toBeCalled();
    });
  });
});

describe('HtmlCodeEditor - click event', () => {
  it('If there is no html text, validate should not be executed.', async () => {
    const promise = Promise.resolve();

    useHtmlHighLightQueryText.mockReturnValue(['', 'test', jest.fn()]);

    act(() => {
      render(
        <BrowserRouter>
          <HtmlCodeEditor isLogin={false} />
        </BrowserRouter>,
      );
    });

    await act(() => promise);

    await waitFor(() => {
      expect(validateHtml).not.toBeCalled();
    });
  });

  it('If Clicked the JSX button, should call recoil set state.', async () => {
    const promise = Promise.resolve();

    useHtmlHighLightQueryText.mockReturnValue(['', 'test', jest.fn()]);

    const onChange = jest.fn();

    act(() => {
      render(
        <BrowserRouter>
          <RecoilObserver node={selectCodeType} onChange={onChange} />
          <HtmlCodeEditor isLogin={false} />
        </BrowserRouter>,
      );
    });

    await act(() => promise);

    const htmlButton = screen.getByRole('button', {
      name: 'JSX',
    });

    fireEvent.click(htmlButton);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toBeCalledWith('JSX');
    });
  });

  it('If Clicked the SAVE button, should call recoil set state.', async () => {
    const promise = Promise.resolve();

    useHtmlHighLightQueryText.mockReturnValue(['', 'test', jest.fn()]);

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
            <HtmlCodeEditor isLogin />
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

  const mockSetQueryHtml = jest.fn();
  beforeEach(async () => {
    useHtmlHighLightQueryText.mockReturnValue([
      'test',
      'test',
      mockSetQueryHtml,
    ]);

    const promise = Promise.resolve();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(css, 'test');
          }}
        >
          <BrowserRouter>
            <HtmlCodeEditor isLogin={false} />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    textArea = screen.getByRole('textbox');
  });

  it('If pressed command + v, should call insertText function.', async () => {
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

  it('If pressed "<" key, should call insertText function.', async () => {
    fireEvent.keyDown(textArea, {
      key: '<',
      code: 'Comma',
      keyCode: 188,
      charCode: 188,
    });

    await waitFor(() => {
      expect(mockSetQueryHtml).toHaveBeenCalledWith('test');
    });
  });

  // 수정하기
  it('If pressed "<" and ">" key, should call insertText function.', async () => {
    fireEvent.keyDown(textArea, {
      key: '<',
      code: 'Comma',
      keyCode: 188,
      charCode: 188,
    });

    fireEvent.keyDown(textArea, {
      key: '>',
      code: 'Period',
      keyCode: 190,
      charCode: 190,
    });

    await waitFor(() => {
      expect(insertText).toHaveBeenCalledTimes(1);
    });
  });

  it('If pressed "<" and "/" key, should not call insertText function.', async () => {
    fireEvent.keyDown(textArea, {
      key: '<',
      code: 'Comma',
      keyCode: 188,
      charCode: 188,
    });

    fireEvent.keyDown(textArea, {
      key: '/',
      code: 'Slash',
      keyCode: 191,
      charCode: 191,
    });

    fireEvent.keyDown(textArea, {
      key: '>',
      code: 'Period',
      keyCode: 190,
      charCode: 190,
    });

    await waitFor(() => {
      expect(insertText).toHaveBeenCalledTimes(0);
    });
  });

  it('If pressed "<" and "Backspace" key, should not call insertText function.', async () => {
    fireEvent.keyDown(textArea, {
      key: '<',
      code: 'Comma',
      keyCode: 188,
      charCode: 188,
    });

    fireEvent.keyDown(textArea, {
      key: 'Backspace',
      code: 'Backspace',
      keyCode: 8,
      charCode: 8,
    });

    await waitFor(() => {
      expect(insertText).toHaveBeenCalledTimes(0);
    });
  });

  it('If pressed "<" and key with length greater than 1, should not call insertText function.', async () => {
    fireEvent.keyDown(textArea, {
      key: '<',
      code: 'Comma',
      keyCode: 188,
      charCode: 188,
    });

    fireEvent.keyDown(textArea, {
      key: 'Shift',
      code: 'ShiftLeft',
      keyCode: 16,
      charCode: 16,
    });

    await waitFor(() => {
      expect(insertText).toHaveBeenCalledTimes(0);
    });
  });
});

describe('HtmlCodeEditor - onChange event', () => {
  let textArea;

  const mockSetQueryHtml = jest.fn();
  beforeEach(async () => {
    useHtmlHighLightQueryText.mockReturnValue(['', '', mockSetQueryHtml]);

    const promise = Promise.resolve();

    act(() => {
      exceptRecoilRender(
        <RecoilRoot
          initializeState={({ set }) => {
            set(html, 'test');
          }}
        >
          <BrowserRouter>
            <HtmlCodeEditor isLogin={false} />
          </BrowserRouter>
        </RecoilRoot>,
      );
    });

    await act(() => promise);

    textArea = screen.getByRole('textbox');
  });

  it('Should call useHtmlHighLightQueryText with input text, when onchange event fired', async () => {
    expect(useHtmlHighLightQueryText).toHaveBeenCalledWith('test');

    fireEvent.change(textArea, {
      target: { value: 'test2' },
    });

    await waitFor(() => {
      expect(mockSetQueryHtml).toHaveBeenCalledWith('test2');
    });
  });

  it('Should call setCaretPosition, when codeOption.autoBracketMode is true', async () => {
    fireEvent.keyDown(textArea, {
      key: '<',
      code: 'Comma',
      keyCode: 188,
      charCode: 188,
    });

    fireEvent.change(textArea, {
      target: { value: 'div' },
    });

    fireEvent.keyDown(textArea, {
      key: '>',
      code: 'Period',
      keyCode: 190,
      charCode: 190,
    });

    fireEvent.change(textArea, {
      target: { value: 'div' },
    });

    await waitFor(() => {
      expect(setCaretPosition).toHaveBeenCalledTimes(1);
    });
  });

  it('Should call useHtmlHighLightQueryText, when onchange event fired with enter key', async () => {
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
      expect(mockSetQueryHtml).toHaveBeenCalledWith('test\n');
    });
  });
});
