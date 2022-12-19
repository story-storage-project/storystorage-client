/* eslint-disable import/no-unresolved */
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { render } from 'test/utils/testUtil';
import { lightTheme, darkTheme } from 'components/theme/default';
import Button from '.';

const label = 'This is a button';
const theme = {};
beforeEach(() => {
  const themeColor = 'lightTheme';
  theme.colors = themeColor === 'lightTheme' ? lightTheme : darkTheme;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Button - onClick', () => {
  let onClick;
  let tree;

  beforeEach(() => {
    onClick = jest.fn();
    tree = render(<Button onClick={onClick}>{label}</Button>);
  });

  it('should render without crashing', () => {
    expect(tree).toBeDefined();
  });

  it('should be visible a button', () => {
    const button = screen.getByRole('button');
    const children = screen.getByText(label);

    expect(button).toBeInTheDocument();
    expect(children).toBeInTheDocument();

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be render with style defaults.', () => {
    const button = screen.getByRole('button');

    expect(button).toHaveStyle('width: fit-content');
    expect(button).toHaveStyle('height: fit-content');
    expect(button).toHaveStyle('border: 0.0625em solid transparent');
    expect(button).toHaveStyle('padding: 0.5rem 1rem');
    expect(button).toHaveStyle(`color: ${theme.colors.textColor}`);
  });
});

describe('Button - style', () => {
  beforeEach(() => {
    render(
      <Button
        width="2rem"
        height="2rem"
        border
        borderRadius="20px"
        bg="pointColor"
        padding="1rem"
        margin="1rem"
        textColor="pointColor"
      >
        {label}
      </Button>,
    );
  });
  it('should render with specified style.', () => {
    const button = screen.getByRole('button');

    expect(button).toHaveStyle('width: 2rem');
    expect(button).toHaveStyle('height: 2rem');
    expect(button).toHaveStyle(
      `border: 0.0625em solid ${theme.colors.darkGray}`,
    );
    expect(button).toHaveStyle('border-radius: 20px');
    expect(button).toHaveStyle(`background-color: ${theme.colors.pointColor}`);
    expect(button).toHaveStyle('padding: 1rem');
    expect(button).toHaveStyle('margin: 1rem');
    expect(button).toHaveStyle(`color: ${theme.colors.pointColor}`);
  });
});
