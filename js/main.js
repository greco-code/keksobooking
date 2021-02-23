import './data.js';
import './popup.js';
import {disableForms} from './state.js';
import {validateForm} from './form.js';
import {createMap} from './map.js';

disableForms();
createMap();
validateForm();
