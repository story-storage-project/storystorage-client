/* eslint-disable import/no-unresolved */
import React from 'react';
import { screen } from '@testing-library/react';
import 'jest-styled-components';
import { render } from 'testUtil';
import { lightTheme, darkTheme } from 'components/theme/default';
import ImageIcon from '.';

const theme = {};

beforeEach(() => {
  const themeColor = 'lightTheme';
  theme.colors = themeColor === 'lightTheme' ? lightTheme : darkTheme;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('ImageIcon', () => {
  beforeEach(() => {
    render(<ImageIcon icon="sunny" alt="sunny" />);
  });

  it('should render without crashing', () => {
    expect(screen).toBeDefined();
  });
  it('should be visible a img', () => {
    const img = screen.getByRole('img', { name: 'sunny' });

    expect(img).toBeInTheDocument();
  });
});

describe('ImageIcon - props', () => {
  let tree;
  let img;
  beforeEach(() => {
    tree = render(
      <ImageIcon
        icon="sunny"
        alt="sunny"
        invert
        pointer
        border
        hover
        width="2rem"
        height="2rem"
      />,
    );

    img = screen.getByRole('img', { name: 'sunny' });
  });

  it('should render without crashing', () => {
    expect(screen).toBeDefined();
  });
  it('should be set according to the props.', () => {
    expect(img).toHaveStyle('filter: invert()');
    expect(img).toHaveStyle('width: 2rem');
    expect(img).toHaveStyle('height: 2rem');
    expect(img).toHaveStyle('cursor: pointer');

    expect(tree.container.firstChild).toHaveStyleRule(
      'transform',
      'scale(1.3)',
      {
        modifier: ':hover',
      },
    );
  });
});
