const mainForm = document.querySelector('.ad-form');
const timeIn = mainForm.querySelector('#timein');
const timeOut = mainForm.querySelector('#timeout');
const priceInput = mainForm.querySelector('#price');
const propertyType = mainForm.querySelector('#type');

const priceToType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const syncSelect = (evt) => {
  switch (evt.target) {
    case timeIn:
      timeOut.value = evt.target.value;
      break;
    case timeOut:
      timeIn.value = evt.target.value;
  }
}

const syncPriceToType = () => {
  priceInput.min = priceToType[propertyType.value];
  priceInput.placeholder = priceToType[propertyType.value];
}


const validateForm = () => {
  syncPriceToType();
  propertyType.addEventListener('change', syncPriceToType);
  priceInput.addEventListener('input', syncPriceToType);
  timeIn.addEventListener('change', syncSelect);
  timeOut.addEventListener('change', syncSelect);
}


export {validateForm};

