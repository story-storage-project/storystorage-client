import { createElement, Fragment } from 'react';

export default function useElementCompiler(data) {
  if (!data) return;

  const child = Array.isArray(data.children)
    ? data.children.map(item => useElementCompiler(item)).filter(Boolean)
    : data.children;

  if (Array.isArray(child)) {
    return createElement(
      data.type === 'fragment' ? Fragment : data.type,
      data.props,
      ...child,
    );
  }

  return createElement(data.type, data.props, data.children);
}
