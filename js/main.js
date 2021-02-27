import './popup.js';
import './form.js';
import './success.js';
import {getData} from './server.js';
import {validateForm} from './form.js';
import {renderMarkers} from './map.js';
import {showGetErrorMessage} from './error.js';
// import {showErrorMessage} from './error.js';

validateForm();
getData(renderMarkers, showGetErrorMessage);
