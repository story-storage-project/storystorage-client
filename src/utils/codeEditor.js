export function getCaretPosition(textBox, caretPosition) {
  if (textBox.setSelectionRange) {
    textBox.focus();
    textBox.setSelectionRange(caretPosition, caretPosition);
  }

  return caretPosition;
}

export function setCaretPosition(item, pos) {
  if (item.setSelectionRange) {
    item.focus();
    item.setSelectionRange(pos, pos);
  }
}

export function insertTab(textBox, caretPositionArg) {
  const caretPosition = getCaretPosition(textBox, caretPositionArg);
  const preText = textBox.value.substring(0, caretPosition);
  const postText = textBox.value.substring(caretPosition, textBox.value.length);
  const copyTextBox = textBox;
  copyTextBox.value = `${preText}\t${postText}`;

  setCaretPosition(textBox, caretPosition + 1);

  return copyTextBox.value;
}

export function insertBracket(textBox, caretPositionArg, text) {
  const caretPosition = getCaretPosition(textBox, caretPositionArg);
  const preText = textBox.value.substring(0, caretPosition);
  const postText = textBox.value.substring(caretPosition, textBox.value.length);
  const copyTextBox = textBox;
  copyTextBox.value = `${preText}${text}${postText}`;

  setCaretPosition(textBox, caretPosition);

  return copyTextBox.value;
}
