import './popup.js';
import './form.js';
import './success.js';
import './map.js';
import {getData} from './server.js';
import {renderMarkers} from './map.js';
import {showGetErrorMessage} from './error.js';
import {validateForm} from './form.js';
import {disableForms} from './state.js';

const CARDS_COUNT = 10;

validateForm();

const showOnFail = () => {
  showGetErrorMessage();
  disableForms();
}

getData((data) => {
  renderMarkers(data.slice(0, CARDS_COUNT))
}, showOnFail);


