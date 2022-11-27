export function getCaretPosition(textBox, caretPosition) {
  if (textBox.setSelectionRange) {
    textBox.focus();
    textBox.setSelectionRange(caretPosition, caretPosition);
  }

  return caretPosition;
}

export function setCaretPosition(textBox, pos) {
  if (textBox.setSelectionRange) {
    textBox.focus();
    textBox.setSelectionRange(pos, pos);
  }
}

export function insertTab(event, textBox, caretPositionArg) {
  event.preventDefault();
  const caretPosition = getCaretPosition(textBox, caretPositionArg);
  const preText = textBox.value.substring(0, caretPosition);
  const postText = textBox.value.substring(caretPosition, textBox.value.length);
  const copyTextBox = textBox;
  copyTextBox.value = `${preText}\t${postText}`;

  setCaretPosition(textBox, caretPosition + 1);

  return copyTextBox.value;
}

export function insertText(textBox, caretPositionArg, text) {
  const caretPosition = getCaretPosition(textBox, caretPositionArg);
  const preText = textBox.value.substring(0, caretPosition);
  const postText = textBox.value.substring(caretPosition, textBox.value.length);
  const copyTextBox = textBox;
  copyTextBox.value = `${preText}${text}${postText}`;

  setCaretPosition(textBox, caretPosition);

  return copyTextBox.value;
}
