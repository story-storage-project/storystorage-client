import React, { createElement, Fragment } from 'react';

export default function useElementCompiler(
  data,
  uniqueClass,
  elementClass,
  idClass,
  userClass,
  globalClass,
  nodesValue,
) {
  if (!data) return;

  const copyData = data;

  if (copyData.style) {
    const { style } = copyData;
    const allClass = [];

    allClass.push(uniqueClass[style.uniqueClass]);
    allClass.push(elementClass[style.elementClass]);

    if (style.idClass) {
      allClass.push(idClass[style.idClass]);
    }

    Object.entries(style.userClass).forEach(className => {
      const key = className[0];
      allClass.push(userClass[key]);
    });

    copyData.props.style = Object.assign({}, ...allClass);
  }

  const child = Array.isArray(data.children)
    ? data.children
        .map(item =>
          useElementCompiler(
            item,
            uniqueClass,
            elementClass,
            idClass,
            userClass,
            globalClass,
            nodesValue,
          ),
        )
        .filter(Boolean)
    : data.children;
  if (Array.isArray(child)) {
    return createElement(
      data.type === 'fragment' ? Fragment : data.type,
      copyData.props,
      ...child,
    );
  }

  const { uniqueClass: uniqueNodeName } = data.style;

  return createElement(
    copyData.type,
    copyData.props,
    nodesValue[uniqueNodeName],
  );
}
