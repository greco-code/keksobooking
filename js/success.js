const mapContainer = document.querySelector('.map__canvas');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const documentFragment = document.createDocumentFragment();
const successMessage = successTemplate.cloneNode(true);

const showSendSuccessMessage = () => {
  mapContainer.style.zIndex = 0;
  documentFragment.appendChild(successMessage);
  document.body.appendChild(documentFragment);
}

export {showSendSuccessMessage};
