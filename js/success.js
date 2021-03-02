const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const successMessage = successTemplate.cloneNode(true);

const showSendSuccessMessage = () => {
  successMessage.style.zIndex = 1000;
  document.body.appendChild(successMessage);
}

export {showSendSuccessMessage};
