function isOverflow(element, childSelector = '.popup__container') {
  const node = element.querySelector(childSelector);

  if (!node) return node;

  const viewportHeight = window.innerHeight;
  const modalHeight = node.clientHeight;
  const oveflow = modalHeight >= viewportHeight;

  return oveflow;
}

export default isOverflow;
