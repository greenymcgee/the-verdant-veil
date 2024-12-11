export class FocusOutlineManager {
  private container: HTMLElement

  constructor() {
    this.container = document.documentElement
  }

  private setFocusDisabled(disabled: boolean) {
    this.container.classList.toggle('focus-disabled', disabled)
  }

  private handleKeyDown = ({ key }: KeyboardEvent) => {
    if (key !== 'Tab') return

    this.reset()
    this.container.addEventListener('mousedown', this.handleMouseDown)
  }

  private handleMouseDown = () => {
    this.reset()
    this.setFocusDisabled(true)
    this.container.addEventListener('keydown', this.handleKeyDown)
  }

  public start() {
    this.container.addEventListener('mousedown', this.handleMouseDown)
  }

  public stop() {
    this.reset()
  }

  public reset() {
    this.setFocusDisabled(false)
    this.container.removeEventListener('keydown', this.handleKeyDown)
    this.container.removeEventListener('mousedown', this.handleMouseDown)
  }
}
