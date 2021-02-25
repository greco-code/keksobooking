import {
  getNoRepeatElements,
  getRandomArrayElement,
  getRandomFloatingNumber,
  getRandomIntegerInRange
} from './util.js';


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

const photosList = new Array(getRandomIntegerInRange(1, PHOTOS.length))
  .fill(null)
  .map(() => getRandomArrayElement(PHOTOS));

const createOffer = () => {
  const lat = getRandomFloatingNumber(35.65000, 35.70000, 5);
  const lng = getRandomFloatingNumber(139.70000, 139.80000, 5);

  return {
    author: {
      avatar:`img/avatars/user0${getRandomIntegerInRange(1, 8)}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomIntegerInRange(0, 1000000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomIntegerInRange(1, 100),
      guests: getRandomIntegerInRange(1, 100),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getNoRepeatElements(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: photosList,
    },
    location: {
      lat: lat,
      lng: lng,
    },
  }
}

const createOfferList = () => {
  return new Array(OBJECT_COUNT)
    .fill(null)
    .map(() => createOffer());
}

export {
  createOfferList
};
