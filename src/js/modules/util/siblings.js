export const getSiblings = (elem) => Array.prototype.filter.call(
  elem.parentNode.children,
  (sibling) => sibling !== elem,
);