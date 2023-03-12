/**
 *
 * @param {function} callback
 *
 * Usage
 * ready(() => {
 *  console.log(111)
 * });
 */

export const ready = (callback) => {
  if (document.readyState !== 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
}