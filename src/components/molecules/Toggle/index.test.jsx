/* eslint-disable import/no-unresolved */
import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'testUtil';
import Toggle from '.';

describe.only('ImageIcon', () => {
  let tree;
  beforeEach(() => {
    tree = render(
      <Toggle summary="summary">
        <div>toggle test</div>
      </Toggle>,
    );
  });

  it('should render without crashing', () => {
    expect(screen).toBeDefined();
  });

  it('should render textarea and div', () => {
    console.log(tree.container.firstChild.nodeName);

    expect(tree.container.firstChild).toBeInTheDocument();
    expect(tree.container.firstChild.nodeName).toBe('DETAILS');
  });
});
