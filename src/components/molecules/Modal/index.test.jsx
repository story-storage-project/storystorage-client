/* eslint-disable import/no-unresolved */
import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'testUtil';
import Modal from '.';

describe('ImageIcon', () => {
  let tree;
  beforeEach(() => {
    tree = render(<Modal>Modal test</Modal>);
  });

  it('should render without crashing', () => {
    expect(screen).toBeDefined();
  });
  it('should be position property is absolute', () => {
    expect(tree.container.firstChild).toHaveStyle('position: absolute');
  });
});
