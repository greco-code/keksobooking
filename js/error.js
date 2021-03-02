import {isEscEvent} from './util.js';

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const errorMessage = errorTemplate.cloneNode(true);

const showSendErrorMessage = () => {
  errorMessage.style.zIndex = 1000;
  document.body.appendChild(errorMessage);

  const onEscMessageClose = (evt) => {
    evt.preventDefault();
    if (isEscEvent(evt)) {
      errorMessage.remove();
      document.removeEventListener('keydown', onEscMessageClose);
    }
  }

  errorMessage.addEventListener('click', () => {
    errorMessage.remove();
    document.removeEventListener('keydown', onEscMessageClose);
  })

  document.addEventListener('keydown', onEscMessageClose)
}

const alertContainer = document.createElement('div');
const showGetErrorMessage = () => {
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = 'Ошибка получения данных';

  document.body.append(alertContainer);
}


export {
  showSendErrorMessage,
  showGetErrorMessage,
  alertContainer
}
