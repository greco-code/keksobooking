import {declOfNum} from './util.js';
import {cleanMarkers, renderMarkers} from './map.js';
import {saveToStore} from './store.js';
import {markers, map} from './map.js';

const ROOM_WORDS = ['комната', 'комнаты', 'комнат'];
const GUEST_WORDS = ['гостя', 'гостей', 'гостей'];
const filterForm = document.querySelector('.map__filters');
const filterType = filterForm.querySelector('#housing-type');
// const filterPrice = filterForm.querySelector('#housing-price');
// const filterRooms = filterForm.querySelector('#housing-rooms');
// const filterGuests = filterForm.querySelector('#housing-guests');
// const filterFeatures = filterForm.querySelector('#housing-features');

const offerTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');


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

const filterCards = (card) => card.offer.type === filterType.value || filterType.value === 'any';

const createCard = ({author, offer}) => {
  const singleOffer = offerTemplate.cloneNode(true);
  const roomsTotal = declOfNum(offer.rooms, ROOM_WORDS);
  const guestsTotal = declOfNum(offer.guests, GUEST_WORDS);

  singleOffer.querySelector('.popup__title').textContent = offer.title;
  singleOffer.querySelector('.popup__text--address').textContent = offer.address;
  singleOffer.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  singleOffer.querySelector('.popup__type').textContent = translateType(offer.type);
  singleOffer.querySelector('.popup__text--capacity').textContent = `${offer.rooms}  ${roomsTotal} для ${offer.guests} ${guestsTotal}.`;
  singleOffer.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}  выезд до ${offer.checkout}`;
  singleOffer.querySelector('.popup__description').textContent = offer.description;
  singleOffer.querySelector('.popup__avatar').src = author.avatar;

  generateFeaturesList(offer.features, singleOffer);
  generatePhotosList(offer.photos, singleOffer);

  return singleOffer;
}
// Я тут две переменные экспортировал, это, вроде, нехорошо
const onDataSuccess = (data) => {
  saveToStore(data);
  renderMarkers(data);
  filterForm.addEventListener('change', (data) => {
    markers.clearLayers();
    cleanMarkers();
    map.closePopup();
    // todo не работает
    renderMarkers(data);
  });
}


export {
  createCard,
  filterCards,
  onDataSuccess
}

