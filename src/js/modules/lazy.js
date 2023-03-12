import LazyLoad from 'vanilla-lazyload';

export const initLazy = () => {
  return new LazyLoad({
    elements_selector: '.js-lazy',
  });
}