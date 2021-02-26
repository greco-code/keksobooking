const mapContainer = document.querySelector('.map__canvas');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const documentFragment = document.createDocumentFragment();
const errorMessage = errorTemplate.cloneNode(true);

const showErrorMessage = () => {
  mapContainer.style.zIndex = 0;
  documentFragment.appendChild(errorMessage);
  document.body.appendChild(documentFragment);
}

export {showErrorMessage}
