export const customSelect = (selector = '.js-custom-select') => {
  const selects = document.querySelectorAll(selector)
  if (!selects) return

  const hideAllSelects = (selects) => {
    selects.forEach(select => {
      select.classList.remove('show')
    })
  }

  const initSelect = (event) => {
    const {target} = event
    const selectBtn = target.closest('.custom-select__btn')
    const select = target.closest(selector)

    if (selectBtn) {
      if (select.classList.contains('show')) {
        select.classList.remove('show')
        return
      }

      hideAllSelects(selects)

      select.classList.add('show')
    }

    if (!target.closest(selector)) {
      hideAllSelects(selects)
    }
  }

  document.addEventListener('click', initSelect)
}