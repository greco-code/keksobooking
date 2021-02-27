import {showSendErrorMessage} from './error.js';
import {sendData} from './server.js';
import {fillAddressInput} from './map.js';
import {showSendSuccessMessage} from './success.js';
import {resetMarker} from './map.js';
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
  // const currentValue = priceInput.value;

  priceInput.min = priceToType[propertyType.value];
  priceInput.placeholder = priceToType[propertyType.value];

  // if (currentValue < priceInput.min)
}



addressInput.readOnly = true;

const resetForm = () => {
  mainForm.reset = true;
  //todo не работает
  fillAddressInput();
}

resetFormButton.addEventListener('click', () => {
  resetForm();
  resetMarker();
})

const successHandler = () => {
  showSendSuccessMessage();
  resetForm();
  resetMarker();
}

mainForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(successHandler, showSendErrorMessage, formData)
});

const onInvalidTitleValidate = () => {
  if (titleInput.validity.tooShort) {
    //todo получить значения из разметки
    titleInput.setCustomValidity(`Минимальная длина ${MIN_TITLE_LENGTH} ${declOfNum(MAX_TITLE_LENGTH, SYMBOL_WORDS)}.`);
  } else if(titleInput.validity.tooLong) {
    titleInput.setCustomValidity(`Максимальная длина ${MAX_TITLE_LENGTH} ${declOfNum(MIN_TITLE_LENGTH, SYMBOL_WORDS)}.`);
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Это обязательное поле!');
  } else {
    titleInput.setCustomValidity('');
  }
}

const onInputTitleValidate = () => {
  const valueLength = titleInput.value.length;
  const LESS_SYMBOLS = MIN_TITLE_LENGTH - valueLength;
  const MORE_SYMBOLS = valueLength - MAX_TITLE_LENGTH;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${LESS_SYMBOLS} ${declOfNum(LESS_SYMBOLS, SYMBOL_WORDS)}`);
  } else if(valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите ${MORE_SYMBOLS} ${declOfNum(MORE_SYMBOLS, SYMBOL_WORDS)}`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
}

const onInputPriceValidate = () => {
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

  priceInput.reportValidity();
}

const validateForm = () => {
  onSelectTypeChange();
  priceInput.addEventListener('input', onInputPriceValidate);
  titleInput.addEventListener('invalid', onInvalidTitleValidate);
  titleInput.addEventListener('input', onInputTitleValidate);
  propertyType.addEventListener('change', onSelectTypeChange);
  timeIn.addEventListener('change', onSelectCheckChange);
  timeOut.addEventListener('change', onSelectCheckChange);
}

export {validateForm};

