/* eslint-disable import/no-unresolved */
import React from 'react';
import { render } from 'test/utils/testUtil';
import Toggle from '.';

describe('Toggle', () => {
  let tree;
  beforeEach(() => {
    tree = render(
      <Toggle summary="summary">
        <div>toggle test</div>
      </Toggle>,
    );
  });

  it('should render without crashing', () => {
    expect(tree).toBeDefined();
  });

  it('should render textarea and div', () => {
    expect(tree.container.firstChild).toBeInTheDocument();
    expect(tree.container.firstChild.nodeName).toBe('DETAILS');
  });
});
