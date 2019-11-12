const fillField = require("./popup/field-resolver").fillField;

function setup() {
  setupShortcut();
  setupMessageListeners();
}

function setupShortcut() {
  document.onkeyup = (e) => {
    if (e.shiftKey && e.ctrlKey && e.key === 'Q') {
      fillFocusedForm();
    }
  }
}

function getFocusedForm() {
  let focusedInput = document.activeElement;

  if (!focusedInput || focusedInput) {
    return document;
  }

  return focusedInput.closest('form');
}

function fillFocusedForm() {
  let form = getFocusedForm();

  let fields = getFillableFields(form);

  fields.forEach((field) => fillField(field));
}

function getFillableFields(parent){
  return parent.querySelectorAll('input:not([type="submit"]),select,textarea');
}

function setupMessageListeners() {
  chrome.extension.onMessage.addListener(function (message, sender, callback) {
    if (message.functionToInvoke == "fillFocusedForm") {
      fillFocusedForm();
    }
  });
}

setup();


module.exports = {
  getFillableFields,
  fillFocusedForm
}

