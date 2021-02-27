import './popup.js';
import './form.js';
import './success.js';
import './map.js';
import {getData} from './server.js';
import {renderMarkers} from './map.js';
import {showGetErrorMessage} from './error.js';
import {validateForm} from './form.js';

validateForm()
getData(renderMarkers, showGetErrorMessage);


