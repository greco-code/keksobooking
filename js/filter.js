import {cleanMarkers, renderMarkers} from './map.js';

const filterForm = document.querySelector('.map__filters');
const filterType = filterForm.querySelector('#housing-type');
// const filterPrice = filterForm.querySelector('#housing-price');
const filterRooms = filterForm.querySelector('#housing-rooms');
// const filterGuests = filterForm.querySelector('#housing-guests');
// const filterFeatures = filterForm.querySelector('#housing-features');
const NOT_SELECTED = 'any'
const CARDS_COUNT = 10;

const filterByType = (card) => card.offer.type === filterType.value || filterType.value === NOT_SELECTED;
const filterByRooms = (card) => card.offer.rooms === Number.parseInt(filterRooms.value, 10) || filterRooms.value === NOT_SELECTED;


const filterMarkers = (cards) => {
  return cards
    .filter(card => filterByType(card) && filterByRooms(card))
    .slice(0, CARDS_COUNT);
}

const updateMarkers = (data) => {
  const filteredData = filterMarkers(data);
  cleanMarkers();
  renderMarkers(filteredData);
}

const setFilterListener = (data) => {
  filterForm.addEventListener('change', () => {
    updateMarkers(data);
  })
}


export {setFilterListener}
