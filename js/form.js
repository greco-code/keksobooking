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
const inputTitle = mainForm.querySelector('#title');

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

const validateForm = () => {
  onSelectTypeChange();
  propertyType.addEventListener('change', onSelectTypeChange);
  timeIn.addEventListener('change', onSelectCheckChange);
  timeOut.addEventListener('change', onSelectCheckChange);
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


//Я так понимаю, эти штуки конфликтуют друг с другом. Какую оставлять?
inputTitle.addEventListener('invalid', () => {
  if (inputTitle.validity.tooShort) {
    //todo получить значения из разметки
    inputTitle.setCustomValidity(`Минимальная длина ${MIN_TITLE_LENGTH} ${declOfNum(MAX_TITLE_LENGTH, SYMBOL_WORDS)}.`);
  } else if(inputTitle.validity.tooLong) {
    inputTitle.setCustomValidity(`Максимальная длина ${MAX_TITLE_LENGTH} ${declOfNum(MIN_TITLE_LENGTH, SYMBOL_WORDS)}.`);
  } else if (inputTitle.validity.valueMissing) {
    inputTitle.setCustomValidity('Это обязательное поле!');
  } else {
    inputTitle.setCustomValidity('');
  }
});

inputTitle.addEventListener('input', () => {
  const valueLength = inputTitle.value.length;
  const LESS_SYMBOLS = MIN_TITLE_LENGTH - valueLength;
  const MORE_SYMBOLS = valueLength - MAX_TITLE_LENGTH;

  if (valueLength < MIN_TITLE_LENGTH) {
    inputTitle.setCustomValidity(`Ещё ${LESS_SYMBOLS} ${declOfNum(LESS_SYMBOLS, SYMBOL_WORDS)}`);
  } else if(valueLength > MAX_TITLE_LENGTH) {
    inputTitle.setCustomValidity(`Удалите ${MORE_SYMBOLS} ${declOfNum(MORE_SYMBOLS, SYMBOL_WORDS)}`);
  } else {
    inputTitle.setCustomValidity('');
  }

  inputTitle.reportValidity();
})


export {validateForm};

