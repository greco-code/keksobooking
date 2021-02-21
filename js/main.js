import './data.js';
import {createOffer, similarOffers} from './popup.js';
import {validateForm} from './form.js';


const map = document.querySelector('#map-canvas');


map.appendChild(createOffer(similarOffers[0]));

validateForm();
