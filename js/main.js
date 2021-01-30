const getNumberInRange = (min, max) => {
  return min + Math.random() * (max + 1 - min);
}


const randomIntegerInRange = (min, max) => {
  const rand = getNumberInRange(min, max);

  if (min >= max || min < 0 || max < 0) {
    // eslint-disable-next-line no-console
    console.log('error');
    return;
  }

  return (Math.floor(rand));
}


const getMapCoordinates = (min, max, symbolNumber = 1) => {
  const rand = getNumberInRange(min, max);

  if (min >= max || min < 0 || max < 0) {
    // eslint-disable-next-line no-console
    console.log('error');
    return;
  }

  return rand.toFixed(symbolNumber);
}


randomIntegerInRange(10, 20);
getMapCoordinates(10, 20, 3);
