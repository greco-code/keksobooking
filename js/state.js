const mainForm = document.querySelector('.ad-form');
const mainFormItems = mainForm.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const mapFormItems = mapForm.querySelectorAll('.map__filter')
const mapFeatures = mapForm.querySelector('.map__features');


const disableElements = (arr) => {
  arr.forEach((item) => {
    item.disabled = true;
  })
}

const disableForms = () => {
  mainForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
  mapFeatures.disabled = true;

  disableElements(mainFormItems);
  disableElements(mapFormItems);
}


export {disableForms};

