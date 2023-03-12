import select from 'tail.select/js/tail.select-full';

/**
 * https://github.pytes.net/tail.select/ - examples
 * https://github.com/pytesNET/tail.select - documentation
 */

const tail = { select };

export const initSelect = (element = document.querySelectorAll('.js-select')) => {
  const arrSelect = [];

  element.forEach((item) => {
    const count = item.hasAttribute('data-count')

    const selectField = tail.select(item, {
      animate: true,
      classNames: 'select-item',
      csvOutput: false,
      csvSeparator: ',',
      descriptions: false,
      deselect: true,
      disabled: !!item.disabled,
      height: 250,
      hideDisabled: false,
      hideSelected: false,
      items: {},
      locale: 'ru',
      linguisticRules: {
        е: 'ё',
      },
      multiLimit: Infinity,
      multiPinSelected: false,
      multiContainer: false,
      multiShowCount: count,
      multiShowLimit: false,
      multiSelectAll: false,
      multiSelectGroup: true,
      openAbove: null,
      placeholder: 'Выберите вариант',
      search: !!item.getAttribute('data-search'),
      searchConfig: ['text', 'value'],
      searchFocus: true,
      searchMarked: true,
      searchMinLength: 1,
      searchDisabled: true,
      sortItems: true,
      sortGroups: false,
      sourceBind: false,
      sourceHide: true,
      startOpen: false,
      stayOpen: false,
      width: null,
      cbComplete: undefined,
      cbEmpty: undefined,
      cbLoopItem: undefined,
      cbLoopGroup: undefined,
    });

    arrSelect.push(selectField);
  });

  return arrSelect;
};