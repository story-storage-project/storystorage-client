/* eslint-disable import/no-unresolved */
import React from 'react';
import { screen } from '@testing-library/react';
import 'jest-styled-components';
import { render } from 'test/utils/testUtil';
import { lightTheme, darkTheme } from 'components/theme/default';
import List from '.';

const theme = {};

beforeEach(() => {
  const themeColor = 'lightTheme';
  theme.colors = themeColor === 'lightTheme' ? lightTheme : darkTheme;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('List', () => {
  let tree;
  beforeEach(() => {
    tree = render(
      <List>
        <div>list test</div>
      </List>,
    );
  });

  it('should render without crashing', () => {
    expect(tree).toBeDefined();
  });

  it('should be visible a menuEmojiText', () => {
    const menuEmojiText = screen.getByText('◽️');

    expect(menuEmojiText).toBeInTheDocument();
  });
});
