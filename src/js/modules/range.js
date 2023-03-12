import noUiSlider from 'nouislider';

/**
 * https://refreshless.com/nouislider/
 */

export const initRange = () => {
  const ranges = document.querySelectorAll('.js-range');

  if (!ranges) return;

  ranges.forEach((range) => {
    const dataMin = parseInt(range.getAttribute('data-min'), 10);
    const dataMax = parseInt(range.getAttribute('data-max'), 10);
    const inputMin = range.parentElement.querySelector('.js-min-value');
    const inputMax = range.parentElement.querySelector('.js-max-value');
    const inputs = [inputMin, inputMax];

    noUiSlider.create(range, {
      start: [dataMin, dataMax],
      tooltips: true,
      connect: true,
      range: {
        min: dataMin,
        max: dataMax,
      },
      format: {
        to(value) {
          return Math.round(value);
        },
        from(value) {
          return Math.round(value);
        },
      },
    });

    range.noUiSlider.on('update', (values, handle) => {
      inputs[handle].value = values[handle];
    });
    inputs.forEach((input, handle) => {
      input.addEventListener('change', (e) => {
        range.noUiSlider.setHandle(handle, e.target.value);
      });
    });
  });
}