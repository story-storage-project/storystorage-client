/* eslint-disable import/no-unresolved */
import React from 'react';
import { render } from 'test/utils/testUtil';
import Modal from '.';

describe('Modal', () => {
  let tree;
  beforeEach(() => {
    tree = render(<Modal>Modal test</Modal>);
  });

  it('should render without crashing', () => {
    expect(tree).toBeDefined();
  });
  it('should be position property is absolute', () => {
    expect(tree.container.firstChild).toHaveStyle('position: absolute');
  });
});
