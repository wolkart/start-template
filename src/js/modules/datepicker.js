import flatpickr from "flatpickr";
const Russian = require("flatpickr/dist/l10n/ru.js").default.ru;
const monthSelectPlugin = require("flatpickr/dist/plugins/monthSelect/index");

export const initFlatpickr = (selector = '.js-date-picker') => {
  const datePicker = document.querySelector(selector)
  if (!datePicker) return

  flatpickr(datePicker, {
    "locale": Russian,
    // nextArrow: '',
    // prevArrow: '',
    showMonths: 1,
    weekNumbers: false, // отображение номеров недель в календаре
    monthSelectorType: 'dropdown', // "dropdown" or "static"
  });
}