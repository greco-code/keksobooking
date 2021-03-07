/* global L:readonly */

import {activateForms, disableForms} from './state.js';
import {createCard, filterCards} from './popup.js';

const INITIAL_LAT = 35.6895000;
const INITIAL_LNG = 139.6917100;
const TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ICON_HEIGHT = 40;
const ICON_WIDTH = 40;
const addressInput = document.querySelector('#address');
const MAP_ZOOM = 10;
const CARDS_COUNT = 10;

disableForms();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForms();
  })
  .setView({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  }, MAP_ZOOM);

L.tileLayer(
  TILE,
  {
    attribution: COPYRIGHT,
  },
).addTo(map);

const mainMapIcon = L.icon(
  {
    iconUrl: '../img/main-pin.svg',
    iconSize: [ICON_WIDTH, ICON_HEIGHT],
    iconAnchor: [ICON_WIDTH / 2, ICON_HEIGHT],
  },
)

const mapIcon = L.icon(
  {
    iconUrl: '../img/pin.svg',
    iconSize: [ICON_WIDTH, ICON_HEIGHT],
    iconAnchor: [ICON_WIDTH / 2, ICON_HEIGHT],
  },
)

const marker = L.marker(
  {
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  },
  {
    draggable: true,
    icon: mainMapIcon,
  },
).addTo(map);
const markers = L.layerGroup();

const renderMarkers = (arr) => {
  arr
    .slice()
    .filter(filterCards)
    .slice(0, CARDS_COUNT)
    .forEach((card) => {
      const lat = card.location.lat;
      const lng = card.location.lng;

      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon: mapIcon,
        },
      );

      markers.addLayer(marker);

      marker
        .bindPopup(createCard(card));
    })
  markers.addTo(map);
}

const fillAddressInput = () => {
  const {lat, lng} = marker.getLatLng();
  addressInput.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
}

const resetMap = () => {
  marker.setLatLng(L.latLng(INITIAL_LAT, INITIAL_LNG));
  map.panTo(L.latLng(INITIAL_LAT, INITIAL_LNG));
}

fillAddressInput();
marker.on('move', () => fillAddressInput);

const cleanMarkers = () => {
  markers.clearLayers();
}


export {renderMarkers, fillAddressInput, resetMap, cleanMarkers, markers, map};
