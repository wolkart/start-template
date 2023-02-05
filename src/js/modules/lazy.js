import LazyLoad from 'vanilla-lazyload';

function initLazy() {
  const lazyLoadInstance = new LazyLoad({
    elements_selector: '.js-lazy',
  });

  return lazyLoadInstance;
}

export default initLazy;
