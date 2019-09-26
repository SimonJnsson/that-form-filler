import faker from "faker";
import {fillField} from "./popup/field-resolver";

function setupShortcut() {
  document.onkeyup = (e) => {
    if (e.shiftKey && e.ctrlKey && e.key === 'Q') {
      fillFocusedForm();
    }
  }
}

function getFocusedForm() {
  let focusedInput = document.activeElement;

  if (!focusedInput) {
    return document;
  }

  return focusedInput.closest('form');
}

function fillFocusedForm() {
  let form = getFocusedForm();
  let fields = form.querySelectorAll('input,select');

  fields.forEach((field) => fillField(field));
}

setupShortcut();


