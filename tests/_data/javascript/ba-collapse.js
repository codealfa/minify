/*
 * BaCollapse - Javascript Collapse
 * Copyright (c) 2010 BestAddon.com
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
/* global IntersectionObserver, BaCollapse */

((win, doc, ba) => {
  'use strict'
  const wrap = (el) => { const w = doc.createElement('div'); el.parentNode.insertBefore(w, el); w.appendChild(el) }
  const on = (el, ev, fn) => el && ev.split(/\s+/).forEach(e => el.addEventListener(e, fn, false))
  const merge = (a, b) => Object.assign(a, b)

  const cookie = (name, value, days) => {
    // if value is undefined, get the cookie value
    if (value === []._) {
      const cookiestring = '; ' + doc.cookie
      const cookies = cookiestring.split('; ' + name + '=')
      return cookies.length === 2 ? cookies.pop().split(';').shift() : null
    } else {
      // if value is a false boolean, we'll treat that as a delete
      if (value === false) days = -1
      let expires = ''
      if (days) {
        const date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = '; expires=' + date.toGMTString()
      }
      doc.cookie = name + '=' + value + expires + '; path=/'
    }
  }

  // IntersectionObserver
  const isIO = (!!win.IntersectionObserver && !!win.IntersectionObserverEntry)
  const onIO = (element, callback, options) => { // options { root: null, rootMargin: '0px', threshold: 0 }
    if (element) new IntersectionObserver(callback, options).observe(element)
  }

  const onVisible = (element, callback) => {
    onIO(element, (entries, observer) => {
      entries.forEach(entry => callback(entry.intersectionRatio > 0 || entry.isIntersecting))
    }, { rootMargin: '350px' })
  }

  function Main (obj, options) { // eslint-disable-line no-unused-vars
    if (!obj) return
    const self = this
    const defaults = { // set default options
      width: '100%',
      height: 'auto', // For Horizontal
      horizontal: false,
      header: 'li > :first-child', // .ba__header
      speed: '500ms',
      defaultid: 0,
      event: 'click', // click, mouseenter
      openSingle: true, // You can open 1 or many items same time
      collapsible: true,
      preload: false,
      icons: ['<i class="toggle__icon plus"><svg viewBox="0 0 32 32" fill="none" stroke="currentcolor" stroke-width="2"><path d="M16 2 L16 30 M2 16 L30 16" /></svg></i>', '<i class="toggle__icon minus"><svg viewBox="0 0 32 32" fill="none" stroke="currentcolor" stroke-width="2"><path d="M2 16 L30 16" /></svg></i>'], // font HTML Tags
      iconAlign: 1, // true = Left, false = right
      style: 'style17',
      animateInName: 'fadeIn',
      animateInDuration: null, // Time in seconds (s) or milliseconds (ms). ex: '800ms'
      animateInDelay: '30ms',
      animateOutName: 'fadeOut',
      animateOutDuration: null, // ex: '500ms'
      animateOutDelay: '0ms',
      breakPoint: true,
      breakPointWidth: 576,
      saveState: false,
      showCount: true,
      parentLink: false, // Disable the parent link
      onInit: () => { }, // Callback: Fires after the accordions initially setup
      onBeforeOpen: () => { }, // Callback: Fires before accordion opens content
      onOpen: () => { }, // Callback: Fires after accordion opens content
      onBeforeClose: () => { }, // Callback: Fires before accordion close content
      onClose: () => { }, // Callback: Fires after accordion close content
      scroll: false, // Scroll to item on open
      scrollOffset: 0, // Set number of scroll
      className: 'ba__collapse',
      contentWrap: false,
      stick: null, // default, accordion, dropdown
      interval: 0,
      hoverpause: false,
      dots: true,
      dotEvent: 'click', // click, mouseenter
      dotSelector: null,
      keyNav: false,
      nextPrev: true,
      hash: true // Boolean: Open item with id on hash change
    }
    const opts = self.settings = merge(defaults, JSON.parse(obj.getAttribute('data-options')) || options)
    const classes = {}
    'wrapper,main,header,caption,item,toggle,body,group,animate,stick,count,active,show,loading'.split(',')
      .forEach(el => { classes[el] = opts.className + '-' + el })
    let stickEl, objPlay, isResize, body
    let allowToggle = true
    let isX = opts.horizontal
    const wrapper = obj.parentElement
    const queryAll = (s, c) => [].slice.call((c || wrapper).querySelectorAll(s))
    const query = (s, c) => queryAll(s, c)[0]
    const headers = queryAll(opts.header || 'h3')

    const _content = el => {
      const tag = el.getAttribute('data-' + opts.className + '-target')
      return tag ? query(tag, doc) : el.nextElementSibling
    }
    const _filter = (item, boolean) => items.filter(els => els.contains(+item === item ? items[item] : item) !== !!boolean)

    const items = headers.map(el => {
      body = _content(el)
      if (body) {
        body.classList.add(classes.group)
        if (opts.contentWrap) {
          wrap(body)
          body.parentElement.classList.add(classes.body)
        }
        el.classList.add(classes.toggle)
      }
      el.classList.add(classes.header)
      el.parentElement.className += ' ' + classes.item
      el.parentElement.style.cssText = 'width:auto;height:auto'
      return el.parentElement
    })
    self.index = (opts.defaultid >= 0 && opts.defaultid < items.length) ? opts.defaultid : -1

    const _addHashchange = () => {
      if (!opts.hash) return

      const hashChange = function () {
        const el = query(win.location.hash || 'ðŸ˜„')
        if (el && !el.classList.contains(classes.active)) {
          self.closeAll()
          self.open(el)
        }
      }

      hashChange()
      on(win, 'hashchange', e => {
        hashChange()
        if ('pushState' in win.history) {
          win.history.pushState('', document.title, win.location.pathname + win.location.search)
        }
      })
    }

    const _setSize = () => {
      const mobileSize = win.innerWidth < parseInt(opts.breakPointWidth)
      wrapper.classList[!mobileSize ? 'remove' : 'add'](classes.wrapper + '-phone')
      obj.classList[!mobileSize ? 'remove' : 'add'](opts.className + '-phone')
      if (opts.horizontal && opts.height) {
        if (opts.breakPoint) {
          isX = !mobileSize
          obj.classList[mobileSize ? 'remove' : 'add'](opts.className + '-x')
        }

        const realHeight = Math.round(wrapper.offsetWidth / (100 / parseFloat(opts.height))) + 'px'
        wrapper.style.height = opts.height.indexOf('%') > -1 ? realHeight : opts.height
        const objHeight = obj.offsetHeight

        isX && headers.forEach(el => {
          if (el.children[0]) {
            el.children[0].style.cssText = 'width:' + objHeight + 'px;height:' + el.offsetWidth + 'px'
          }
          const bodyParent = el.closest('.' + classes.group)
          body = _content(el)
          if (body && body.children[0]) {
            const xSpacer = [].reduce.call(bodyParent.children, (data, el) => {
              const style = win.getComputedStyle(el)
              data += parseInt(style.marginLeft) + parseInt(style.marginRight) + parseInt(style.paddingLeft) + parseInt(style.paddingRight)
              return data
            }, 0)
            body.children[0].style.width = (bodyParent.offsetWidth - (el.offsetWidth * bodyParent.children.length) - xSpacer) + 'px'
          }
        })
      }
    }

    const _action = (els, close) => {
      els = els.nodeType ? [els] : els
      els.forEach(el => {
        const size = isX ? 'width' : 'height'
        const sizeValue = isX ? 'scrollWidth' : 'scrollHeight'
        const header = el.children[0]
        const body = _content(header)
        const icon = query('.toggle__icon', header)
        if (icon) icon.outerHTML = opts.icons[close ? 0 : 1]

        if (body) {
          let bodySize = body[sizeValue] + 'px'
          body.style.transitionDuration = '0ms'
          body.parentElement.classList[close ? 'remove' : 'add'](classes.show)
          body.style[size] = el.classList.contains(classes.active) ? bodySize : 0

          // Set animation for content
          opts[close ? 'onBeforeClose' : 'onBeforeOpen'].call(self)
          bodySize = body[sizeValue] + 'px'
          body.style.transitionDuration = opts.speed
          body.style[size] = close ? 0 : bodySize
          if (opts.animateInName) _animate([...body.children], close)

          on(body, 'transitionend', function (e) {
            body.style[size] = ''
            // SCROLL TO ITEM ON OPEN & VERTICAL ONLY /////////////
            if (!close && opts.scroll && !isX && el.classList.contains(classes.active) && e.target.classList.contains(classes.body)) {
              if (opts.onCustomScroll) opts.onCustomScroll.call(self)
              else self.scrollY(el, opts.scrollOffset)
            }
            opts[close ? 'onClose' : 'onOpen'].call(self)
          })
        }

        el.classList[close ? 'remove' : 'add'](classes.active)
        _media(el, close)
      })

      // FOR PAGER ///////////////
      if (self.pager) {
        self.pager.forEach((el, i) => {
          el.className = i === self.index ? 'active' : ''
          if (opts.stick && stickEl && i === self.index) stickEl.innerHTML = el.innerHTML
        })
      }
    }

    const _animate = (els, out) => {
      els.forEach((child, id) => {
        if (child && child.style) {
          child.className = classes.animate + (opts.contentWrap ? ' ' + classes.group : '')
          child.style.animationDuration = opts['animate' + (out ? 'Out' : 'In') + 'Duration'] || opts.speed
          child.style.animationDelay = (id * parseInt(opts['animate' + (out ? 'Out' : 'In') + 'Delay'])) + 'ms'
          child.classList[out ? 'remove' : 'add'](opts.animateInName)
          child.classList[out ? 'add' : 'remove'](opts.animateOutName)
        }
      })
    }

    // Retrieve cookie value and set active items
    const _getCookie = cookieId => {
      const cookieVal = cookie(cookieId)
      if (cookieVal !== null) { // create array from cookie string
        cookieVal.split(',').forEach(value => value >= 0 && _action(items[value]))
      }
    }

    // Write cookie
    const _setCookie = cookieId => {
      const activeIndex = queryAll('.' + classes.active).map(el => items.indexOf(el))
      cookie(cookieId, activeIndex.length ? activeIndex : false, 30) // Store in cookie
    }

    // Stop an iframe or HTML5 <video><audio> from playing
    const _media = (element, close) => {
      const els = queryAll('iframe,video,audio', element)
      if (els.length > 0) {
        els.forEach(el => {
          if (el.nodeName.toLowerCase() === 'iframe') {
            if (!el.hasAttribute('data-src')) el.setAttribute('data-src', el.src)
            el.src = !close ? el.getAttribute('data-src') : ''
          } else {
            if (el.hasAttribute('autoplay') && !close) { el.play() } else { el.pause(); el.currentTime = 0 }
          }
        })
      }
    }

    const _controls = () => {
      if (opts.dots) { // Build pager if it doesn't already exist and if enabled
        if (opts.dotSelector) {
          self.pager = queryAll(opts.dotSelector)
        } else {
          const ulPager = doc.createElement('ul')
          ulPager.className = 'pager ' + opts.className + '-dots'
          ulPager.innerHTML = items.map((item, i) => '<li><span>' + (i + 1) + '</span></li>').join('')
          wrapper.appendChild(ulPager)
          self.pager = [...ulPager.children]
        }
        if (self.pager[self.index]) self.pager[self.index].className = 'active'
        self.pager.forEach(el => {
          on(el, opts.dotEvent, function () {
            self.stop()
            _goto(self.pager.indexOf(this)) // set the slide index based on pager index
          })
        })
      }

      if (opts.nextPrev) {
        obj.insertAdjacentHTML('afterend', '<span class="' + opts.className + '-arrows prev">&larr; Prev</span><span class="' + opts.className + '-arrows next">Next &rarr;</span>');
        [...wrapper.children].filter(el => el.classList.contains(opts.className + '-arrows'))
          .forEach(el => {
            on(el, 'click', function (e) {
              self.stop()
              _goto(self.index + (e.target.className.indexOf('prev') > -1 ? -1 : 1))
            })
          })
      }

      if (opts.keyNav) { // Add keyboard navigation
        on(document, 'keyup', function (e) {
          if ([32, 37, 39].indexOf(e.which) > -1) {
            e.preventDefault()
            self.stop()
            const key = e.which || e.keyCode || 0
            if ([32, 33, 34, 37, 38, 39, 40].indexOf(key) !== -1) {
              _goto(self.index + ([33, 37, 38].indexOf(key) >= 0 ? -1 : 1))
            }
          }
        })
      }

      if (opts.hoverpause && opts.interval > 0) { // Pause the slider on hover
        on(obj, 'pointerover', self.stop)
        on(obj, 'pointerout', self.play)
      }
    }

    // Write cookie
    const _goto = id => {
      self.index = (id !== []._ ? id + items.length : self.index + 1) % items.length
      _action(_filter(self.index))
      _action(_filter(self.index, true), true) // CLOSE OTHER
    }

    const _load = callback => {
      if (query('img') && opts.preload) {
        obj.insertAdjacentHTML('beforebegin', '<div style="width:1px;position:absolute;top:45%;left:calc(50% - 4em);text-align:right;font-weight:bold;color:#9196a8;padding:.3em 0;z-index:9;line-height:1;border-bottom:5px solid #0d6efd;text-shadow:0 0 1px #e1e1e1;" class="' + classes.loading + '">0%</div>')
        const load = obj.previousElementSibling
        let imgsLoaded = 0
        for (let i = 0, img, unit, images = queryAll('img'); i < images.length; i++) {
          img = new win.Image()
          img.onerror = () => { obj.innerHTML = 'ERROR! The image does not exist.' }
          img.onload = () => {
            imgsLoaded++
            unit = Math.min(Math.floor((imgsLoaded + 1) / images.length * 100), 100)
            if (load) {
              load.innerHTML = unit + '%'
              load.style.width = unit + 'px'
            }
            if (imgsLoaded === images.length) {
              if (load) load.outerHTML = ''
              setTimeout(callback, 10)
            }
          }
          img.src = images[i].src
        }
      } else {
        setTimeout(callback, 10)
      }
    }

    // Set accordion as dropdown menu in mobile
    const _stick = () => {
      if (opts.stick) {
        stickEl = doc.createElement('div')
        stickEl.className = classes.stick
        stickEl.setAttribute('data-rel', opts.stick)
        stickEl.innerHTML = self.pager ? self.pager[self.index].innerHTML : '&equiv;'
        wrapper.insertBefore(stickEl, obj)
        on(stickEl, 'click', function (e) {
          this.classList.add('active')
          on(doc, 'pointerup', function (e) {
            queryAll('.' + classes.stick).forEach(ele => {
              if (ele.classList.contains('active')) ele.classList.remove('active')
            })
          })
        })
      }
    }

    self.action = (id, setClose) => { // id = Math.abs(id) % items.length
      headers.forEach(el => {
        const item = el.parentElement
        let panel = _content(el)
        if (item.contains(items[id])) {
          self.stop()
          _action(item, !!setClose)
        }
        if (opts.showCount && item.childElementCount > 1) {
          setTimeout(() => {
            const parentLink = queryAll('li>:not(.' + classes.toggle + '):not(ul):not(div)', item)
            const link = query('.' + classes.caption, item)
            if (link && parentLink.length) {
              link.insertAdjacentHTML('beforeend', ' <i class="' + classes.count + '">' + parentLink.length + '</i>')
            }
          }, 10)
        }

        const icon = panel && Array.isArray(opts.icons) ? (item.contains(items[id]) ? opts.icons[1] : opts.icons[0]) : ''
        if (!query('.' + classes.header + '-inside', el)) {
          el.innerHTML = '<span class="ba--title-inside ' + classes.header + '-inside">' + icon + '<span class="' + classes.caption + '">' + el.innerHTML + '</span></span>'
        }
        on(el, opts.event, function (e) { // open to selected item on header click
          self.stop()
          const target = this
          const li = target.closest('.' + classes.item)
          self.index = items.indexOf(li)
          panel = _content(target)
          if (allowToggle && panel) {
            allowToggle = false
            if (!opts.parentLink) e.preventDefault()
            _action(li, !!(opts.collapsible && li.classList.contains(classes.active))) // OPEN OR CLOSE THIS
            if (opts.openSingle) {
              _action(_filter(target, true), true) // CLOSE OTHER
            }

            // Write cookie if save state is on
            if (opts.saveState) _setCookie(wrapper.id)
            setTimeout(() => { allowToggle = true }, 300)
          }
        })
      })
    }

    self.scrollY = (target, spacer) => {
      const offsetTop = target.getBoundingClientRect().top + win.scrollY
      win.scrollTo({ top: parseInt(offsetTop) + spacer, behavior: 'smooth' })
    }

    self.open = item => _action(item)
    self.openAll = () => _action(items)
    self.close = item => _action(item, true)
    self.closeAll = () => _action(items, true)

    // Create a timer to control slide rotation interval
    self.play = () => {
      if (opts.interval > 0) {
        self.stop()
        objPlay = setTimeout(() => {
          _goto()
          // ***** RE-PLAY ****** //
          self.play()
        }, +opts.interval)
      }
    }
    self.stop = () => objPlay && clearTimeout(objPlay)

    self.init = () => {
      obj.className = opts.className + ' ' + opts.className + (isX ? '-x' : '-y') + ' ' + (opts.iconAlign ? 'icon__left' : 'icon__right') + ' ' + classes.group + ' ' + opts.style
      wrapper.style.width = opts.width
      wrapper.className = classes.wrapper + ' ItemReady '
      const idWrapper = classes.wrapper + '-' + queryAll('.' + classes.wrapper, doc).indexOf(wrapper)
      wrapper.id = idWrapper

      _controls()
      _stick()
      _addHashchange()

      wrapper.style.display = ''
      // start the timer for the first time
      self.action(self.index)
      if (opts.defaultid > items.length) self.openAll()
      self.play()

      // Check wrapper is show or hide
      if (isIO && opts.interval > 0) {
        onVisible(wrapper, visible => {
          if (visible) _setSize()
          self[visible ? 'play' : 'stop']()
        })
      } else _setSize()

      // bind setsize function to window resize event
      win.addEventListener('resize', () => {
        obj.classList.add('ba__resizing')
        _setSize()
        if (isResize) clearTimeout(isResize)
        isResize = setTimeout(() => obj.classList.remove('ba__resizing'), 200)
      })

      // Check Browser is active
      if (opts.interval > 0) {
        doc.addEventListener('visibilitychange', e => self[doc.hidden || !obj.offsetWidth ? 'stop' : 'play']())
      }

      if (opts.saveState) _getCookie(idWrapper)

      opts.onInit.call(self)
    }

    _load(self.init)
  }

  win[ba] = Main
})(window, document, 'BaCollapse');
((fn, d) => { /c/.test(d.readyState) ? fn() : d.addEventListener('DOMContentLoaded', fn) })(() => {
  [].forEach.call(document.querySelectorAll('[data-ba-collapse]'), (obj, i) => {
    if (!(window[obj.id || 'baCollapse' + i] instanceof BaCollapse)) { window[obj.id || 'baCollapse' + i] = new BaCollapse(obj) }
  })
}, document)