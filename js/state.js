const mainForm = document.querySelector('.ad-form');
const mainFormItems = mainForm.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const mapFormItems = mapForm.querySelectorAll('.map__filter')
const mapFeatures = mapForm.querySelector('.map__features');

const disableForms = () => {
  mainForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
  mapFeatures.setAttribute('disabled', true);

  mainFormItems.forEach((item) => {
    item.setAttribute('disabled', true);
  })

  mapFormItems.forEach((item) => {
    item.setAttribute('disabled', true);
  })
}

export {disableForms};

