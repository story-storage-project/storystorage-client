/* eslint-disable import/no-unresolved */
import React from 'react';
import { screen } from '@testing-library/react';
import 'jest-styled-components';
import { render } from 'test/utils/testUtil';
import base from 'components/theme/default';
import HiddenToggleViewer from '.';

let tree;

describe('HiddenToggleViewer - props.reverse', () => {
  beforeEach(() => {
    tree = render(
      <HiddenToggleViewer hiddenView="tablet" reverse>
        <div>test</div>
      </HiddenToggleViewer>,
    );
  });

  it('should render without crashing', () => {
    expect(tree).toBeDefined();
  });

  it('should be visible a span', () => {
    const span = screen.getByLabelText('component');

    expect(span).toBeInTheDocument();
  });

  it('should be display property is none', () => {
    expect(tree.container.firstChild).toMatchSnapshot();
    expect(tree.container.firstChild).toHaveStyle('display: none');
  });

  it('should be display property is block for the specified viewsize', () => {
    expect(tree.container.firstChild).toMatchSnapshot();
    expect(tree.container.firstChild).toHaveStyleRule('display', 'block', {
      media: base.viewSize.tablet,
    });
  });
});

describe('HiddenToggleViewer - props.toggle', () => {
  it('if toggle is false for the specified viewsize, should be display property is none', () => {
    tree = render(
      <HiddenToggleViewer hiddenView="tablet" toggle={false}>
        <div>test</div>
      </HiddenToggleViewer>,
    );

    expect(tree.container.firstChild).toHaveStyleRule('display', 'none', {
      media: base.viewSize.tablet,
    });
  });

  it('if toggle is true for the specified viewsize, should be display property is visible', () => {
    tree = render(
      <HiddenToggleViewer hiddenView="tablet" toggle>
        <div>test</div>
      </HiddenToggleViewer>,
    );
    expect(tree.container.firstChild).toHaveStyle('display: visible');
    expect(tree.container.firstChild).toHaveStyleRule('display', 'visible', {
      media: base.viewSize.tablet,
    });
  });
});
