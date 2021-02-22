/* global L:readonly */

import {activateForm} from './state.js';

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

const mapPinIcon = L.icon(
  {
    iconUrl: '../leaflet/images/marker-icon.png',
    iconRetinaUrl: '../leaflet/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
  },
)

const marker = L.marker(
  {
    lat: 35.6895000,
    lng: 139.6917100,
  },
  {
    draggable: true,
    icon: mapPinIcon,
  },
)

marker.addTo(map);

const getMapCoordinates = () => {
  const {lat, lng} = marker.getLatLng();
  // console.log(`${lat.toFixed(5)} ${lng.toFixed(5)}`);
  return (`${lat.toFixed(5)} ${lng.toFixed(5)}`);
}

const getActualCoordinates = () => {
  return marker.on('moveend', getMapCoordinates);
}


export {getActualCoordinates};
