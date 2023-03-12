/* eslint-disable */

import 'lightgallery.js';

/**
 * https://github.com/sachinchoolur/lightgallery.js/ - documentation
 * https://sachinchoolur.github.io/lightgallery.js/ - demo
 */

export const initGallery = () => {
  const gallery = document.querySelector('.js-gallery');

  if (gallery) {
    lightGallery(gallery, {
      download: false,
      counter: false,
      actualSize: false,
    });
  }
}