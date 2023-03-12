/**
 * @param {string} eventName
 * @param {string} element
 * @param {function} callbak
 *
 * addEvent('click', '.node', (e) => console.log(e.target));
 */

export const addEvent = (eventName, element, callbak = (f) => f) => {
  const nodes = document.querySelectorAll(element);

  if (nodes.length > 0) {
    nodes.forEach((node) => {
      node.addEventListener(eventName, function handle(event) {
        callbak.call(this, event);
      });
    });
  }
}