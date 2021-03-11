const mainForm = document.querySelector('.ad-form');
const mainFormItems = mainForm.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const mapFormItems = mapForm.querySelectorAll('.map__filter')
const fieldset = document.querySelector('fieldset');


const toggleElementState = (arr, state) => {
  arr.forEach((item) => {
    item.disabled = state;
  })
}

const disableForms = () => {
  mainForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
  fieldset.disabled = true;

  toggleElementState(mainFormItems, true);
  toggleElementState(mapFormItems, true);
}

const activateForms = () => {
  mainForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');
  fieldset.disabled = false;

  toggleElementState(mainFormItems, false);
  toggleElementState(mapFormItems, false);
}


export {
  disableForms,
  activateForms
};

