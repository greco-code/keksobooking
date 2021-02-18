const getNumberInRange = (min, max) => {
  return min + Math.random() * (max + 1 - min);
}

const getRandomIntegerInRange = (min, max) => {
  const rand = getNumberInRange(min, max);

  if (min >= max || min < 0 || max < 0) {
    // eslint-disable-next-line no-console
    console.log('error');
    return;
  }

  return (Math.floor(rand));
}

const getRandomFloatingNumber = (min, max, symbolNumber = 1) => {
  const rand = getNumberInRange(min, max);

  if (min >= max || min < 0 || max < 0) {
    // eslint-disable-next-line no-console
    console.log('error');
    return;
  }

  return rand.toFixed(symbolNumber);
}

const getRandomArrayElement = (arr) => arr[getRandomIntegerInRange(0, arr.length - 1)];

const getNoRepeatElements = (arr) => {
  return arr.filter(() => Math.random() > 0.5);
}


const declOfNum = (value, words) => {
  value = Math.abs(value) % 100;
  let number = value % 10;
  if(value > 10 && value < 20) return words[2];
  if(number > 1 && number < 5) return words[1];
  if(number === 1) return words[0];
  return words[2];
}

export {
  getRandomIntegerInRange,
  getRandomFloatingNumber,
  getRandomArrayElement,
  getNoRepeatElements,
  declOfNum
}
