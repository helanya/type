interface Options {
  strings?: string
  speed?: number
  lifeLike?: Boolean
}

export let cursorFontStyles = {
  "font-family": "",
  "font-weight": "",
  "font-size": "",
  "font-style": "",
  "line-height": "",
  color: "",
  transform: "translateX(-.125em)",
} as const

class TypeText {
  private element: HTMLElement
  private options: Options
  private isTyping: Boolean = false
  private cursor: HTMLElement
  private id: string

  constructor(selector: string, options: Options = {}) {
    this.element = document.querySelector(selector) as HTMLElement
    this.options = options
    this.isTyping = false
    this.id = `type-${(new Date()).getTime()}`
    this.element.dataset.id = this.id
    this.cursor = this.#createCursor()
  }

  start() {
    if (this.isTyping) return this
    this.#setCursor()
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

  #createCursor() {
    let cursor = document.createElement('span')
    cursor.className = 'type-cursor'
    cursor.innerHTML = '|'
    cursor.animate(
      [
        { opacity: 0 },
        { opacity: 0 },
        { opacity: 1 }
      ],
      {
        duration: 800,
        iterations: Infinity
      }
    )
    return cursor
  }

  #setCursor() {
    if (this.cursor) {
      this.element.append(this.cursor)
      this.#setCursorStyle()
    }
  }

  #setCursorStyle() {
    const elementSelector = `[data-id='${this.id}']`
    const cursorSelector = `${elementSelector} .type-cursor`

    let styleBlock: HTMLElement = document.createElement("style")
    styleBlock.id = this.id
    styleBlock.appendChild(document.createTextNode(`${cursorSelector} { display: inline-block; width: 0;}`,));
    document.head.appendChild(styleBlock);
  }

}

export default TypeText
