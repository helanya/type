import { Options, TypeStatus } from './types'
import {
  DEFAULT_OPTIONS,
  CURSOR_CLASS_NAME
} from './constant'

class Typewriter {
  private element: HTMLElement
  private options: Options
  private cursor: HTMLElement
  private id: string
  private status: TypeStatus = TypeStatus.PENDING

  constructor(selector: string, options: Options = {}) {
    this.element = document.querySelector(selector) as HTMLElement
    this.options = Object.assign({}, DEFAULT_OPTIONS, options)
    this.id = `type-${(new Date()).getTime()}`
    this.element.dataset.id = this.id
    this.cursor = this.#createCursor()
  }

  start() {
    if (this.status === TypeStatus.STARTING) return this
    this.#setCursor()
    this.status = TypeStatus.STARTING
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
        this.element.insertBefore(textNode, this.element.querySelector('.type-cursor'))
        index++
        setTimeout(type, delayTime)
      } else {
        this.status = TypeStatus.FULFILLED
      }
    }
    type()

    return this
  }

  #createCursor() {
    let cursor = document.createElement('span')
    cursor.className = CURSOR_CLASS_NAME
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

export default Typewriter
