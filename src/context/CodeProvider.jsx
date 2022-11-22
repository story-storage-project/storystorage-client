import React, { createContext, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const CodeContext = createContext({});

export default function CodeProvider({ children }) {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [codeViewMode, setCodeViewMode] = useState('row');
  const [page, setPage] = useState('');
  const [selectMenu, setSelectMenu] = useState('HTML');
  const [isCodeEditingSave, setIsCodeEditingSave] = useState(false);

  const writeHtml = useCallback(code => setHtml(code), [html]);

  const writeCss = useCallback(code => setCss(code, [css]));

  const setCurrentPage = useCallback(current => setPage(current), [page]);

  const setSelectedMenu = useCallback(
    e => setSelectMenu(e.target.value),
    [selectMenu],
  );

  const changeCodeViewMode = useCallback(
    mode => setCodeViewMode(mode),
    [codeViewMode],
  );

  const toggleCodeEditSave = useCallback(() =>
    setIsCodeEditingSave(!isCodeEditingSave),
  );

  const value = useMemo(
    () => ({
      html,
      css,
      writeHtml,
      writeCss,
      changeCodeViewMode,
      codeViewMode,
      page,
      setCurrentPage,
      selectMenu,
      setSelectedMenu,
      isCodeEditingSave,
      toggleCodeEditSave,
    }),
    [html, css, writeHtml, writeCss, changeCodeViewMode],
  );

  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
}

CodeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
