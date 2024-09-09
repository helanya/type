interface Options {
  strings?: string
  speed?: number
  lifeLike?: Boolean
}

class TypeText {
  private element:HTMLElement
  private options:Options
  private isTyping:Boolean = false
  
  constructor(selector: string, options:Options = {}) {
    this.element = document.querySelector(selector) as HTMLElement
    this.options = options
    this.isTyping = false
  }

  go() {
    if (this.isTyping) return this
    this.isTyping = true
    const strings = this.options.strings || ''

    let index = 0
    let speed = this.options.speed || 0
    let delayTime = speed || 100

    const type = () => {
      if (this.options.lifeLike) {
        delayTime = speed * Math.random()
      }
      if (index < strings.length) {
        const textNode = document.createTextNode(strings[index])
        this.element.appendChild(textNode)
        index++
        setTimeout(type, delayTime)
      }
    }
    type()

    return this
  }
}

export default TypeText
