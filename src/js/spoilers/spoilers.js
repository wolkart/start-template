import { slideToggle, slideUp } from "../modules/util/slide-toggle";

const spoilersArray = document.querySelectorAll('[data-spoilers]')

if (spoilersArray.length > 0) {
  const spoilersRegular = Array.from(spoilersArray).filter((item, index, self) => {
    return !item.dataset.spoilers.split(',')[0]
  })

  if (spoilersRegular.length > 0) {
    initSpoilers(spoilersRegular)
  }

  const spoilersMedia = Array.from(spoilersArray).filter((item, index, self) => {
    return item.dataset.spoilers.split(',')[0]
  })

  if (spoilersMedia.length > 0) {
    const breakpointsArray = []

    spoilersMedia.forEach(item => {
      const params = item.dataset.spoilers
      const breakpoint = {}
      const paramsArray = params.split(',')

      breakpoint.value = paramsArray[0]
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
      breakpoint.item = item
      breakpointsArray.push(breakpoint)
    })

    let mediaQueries = breakpointsArray.map(item => {
      return `(${item.type}-width: ${item.value}px),${item.value},${item.type}`
    })
      .filter((item, index, self) => {
        return self.indexOf(item) === index
      })

    mediaQueries.forEach(breakpoint => {
      const paramsArray = breakpoint.split(',')
      const mediaBreakpoint = paramsArray[1]
      const mediaType = paramsArray[2]
      const matchMedia = window.matchMedia(paramsArray[0])
      const spoilersArray = breakpointsArray.filter(item => {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true
        }
      })

      matchMedia.addListener(() => {
        initSpoilers(spoilersArray, matchMedia)
      })

      initSpoilers(spoilersArray, matchMedia)
    })
  }

  function initSpoilers(spoilersArray, matchMedia = false) {
    spoilersArray.forEach(spoilersBlock => {
      spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock

      if (matchMedia.matches || !matchMedia) {
        spoilersBlock.classList.add('init')
        initSpoilerBody(spoilersBlock)
        spoilersBlock.addEventListener('click', setSpoilerAction)
      } else {
        spoilersBlock.classList.remove('init')
        initSpoilerBody(spoilersBlock, false)
        spoilersBlock.removeEventListener('click', setSpoilerAction)
      }
    })
  }

  function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
    const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]')

    if (spoilerTitles.length > 0) {
      spoilerTitles.forEach(spoilerTitle => {
        if (hideSpoilerBody) {
          spoilerTitle.removeAttribute('tabindex')
          if (!spoilerTitle.classList.contains('active')) {
            spoilerTitle.nextElementSibling.hidden = true
          }
        } else {
          spoilerTitle.setAttribute('tabindex', '-1')
          spoilerTitle.nextElementSibling.hidden = false
        }
      })
    }
  }

  function setSpoilerAction(e) {
    const {target} = e

    if (target.hasAttribute('data-spoiler') || target.closest('[data-spoiler]')) {
      const spoilerTitle = target.hasAttribute('data-spoiler') ? target : target.closest('[data-spoiler]')
      const spoilersBlock = spoilerTitle.closest('[data-spoilers]')
      const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false

      if (!spoilersBlock.querySelectorAll('.slide').length) {
        if (oneSpoiler && !spoilerTitle.classList.contains('active')) {
          hideSpoilerBody(spoilersBlock)
        }

        spoilerTitle.classList.toggle('active')
        slideToggle(spoilerTitle.nextElementSibling, 500)
      }
      e.preventDefault()
    }
  }

  function hideSpoilerBody(spoilersBlock) {
    const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler].active')

    if (spoilerActiveTitle) {
      spoilerActiveTitle.classList.remove('active')

      slideUp(spoilerActiveTitle.nextElementSibling, 500)
    }
  }
}