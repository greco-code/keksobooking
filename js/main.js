// Gets random number
// https://learn.javascript.ru/task/random-int-min-max
const randomNumber = (min, max) => {
  return min + Math.random() * (max + 1 - min);
}

// Gets random integer number
const randomInteger = (min, max) => {
  let rand = randomNumber(min, max);

  // Error values
  return ((min >= max) || (min < 0) || (max < 0)) ? ('error') : (Math.floor(rand));
}

randomInteger(10, 20);

// Gets random coordinate
const mapCoordinates = (min, max, symbolNumber) => {
  let rand = randomNumber(min, max);

  return ((min >= max) || (min < 0) || (max < 0)) ? ('error') : rand.toFixed(symbolNumber);
}

mapCoordinates(10, 20, 3);
