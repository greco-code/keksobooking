import {createOfferList} from './data.js';
import {declOfNum} from './util.js';

const similarOffers = createOfferList();
const offerTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const map = document.querySelector('#map-canvas');


const translateType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец'
  }
}

const generateFeaturesList = (arr, element) => {
  const featuresList = element.querySelector('.popup__features');
  featuresList.innerHTML = '';

  arr.forEach((item) => {
    const featureItem = document.createElement('li');
    featureItem.className = `popup__feature popup__feature--${item}`;
    featuresList.appendChild(featureItem);
  })

  return featuresList;
}

const generatePhotosList = (arr, element) => {
  const photosList = element.querySelector('.popup__photos');
  photosList.innerHTML = '';

  arr.forEach((item) => {
    const photoItem = document.createElement('img');
    photoItem.className = 'popup__photo';
    photoItem.src = item;
    photoItem.width = 45;
    photoItem.height = 40;
    photoItem.alt = 'Фотография жилья';
    photosList.appendChild(photoItem);
  })

  return photosList;
}

const declRooms = (number) => {
  return declOfNum(number, ['комната', 'комнаты', 'комнат']);
}

const declGuests = (number) => {
  return declOfNum(number, ['гостя', 'гостей', 'гостей']);
}

const createCard = ({author, offer}) => {
  const singleOffer = offerTemplate.cloneNode(true);
  const roomsTotal = offer.rooms;
  const guestsTotal = offer.guests;

  singleOffer.querySelector('.popup__title').textContent = offer.title;
  singleOffer.querySelector('.popup__text--address').textContent = offer.address;
  singleOffer.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  singleOffer.querySelector('.popup__type').textContent = translateType(offer.type);
  singleOffer.querySelector('.popup__text--capacity').textContent = `${roomsTotal}  ${declRooms(roomsTotal)} для ${guestsTotal} ${declGuests(guestsTotal)}.`;
  singleOffer.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}  выезд до ${offer.checkout}`;
  singleOffer.querySelector('.popup__description').textContent = offer.description;
  singleOffer.querySelector('.popup__avatar').src = author;

  generateFeaturesList(offer.features, singleOffer);
  generatePhotosList(offer.photos, singleOffer);

  return singleOffer;
}


export {
  createCard,
  similarOffers,
  map
}

