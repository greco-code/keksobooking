import '../css/normalize.css';
import '../css/style.css';
import './popup.js';
import './form.js';
import './success.js';
import './map.js';
import {getData} from './server.js';
import {renderMarkers} from './map.js';
import {showGetErrorMessage} from './error.js';
import {validateForm} from './form.js';
import {disableForms} from './state.js';
import {setFilterListener} from './filter.js';


const onDataSuccess = (data) => {
  renderMarkers(data);
  setFilterListener(data);
}

const onDataFail = () => {
  showGetErrorMessage();
  disableForms();
}


validateForm();
getData(onDataSuccess, onDataFail);

