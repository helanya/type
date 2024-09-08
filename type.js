(function (root) {
  function insertCss(cssContent) {
    const style = document.createElement('style')
    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = cssContent;
    } else {
      style.appendChild(document.createTextNode(cssContent));
    }

    document.body.appendChild(style);
  }

  class CType {
    constructor(selector, options = {}) {
      this.element = document.querySelector(selector)
      this.text = options.text || ''
      this.speed = options.speed || 100
      this.isTyping = false;
      this.lifeLike = options.lifeLike || true
      this._init()
    }

    _init() {
      // 插入样式
      this._insertStyle()
      // 插入光标
      this._insertCursor()
    }

    // 插入光标
    _insertCursor() {
      const cursorSpan = document.createElement('span')
      cursorSpan.textContent = '|'
      cursorSpan.classList.add('ctype-cursor')
      this.element.appendChild(cursorSpan)
    }

    // 设置定位
    _insertStyle() {
      this.element.style.position = 'relative'
      insertCss(`
        @keyframes blink {
          0% {
            opacity: 1;
          } 
          50% {
            opacity: 0;
          } 
          100% {
            opacity: 
            1;
          }
        } 

        .ctype-cursor {
          -webkit-animation: blink 1s infinite; 
          animation: blink 1s infinite; 
          position: absolute; 
          right: -5px;
        }
        `
      )
    }

    go() {
      if (this.isTyping) return this
      this.isTyping = true

      let index = 0
      let delayTime = this.speed

      const type = () => {
        if (this.lifeLike) {
          delayTime = this.speed * Math.random()
        }
        if (index < this.text.length) {
          const textNode = document.createTextNode(this.text[index])
          this.element.appendChild(textNode)
          index++
          setTimeout(type, delayTime)
        }
      }
      type()

      return this
    }
  }

  root.CType = CType
})(window)