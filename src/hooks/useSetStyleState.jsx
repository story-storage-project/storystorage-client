export default function useSetStyleState(data, handleSetClassState) {
  if (data.style) {
    const { style } = data;

    handleSetClassState('unique', style.uniqueClass);
    handleSetClassState('element', style.elementClass);
    handleSetClassState('id', style.idClass);

    if (Object.entries(style.userClass).length) {
      Object.entries(style.userClass).forEach(className => {
        const key = className[0];
        handleSetClassState('class', key);
      });
    }
  }

  if (Array.isArray(data.children)) {
    data.children.forEach(item => useSetStyleState(item, handleSetClassState));
  } else {
    const { style, textContent } = data;

    if (textContent) {
      handleSetClassState('textContent', style.uniqueClass, textContent);
    }
  }
}
