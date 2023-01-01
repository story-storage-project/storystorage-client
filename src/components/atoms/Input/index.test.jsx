/* eslint-disable import/no-unresolved */
import React from 'react';
import { screen } from '@testing-library/react';
import 'jest-styled-components';
import { render } from 'test/utils/testUtil';
import { lightTheme, darkTheme } from 'components/theme/default';
import Input from '.';

const theme = {};

beforeEach(() => {
  const themeColor = 'lightTheme';
  theme.colors = themeColor === 'lightTheme' ? lightTheme : darkTheme;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Input', () => {
  let tree;

  beforeEach(() => {
    const onChange = jest.fn();
    tree = render(
      <Input value="input-test" onChange={onChange} placeholder="input-test" />,
    );
  });

  it('should render without crashing', () => {
    expect(tree).toBeDefined();
  });

  it('should be visible a img', () => {
    const input = screen.getByPlaceholderText('input-test');

    expect(input).toBeInTheDocument();
  });
});
