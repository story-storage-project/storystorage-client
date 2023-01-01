/* eslint-disable import/no-unresolved */
import React from 'react';
import { render } from 'test/utils/testUtil';
import Ul from '.';

describe('Ul', () => {
  let tree;
  beforeEach(() => {
    tree = render(
      <Ul>
        <li>test</li>
      </Ul>,
    );
  });

  it('should render without crashing', () => {
    expect(tree).toBeDefined();
  });

  it('should render with style defaults', () => {
    expect(tree.container.firstChild).toBeInTheDocument();
    expect(tree.container.firstChild).toHaveStyle('padding: 0 0 0 0.5rem');
    expect(tree.container.firstChild).toHaveStyle('margin: 0');
  });
});
