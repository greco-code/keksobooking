import './popup.js';
import './form.js';
import './success.js';
import './map.js';
import {getData} from './server.js';
import {cleanMarkers} from './map.js';
import {showGetErrorMessage} from './error.js';
import {validateForm} from './form.js';
import {disableForms} from './state.js';
import {onDataSuccess} from './popup.js';

validateForm();

const showOnFail = () => {
  showGetErrorMessage();
  disableForms();
}

// getData((data) => {
//   renderMarkers(data)
// }, showOnFail);


getData(
  onDataSuccess,
  showOnFail,
);

cleanMarkers();


