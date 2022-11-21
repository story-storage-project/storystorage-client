import React, { createContext, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const CodeContext = createContext({});

export default function CodeProvider({ children }) {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [codeViewMode, setCodeViewMode] = useState('row');

  const writeHtml = useCallback(code => setHtml(code), [html]);

  const writeCss = useCallback(code => setCss(code, [css]));

  const changeCodeViewMode = useCallback(
    mode => setCodeViewMode(mode),
    [codeViewMode],
  );

  const value = useMemo(
    () => ({
      html,
      css,
      writeHtml,
      writeCss,
      changeCodeViewMode,
      codeViewMode,
    }),
    [html, css, writeHtml, writeCss, changeCodeViewMode],
  );

  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
}

CodeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
