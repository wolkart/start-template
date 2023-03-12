import IMask from 'imask';

/**
 * https://github.com/uNmAnNeR/imaskjs - documentation
 * https://imask.js.org/ - demo
 *
 * Usage
 * <input type="text" data-input-mask="+{7} (000) 000-00-00" />
 */

export const initMask = () => {
  const inputs = document.querySelectorAll('[data-input-mask]');

  inputs.forEach((input) => {
    let maskPattern = input.dataset.inputMask;

    if (maskPattern.startsWith('/') && maskPattern.endsWith('/')) {
      maskPattern = new RegExp(maskPattern.slice(1, -1));
    }

    const mask = IMask(input, {
      mask: maskPattern,
      lazy: false,
      placeholderChar: '_',
    });

    mask.on('complete', () => {
      const event = new CustomEvent('complete', {
        detail: {
          el: input,
          mask,
        },
      });
      input.dispatchEvent(event);
    });
  });
}