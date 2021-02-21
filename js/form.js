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

const onSelectCheckChange = (evt) => {
  switch (evt.target) {
    case timeIn:
      timeOut.value = evt.target.value;
      break;
    case timeOut:
      timeIn.value = evt.target.value;
  }
}

const onSelectTypeChange = () => {
  priceInput.min = priceToType[propertyType.value];
  priceInput.placeholder = priceToType[propertyType.value];
}


const validateForm = () => {
  onSelectTypeChange();
  propertyType.addEventListener('change', onSelectTypeChange);
  priceInput.addEventListener('input', onSelectTypeChange);
  timeIn.addEventListener('change', onSelectCheckChange);
  timeOut.addEventListener('change', onSelectCheckChange);
}


export {validateForm};

