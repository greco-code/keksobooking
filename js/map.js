/* global L:readonly */

import {activateForms, disableForms} from './state.js';
import {createCard} from './popup.js';

const LAT = 35.6895000;
const LNG = 139.6917100;
const TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ICON_HEIGHT = 40;
const ICON_WIDTH = 40;
const addressInput = document.querySelector('#address');

disableForms();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForms();
  })
  .setView({
    lat: LAT,
    lng: LNG,
  }, 10);

// Хз, он тут ругается, что я его не заюзал
// eslint-disable-next-line no-unused-vars
const copyright = L.tileLayer(
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
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: mainMapIcon,
  },
).addTo(map);

const renderMarkers = (arr) => {
  arr.forEach((card) => {
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

    marker
      .addTo(map)
      .bindPopup(createCard(card));
  })
}

const fillAddressInput = () => {
  const {lat, lng} = marker.getLatLng();
  addressInput.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
}

const onMoveFillAddressInput = () => {
  marker.on('move', fillAddressInput);
}

const resetMarker = () => {
  marker.setLatLng(L.latLng(LAT, LNG));
}


fillAddressInput();
onMoveFillAddressInput();


export {renderMarkers, fillAddressInput, resetMarker};
