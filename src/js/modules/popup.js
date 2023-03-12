/* Usage
<button type="button" class="js-show-popup" data-popup-class="callback">Button</button>
<div class="popup js-callback">
    <div class="popup__container">
        <span class="popup__close js-close-popup">close</span>
        <span class="popup__title">Ttile</span>
        <p>Text</p>
    </div>
</div>
*/
import { isOverflow } from "./util/is-overflow";

let popup;

const html = document.querySelector('html');

function closePopup() {
  if (popup) {
    popup.classList.remove('visible');
    html.classList.remove('hidden-overflow');
  }
}

function showPopup(selector) {
  popup = document.querySelector(selector);
  popup.classList.add('visible');
  html.classList.add('hidden-overflow');

  if (isOverflow(popup)) {
    popup.classList.add('overflow');
  } else {
    popup.classList.remove('overflow');
  }
}

function initPopup() {
  document.addEventListener('click', ({ target }) => {
    const popupNode = target.closest('.js-show-popup');
    const closeNode = target.closest('.js-close-popup');

    if (popupNode) {
      const data = popupNode.getAttribute('data-popup-class');

      showPopup(`.js-${data}`);
    }

    if (closeNode) {
      closePopup();
    }
  });

  document.addEventListener('mousedown', ({ target }) => {
    const visiblePopupNode = target.classList.contains('visible', 'popup');

    if (visiblePopupNode) {
      closePopup();
    }
  });

  document.addEventListener('keyup', ({ key }) => {
    if (key === 'Escape') {
      closePopup();
    }
  });
}

export { initPopup, showPopup };
