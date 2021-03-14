const declOfNum = (value, words) => {
  value = Math.abs(value) % 100;
  let number = value % 10;

  if (value > 10 && value < 20) {
    return words[2]
  }

  if(number > 1 && number < 5) {
    return words[1]
  }

  if(number === 1) {
    return words[0]
  }

  return words[2];
}

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const debounce = (func, wait, immediate) => {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const setLaterFunc = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args)
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(setLaterFunc, wait);

    if (callNow) func.apply(context, args);
  };
}


export {
  declOfNum,
  isEscEvent,
  debounce
}
