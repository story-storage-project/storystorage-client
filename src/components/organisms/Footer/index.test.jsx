/* eslint-disable import/no-unresolved */
import React from 'react';
import { useRecoilValue } from 'recoil';
import { renderHook, screen } from '@testing-library/react';
import { render, AllTheProviders } from 'test/utils/testUtil';
import { uiTheme } from 'store/globalState';
import { lightTheme, darkTheme } from 'components/theme/default';
import Footer from '.';

const theme = {};
beforeEach(() => {
  const themeColor = 'lightTheme';
  theme.colors = themeColor === 'lightTheme' ? lightTheme : darkTheme;
});

describe('Footer', () => {
  let tree;
  beforeEach(() => {
    renderHook(() => useRecoilValue(uiTheme), {
      wrapper: AllTheProviders,
    });

    tree = render(<Footer />);
  });

  it('should render without crashing', () => {
    expect(tree).toBeDefined();
  });

  it('should render site information text', () => {
    const Text = screen.getByText(/Story Storage by alex © 2022/);

    expect(Text).toBeInTheDocument();
    expect(Text).toHaveStyle(`color: ${theme.colors.darkGray}`);
  });

  it('should render imageIcon component', () => {
    const ImageIcon = screen.getByAltText(/github-logo/);

    expect(ImageIcon).toBeInTheDocument();
  });
});
