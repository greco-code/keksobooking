const mainForm = document.querySelector('.ad-form');
const timeIn = mainForm.querySelector('#timein');
const timeOut = mainForm.querySelector('#timeout');


const syncSelect = (evt) => {
  switch (evt.target) {
    case timeIn:
      timeOut.value = evt.target.value;
      break;
    case timeOut:
      timeIn.value = evt.target.value;
  }
}


timeIn.addEventListener('change', syncSelect);
timeOut.addEventListener('change', syncSelect);
