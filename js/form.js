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
const roomQuantity = mainForm.querySelector('#room_number');
// const roomQuantityOptions = roomQuantity.querySelectorAll('option');
const guestsAmount = mainForm.querySelector('#capacity');
const guestsAmountOptions = guestsAmount.querySelectorAll('option');


const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const SYMBOL_WORDS = ['символ', 'символа', 'символов']

const priceToType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

// const guestsToRooms = {
//   1: [1],
//   2: [1, 2],
//   3: [1, 2, 3],
//   100: [0],
// }


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
  } else if (titleInput.validity.tooLong) {
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
  } else if (currentValue > priceInput.max) {
    priceInput.setCustomValidity(`Максимальная цена ${priceInput.max} руб/ночь.`);
  } else if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Это обязательное поле!');
  } else {
    priceInput.setCustomValidity('');
  }
}
// Ну это отстой какой то :-)
const onChangeGuestsValidate = (evt) => {
  guestsAmountOptions.forEach((option) => {
    option.disabled = true;
  })

  if (evt.target.value === '1') {
    guestsAmountOptions.forEach((option) => {
      if (option.value === '1') {
        option.disabled = false;
      }
    });
  }

  if (evt.target.value === '2') {
    guestsAmountOptions.forEach((option) => {
      if (option.value === '1' || option.value === '2') {
        option.disabled = false;
      }
    });
  }

  if (evt.target.value === '3') {
    guestsAmountOptions.forEach((option) => {
      if (option.value === '1' || option.value === '2' || option.value === '3') {
        option.disabled = false;
      }
    });
  }

  if (evt.target.value === '100') {
    guestsAmountOptions.forEach((option) => {
      if (option.value === '0') {
        option.disabled = false;
      }
    });
  }
}

const validateForm = () => {
  onSelectTypeChange();
  roomQuantity.addEventListener('change', onChangeGuestsValidate);
  priceInput.addEventListener('change', onChangePriceValidate);
  titleInput.addEventListener('change', onChangeTitleValidate);
  propertyType.addEventListener('change', onSelectTypeChange);
  timeIn.addEventListener('change', onSelectCheckChange);
  timeOut.addEventListener('change', onSelectCheckChange);
}

export {validateForm};

