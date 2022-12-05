/* eslint-disable import/no-unresolved */
import React from 'react';
import { screen } from '@testing-library/react';
import 'jest-styled-components';
import { render } from 'testUtil';
import base, { lightTheme, darkTheme } from 'components/theme/default';
import Text from '.';

const theme = { ...base };

beforeEach(() => {
  const themeColor = 'lightTheme';
  theme.colors = themeColor === 'lightTheme' ? lightTheme : darkTheme;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Text', () => {
  beforeEach(() => {
    render(<Text>Text test</Text>);
  });

  it('should render without crashing', () => {
    expect(screen).toBeDefined();
  });

  it('should be visible a textDiv', () => {
    const text = screen.getByText('Text test');

    expect(text).toBeInTheDocument();
    expect(text).toHaveStyle(`font-size: ${theme.fontSize.default}`);
  });
});

describe('Text - props', () => {
  beforeEach(() => {
    render(
      <Text
        padding="1rem"
        margin="1rem"
        color="pointColor"
        size="large"
        bg
        bold="500"
        bolder
      >
        Text test
      </Text>,
    );
  });

  it('should render without crashing', () => {
    expect(screen).toBeDefined();
  });

  it('should be visible a textDiv', () => {
    const text = screen.getByText('Text test');

    expect(text).toHaveStyle('padding: 1rem');
    expect(text).toHaveStyle('margin: 1rem');
    expect(text).toHaveStyle(`color: ${theme.colors.pointColor}`);
    expect(text).toHaveStyle(`background-color: ${theme.colors.lightGray}`);
    expect(text).toHaveStyle(`font-size: ${theme.fontSize.large}`);
    expect(text).toHaveStyle('font-weight: 500');
    expect(text).toHaveStyle(
      `border-bottom: 4px solid ${theme.colors.lightGray}`,
    );
  });
});
