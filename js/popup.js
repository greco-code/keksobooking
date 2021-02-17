import {createOfferList} from './data.js';

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

const generateFeaturesList = (arr, clone) => {
  const featuresList = clone.querySelector('.popup__features');
  featuresList.innerHTML = '';

  arr.forEach((item) => {
    const featureItem = document.createElement('li');
    featureItem.className = 'popup__feature';
    featureItem.classList.add('popup__feature--' + item);
    featuresList.appendChild(featureItem);
  })

  return featuresList;
}

const generatePhotosList = (arr, clone) => {
  const photosList = clone.querySelector('.popup__photos');
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

const createCard = (add) => {
  const singleOffer = offerTemplate.cloneNode(true);
  singleOffer.querySelector('.popup__title').textContent = add.offer.title;
  singleOffer.querySelector('.popup__text--address').textContent = add.offer.address;
  singleOffer.querySelector('.popup__text--price').textContent = `${add.offer.price} ₽/ночь`;
  singleOffer.querySelector('.popup__type').textContent = translateType(add.offer.type);
  singleOffer.querySelector('.popup__text--capacity').textContent = `${add.offer.rooms}  команды для ${add.offer.guests} гостей.`;
  singleOffer.querySelector('.popup__text--time').textContent = `Заезд после ${add.offer.checkin}  выезд до ${add.offer.checkout}`;
  generateFeaturesList(add.offer.features, singleOffer);
  singleOffer.querySelector('.popup__description').textContent = add.offer.description;
  generatePhotosList(add.offer.photos, singleOffer);
  singleOffer.querySelector('.popup__avatar').src = add.author;
  return singleOffer;
}


export {
  createCard,
  similarOffers,
  map
}

