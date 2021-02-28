import {closeMessageOnClick, closeMessageOnEsc} from './closeMessage.js';

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const errorMessage = errorTemplate.cloneNode(true);
const closeErrorButton = errorMessage.querySelector('.error__button');

const showSendErrorMessage = () => {
  errorMessage.style.zIndex = 1000;
  document.body.appendChild(errorMessage);
}

closeMessageOnEsc(errorMessage);
closeMessageOnClick(errorMessage, closeErrorButton);
closeMessageOnClick(errorMessage, errorMessage);

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
