import {showSendErrorMessage} from './error.js';
import {sendData} from './server.js';
import {fillAddressInput} from './map.js';
import {showSendSuccessMessage} from './success.js';
import {resetMap} from './map.js';
import {declOfNum} from './util.js';
import {picUploadFunction} from './picuture-upload.js';
import {resetPreview} from './picuture-upload.js';

const mainForm = document.querySelector('.ad-form');
const timeIn = mainForm.querySelector('#timein');
const timeOut = mainForm.querySelector('#timeout');
const priceInput = mainForm.querySelector('#price');
const propertyType = mainForm.querySelector('#type');
const addressInput = mainForm.querySelector('#address');
const resetFormButton = mainForm.querySelector('.ad-form__reset')
const titleInput = mainForm.querySelector('#title');
const roomSelect = mainForm.querySelector('#room_number');
const guestSelect = mainForm.querySelector('#capacity');
const guestSelectOptions = guestSelect.querySelectorAll('option');

const avatar  = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview-img')
const images = document.querySelector('#images');
const imagesPreview = document.querySelector('.ad-form__photo-preview');
const DEFAULT_IMAGE_SRC = 'img/muffin-grey.svg';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const ROOM_SELECT_100 = '100';
const ROOM_SELECT_0 = '0';

const SYMBOL_WORDS = ['символ', 'символа', 'символов']

const priceToType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const roomsCapacity = {
  1: {
    value: [1],
    error: 'Только один гость',
  },
  2: {
    value: [1, 2],
    error: 'Не более 2 гостей и не менее 1',
  },
  3: {
    value: [1, 2, 3],
    error: 'Не более 3 гостей и не менее 1',
  },
  100: {
    value: [0],
    error: 'Не для гостей!',
  },
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
  resetPreview(avatarPreview, DEFAULT_IMAGE_SRC);
  resetPreview(imagesPreview, DEFAULT_IMAGE_SRC);
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

const onChangeRoomsValidate = () => {
  const currentGuests = guestSelect.value;
  const currentRoom = roomSelect.value;

  if (!roomsCapacity[currentRoom].value.includes(currentGuests)) {
    guestSelect.setCustomValidity(roomsCapacity[currentRoom].error);
  } else {
    guestSelect.setCustomValidity('');
  }

  if (roomSelect.value === ROOM_SELECT_100 && guestSelect.value > ROOM_SELECT_0) {
    guestSelect.setCustomValidity(roomsCapacity[currentRoom].error);
  } else {
    guestSelect.setCustomValidity('');
  }
}

const changeSelectedOption = () => {
  guestSelectOptions.forEach((option) => {
    if (option.value === '1') {
      option.selected = true;
    }
  })
}

const validateForm = () => {
  onSelectTypeChange();
  changeSelectedOption();
  guestSelect.addEventListener('change', onChangeRoomsValidate);
  roomSelect.addEventListener('change', onChangeRoomsValidate);
  priceInput.addEventListener('change', onChangePriceValidate);
  titleInput.addEventListener('change', onChangeTitleValidate);
  propertyType.addEventListener('change', onSelectTypeChange);
  timeIn.addEventListener('change', onSelectCheckChange);
  timeOut.addEventListener('change', onSelectCheckChange);
}

picUploadFunction(avatar, avatarPreview);
picUploadFunction(images, imagesPreview);

export {validateForm};

