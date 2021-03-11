import {cleanMarkers, renderMarkers} from './map.js';
import {debounce} from './util.js';

const filterForm = document.querySelector('.map__filters');
const filterType = filterForm.querySelector('#housing-type');
const filterPrice = filterForm.querySelector('#housing-price');
const filterRooms = filterForm.querySelector('#housing-rooms');
const filterGuests = filterForm.querySelector('#housing-guests');
const filterFeatures = filterForm.querySelector('#housing-features');
const NOT_SELECTED = 'any'
const HIGH_PRICE_VALUE = 'high'
const LOW_PRICE_VALUE = 'low'
const MIDDLE_PRICE_VALUE = 'middle'
const RENDER_DELAY = 500;
const IMMEDIATE_RENDER = true;
const CARDS_COUNT = 10;

const PRICE_TRANSLATE = {
  low: 10000,
  high: 50000,
}

const filterByType = (card) => card.offer.type === filterType.value || filterType.value === NOT_SELECTED;
const filterByRooms = (card) => card.offer.rooms === Number.parseInt(filterRooms.value, 10) || filterRooms.value === NOT_SELECTED;
const filterByGuests = (card) => card.offer.guests === Number.parseInt(filterGuests.value, 10) || filterGuests.value === NOT_SELECTED;

const filterByPrice = (card) => {
  switch (filterPrice.value) {
    case HIGH_PRICE_VALUE:
      return card.offer.price > PRICE_TRANSLATE['high'];
    case MIDDLE_PRICE_VALUE:
      return card.offer.price >= PRICE_TRANSLATE['low'] && card.offer.price <= PRICE_TRANSLATE['high'];
    case LOW_PRICE_VALUE:
      return card.offer.price < LOW_PRICE_VALUE;
    default:
      return true;
  }
}

const filterByFeatures = (card) => {
  const checkedFeatures = filterFeatures.querySelectorAll('input:checked');

  if (checkedFeatures.length === 0) {
    return true;
  }

  for (let feature of checkedFeatures) {
    if (!card.offer.features.includes(feature.value)) {
      return false;
    }
  }

  return true;
}

const filterMarkers = (cards) => {
  let filteredCards = [];

  for (let card of cards) {
    if (filterByType(card) &&
      filterByRooms(card) &&
      filterByGuests(card) &&
      filterByPrice(card) &&
      filterByFeatures(card) &&
      filteredCards.length <= CARDS_COUNT) {
      filteredCards.push(card);
    }
  }

  return filteredCards;
}

const updateMarkers = debounce((data) => {
  const filteredData = filterMarkers(data);
  cleanMarkers();
  renderMarkers(filteredData);
}, RENDER_DELAY, IMMEDIATE_RENDER)

const setFilterListener = (data) => {
  filterForm.addEventListener('change', () => {
    updateMarkers(data);
  })
}


export {setFilterListener}
