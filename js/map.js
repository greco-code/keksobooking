/* global L:readonly */

import {activateForm} from './state.js';
import {createOfferList} from './data.js';

const points = createOfferList();

// console.log(createOfferList()[0].offer.title);


const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: 35.6895000,
    lng: 139.6917100,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMapIcon = L.icon(
  {
    iconUrl: '../img/main-pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  },
)

const secondaryMapIcon = L.icon(
  {
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  },
)

const marker = L.marker(
  {
    lat: 35.6895000,
    lng: 139.6917100,
  },
  {
    draggable: true,
    icon: mainMapIcon,
  },
)

marker.addTo(map);


points.forEach((point) => {
  const lat = point.location.x;
  const lng = point.location.y;

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: secondaryMapIcon,
    },
  );

  marker.addTo(map);
})


const getMapCoordinates = () => {
  const {lat, lng} = marker.getLatLng();
  // console.log(`${lat.toFixed(5)} ${lng.toFixed(5)}`);
  return (`${lat.toFixed(5)} ${lng.toFixed(5)}`);
}

const getActualCoordinates = () => {
  return marker.on('moveend', getMapCoordinates);
}


export {getActualCoordinates};
