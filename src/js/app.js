import { ready, addEvent, changeQuantity } from './modules/util';

import {
  initLazy,
  initRange,
  initMask,
  initPopup,
  showPopup,
  initSelect,
  customSelect,
  initGallery,
  initValidate,
  initFlatpickr
} from './modules';

addEvent('keypress', '.js-only-numbers', ({ key }) => {
  if (!(key >= 0 && key <= 9)) {
    return false;
  }
  return true;
});

addEvent('click', '.js-decrement', (event) => {
  event.preventDefault();
  changeQuantity(event.target, -1);
});

addEvent('click', '.js-increment', (event) => {
  event.preventDefault();
  changeQuantity(event.target, 1);
});

addEvent('change', '.js-quantity', (event) => {
  const { target } = event;

  changeQuantity(event.target, 0);

  if (event.target.value < 1) {
    target.value = 1;
  }
});

function initApp() {
  initSelect();
  initMask();
  initLazy();
  initGallery();
  initRange();
  initValidate();
  initPopup();
  customSelect();
  initFlatpickr();
}

ready(() => {
  initApp();
});

window.initSelect = initSelect;
window.initMask = initMask;
window.initValidate = initValidate;
window.showPopup = showPopup;

window.initApp = initApp;
