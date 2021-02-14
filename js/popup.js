import {createOfferList} from './data.js';

const similarOffers = createOfferList();
const offerTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const singleOffer = offerTemplate.cloneNode(true);
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

const generateFeaturesList = (arr) => {
  const featuresList = document.createDocumentFragment();

  arr.forEach((item) => {
    const featureItem = document.createElement('li');
    featureItem.className = 'popup__feature';
    featureItem.classList.add('popup__feature--' + item.value);
    featuresList.appendChild(featureItem);
  })

  return featuresList;
}

const generatePhotosList = (arr) => {
  const photosList = document.createDocumentFragment();

  arr.forEach((item) => {
    const photoItem = document.createElement('img');
    photoItem.className = 'popup__photo';
    photoItem.src = item.value;
    photoItem.width = 45;
    photoItem.height = 40;
    photoItem.alt = 'Фотография жилья';
    photosList.appendChild(photoItem);
  })

  return photosList;
}

const createCard = (item) => {
  singleOffer.querySelector('.popup__title').textContent = item.offer.title;
  singleOffer.querySelector('.popup__text--address').textContent = item.offer.address;
  singleOffer.querySelector('.popup__text--price').textContent = item.offer.address + '<span>₽/ночь</span>';
  singleOffer.querySelector('.popup__type').textContent = translateType(item.offer.type);
  singleOffer.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' команды для ' + item.offer.guests + ' гостей.';
  singleOffer.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  generateFeaturesList(item.offer.features);
  singleOffer.querySelector('.popup__description').textContent = item.offer.description;
  generatePhotosList(item.offer.photos);
  singleOffer.querySelector('.popup__avatar').src = item.author;
  map.appendChild(item);
}

// similarOffers.forEach((offer) => {
//   createCard(offer);
// })

export {similarOffers}

