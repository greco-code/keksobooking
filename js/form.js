import {showSendErrorMessage} from './error.js';
import {sendData} from './server.js';
import {fillAddressInput} from './map.js';
import {showSendSuccessMessage} from './success.js';
import {resetMap} from './map.js';
import {declOfNum} from './util.js';

const mainForm = document.querySelector('.ad-form');
const timeIn = mainForm.querySelector('#timein');
const timeOut = mainForm.querySelector('#timeout');
const priceInput = mainForm.querySelector('#price');
const propertyType = mainForm.querySelector('#type');
const addressInput = mainForm.querySelector('#address');
const resetFormButton = mainForm.querySelector('.ad-form__reset')
const titleInput = mainForm.querySelector('#title');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const SYMBOL_WORDS = ['символ', 'символа', 'символов']

const priceToType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const onSelectCheckChange = (evt) => {
  const {value} = evt.target;

  timeOut.value = value;
  timeIn.value = value;
}

const onSelectTypeChange = () => {
  priceInput.min = priceToType[propertyType.value];
  priceInput.placeholder = priceToType[propertyType.value];
}

addressInput.readOnly = true;

const resetForm = () => {
  mainForm.reset();
  onSelectTypeChange();
  fillAddressInput();
}

resetFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  resetMap();
})

const successHandler = () => {
  showSendSuccessMessage();
  resetForm();
  resetMap();
}

mainForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(successHandler, showSendErrorMessage, formData)
});

const onChangeTitleValidate = () => {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity(`Минимальная длина ${MIN_TITLE_LENGTH} ${declOfNum(MAX_TITLE_LENGTH, SYMBOL_WORDS)}.`);
  } else if(titleInput.validity.tooLong) {
    titleInput.setCustomValidity(`Максимальная длина ${MAX_TITLE_LENGTH} ${declOfNum(MIN_TITLE_LENGTH, SYMBOL_WORDS)}.`);
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Это обязательное поле!');
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
}

const onChangePriceValidate = () => {
  const priceInputValue = priceInput.value;
  const currentValue = parseInt(priceInputValue, 10);

  if (currentValue < priceInput.min) {
    priceInput.setCustomValidity(`Минимальная цена для этого типа жилья ${priceInput.min} руб/ночь.`);
  } else if (currentValue > priceInput.max ) {
    priceInput.setCustomValidity(`Максимальная цена ${priceInput.max} руб/ночь.`);
  } else if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Это обязательное поле!');
  } else {
    priceInput.setCustomValidity('');
  }
}

const validateForm = () => {
  onSelectTypeChange();
  priceInput.addEventListener('change', onChangePriceValidate);
  titleInput.addEventListener('change', onChangeTitleValidate);
  propertyType.addEventListener('change', onSelectTypeChange);
  timeIn.addEventListener('change', onSelectCheckChange);
  timeOut.addEventListener('change', onSelectCheckChange);
}

export {validateForm};

