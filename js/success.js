import {isEscEvent} from './util.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const successMessage = successTemplate.cloneNode(true);

const showSendSuccessMessage = () => {
  successMessage.style.zIndex = 1000;
  document.body.appendChild(successMessage);

  const onEscMessageClose = (evt) => {
    evt.preventDefault()
    if (isEscEvent(evt)) {
      successMessage.remove()
      document.removeEventListener('keydown', onEscMessageClose);
    }
  }
  successMessage.addEventListener('click', () => {
    successMessage.remove();
    document.removeEventListener('keydown', onEscMessageClose);
  })

  document.addEventListener('keydown', onEscMessageClose);
}

export {showSendSuccessMessage};
