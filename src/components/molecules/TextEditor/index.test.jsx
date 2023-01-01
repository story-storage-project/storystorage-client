/* eslint-disable import/no-unresolved */
import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'test/utils/testUtil';
import TextEditor from '.';

afterEach(() => {
  jest.clearAllMocks();
});

describe('TextEditor', () => {
  let tree;
  beforeEach(() => {
    const onChange = jest.fn();
    const onKeyDown = jest.fn();
    const onScroll = jest.fn();
    jest.spyOn(React, 'useRef').mockReturnValue({
      current: { clientWidth: 1200 },
    });

    tree = render(
      <TextEditor
        value="text editor test"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onScroll={onScroll}
        placeholder="placeholder"
      >
        <div>textEditor test</div>
      </TextEditor>,
    );
  });

  it('should render without crashing', () => {
    expect(tree).toBeDefined();
  });

  it('should render textarea and div', () => {
    const textArea = screen.getByDisplayValue(/text editor test/);
    const div = screen.getByText(/textEditor test/);

    expect(textArea).toBeInTheDocument();
    expect(div.parentElement).toBeInTheDocument();
    expect(div.parentElement.nodeName).toBe('DIV');
  });

  it('The style condition of the textarea and div must be the same', () => {
    const textArea = screen.getByDisplayValue(/text editor test/);
    const div = screen.getByText(/textEditor test/);

    expect(textArea).toHaveStyle('white-space: break-spaces');
    expect(textArea).toHaveStyle('word-wrap: break-word');
    expect(textArea).toHaveStyle('word-break: break-all');
    expect(textArea).toHaveStyle('box-sizing: border-box');
    expect(textArea).toHaveStyle('margin: 0');
    expect(textArea).toHaveStyle('padding: 10px');
    expect(div.parentElement).toHaveStyle('white-space: break-spaces');
    expect(div.parentElement).toHaveStyle('word-wrap: break-word');
    expect(div.parentElement).toHaveStyle('word-break: break-all');
    expect(div.parentElement).toHaveStyle('box-sizing: border-box');
    expect(div.parentElement).toHaveStyle('margin: 0');
    expect(div.parentElement).toHaveStyle('padding: 10px');
  });
});
