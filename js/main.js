'use strict'

const TITLES = [
  'Hello world1',
  'Hello world2',
  'Hello world3',
  'Hello world4',
  'Hello world5',
]

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
]

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
]

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
]

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
]

const DESCRIPTIONS = [
  'Топовая комнатка',
  'АААгонь просто',
  'Збс помещение',
  'Я программирую на HTML',
]

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
]

const OBJECT_COUNT = 10;


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

const getRandomArray = (arr) => arr[getRandomIntegerInRange(0, arr.length - 1)];

const getAddress = () => {
  return {
    x: getRandomFloatingNumber(35.65000, 35.70000, 5),
    y: getRandomFloatingNumber(139.70000, 139.80000, 5),
  }
}

const getFeatures = () => {
  const featuresList = [];

  FEATURES.forEach((f) => {
    if (Math.random() > 0.5) {
      return;
    }

    featuresList.push(f);
  })

  return featuresList;
}


const photosList = new Array(getRandomIntegerInRange(1, PHOTOS.length))
  .fill(null)
  .map(() => getRandomArray(PHOTOS));

const getObject = () => {
  const coordinates = getAddress();

  return {
    author: `img/avatars/user0${getRandomIntegerInRange(1, 8)}.png`,
    offer: {
      title: getRandomArray(TITLES),
      address: coordinates,
      price: getRandomIntegerInRange(0, 1000000),
      type: getRandomArray(TYPES),
      rooms: getRandomIntegerInRange(1, 100),
      guests: getRandomIntegerInRange(1, 100),
      checkin: getRandomArray(CHECKIN),
      checkout: getRandomArray(CHECKOUT),
      features: getFeatures(),
      description: getRandomArray(DESCRIPTIONS),
      photos: photosList,
    },
    location: coordinates,
  }
}

const objectsList = new Array(OBJECT_COUNT)
  .fill(null)
  .map(() => getObject());

// eslint-disable-next-line no-console
console.log(objectsList);
