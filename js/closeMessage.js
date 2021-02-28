import {isEscEvent} from './util.js';

const closeMessageOnEsc = (popup) => {
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      popup.remove();
    }
  })
}

const closeMessageOnClick = (popup, button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    popup.remove();
  })
}

export {
  closeMessageOnEsc,
  closeMessageOnClick
}
