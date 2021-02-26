import {renderMarkers} from './map.js';
import {showGetErrorMessage} from './error.js';

fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((data) => {
    renderMarkers(data);
  })
  .catch(() => {
    showGetErrorMessage();
  })
