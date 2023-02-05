/**
 *
 * @param {function} callback
 *
 * Usage
 * ready(() => {
 *  console.log(111)
 * });
 */

function ready(callback) {
  if (document.readyState !== 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
}

export default ready;
