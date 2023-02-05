/* eslint-disable */
!('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)
  ? document.querySelector('html').classList.add('no-touch')
  : document.querySelector('html').classList.add('touch');
/* eslint-enable */
