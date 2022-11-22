export default function insertClass(toBeAddedClass, css) {
  const newClass = `.a${toBeAddedClass}`;
  const splitCss = css.trim().replace(/\n/g, '').split(/({|})/);

  const addPreviewClass = [];
  splitCss.forEach((item, i) => {
    if (i === 0) {
      return addPreviewClass.push(newClass, ' ', item.trim());
    }

    if (item === '}' && i !== splitCss.length - 2) {
      return addPreviewClass.push(item.trim(), newClass, ' ');
    }

    addPreviewClass.push(item.trim());
  });

  return addPreviewClass.join('');
}
