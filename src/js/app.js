import { ready } from "./modules/util/ready";
import { addEvent } from "./modules/util/add-event";
import { changeQuantity } from "./modules/util/quantity";
import { initSelect } from "./modules/select";
import { initMask } from "./modules/mask";
import { initLazy } from "./modules/lazy";
import { initGallery } from "./modules/gallery";
import { initRange } from "./modules/range";
import { initValidate } from "./modules/validation";
import { initPopup } from "./modules/popup";
import { customSelect } from "./modules/customSelect";
import { initFlatpickr } from "./modules/datepicker";

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

window.initApp = initApp;
