import { KeyboardEvent, RefObject } from 'react'

interface Params {
  event: KeyboardEvent<HTMLDivElement>
  tabFocusIndexRef: RefObject<number>
  tablistRef: RefObject<HTMLDivElement | null>
}

class TabKeyChangeFacade {
  private event: Params['event']

  private tabFocusIndexRef: Params['tabFocusIndexRef']

  private tablistRef: Params['tablistRef']

  constructor(params: Params) {
    this.event = params.event
    this.tabFocusIndexRef = params.tabFocusIndexRef
    this.tablistRef = params.tablistRef
  }

  public update(params: Params) {
    this.event = params.event
    this.tabFocusIndexRef = params.tabFocusIndexRef
    this.tablistRef = params.tablistRef
  }

  public handleTabKeyChange = () => {
    if (this.invalidKey || !this.tabs.length) return

    this.updateFocusTabRef()
    this.unsetCurrentTabindex()
    this.navigateToNewTab()
  }

  private focusTabbedElement() {
    return (
      this.tabs[this.tabFocusIndexRef.current] as HTMLAnchorElement
    ).focus()
  }

  private get invalidKey() {
    return this.event.key !== 'ArrowRight' && this.event.key !== 'ArrowLeft'
  }

  private navigateToNewTab() {
    if (this.event.key === 'ArrowRight') {
      this.setArrowRightIndex()
      this.updateFocusableTab()
      return this.focusTabbedElement()
    }

    this.setArrowLeftIndex()
    this.updateFocusableTab()
    return this.focusTabbedElement()
  }

  private get selectedTab() {
    return this.tablistRef.current?.querySelector('[tabindex="0"]')
  }

  private setArrowLeftIndex() {
    if (this.tabFocusIndexRef.current - 1 < 0) {
      this.tabFocusIndexRef.current = this.tabs.length - 1
      return
    }

    this.tabFocusIndexRef.current = this.tabFocusIndexRef.current - 1
  }

  private setArrowRightIndex() {
    if (this.tabFocusIndexRef.current + 1 >= this.tabs.length) {
      this.tabFocusIndexRef.current = 0
      return
    }

    this.tabFocusIndexRef.current = this.tabFocusIndexRef.current + 1
  }

  private get tabs() {
    return (
      this.tablistRef.current?.querySelectorAll('[role="tab"]') ??
      ([] as unknown as NodeListOf<Element>)
    )
  }

  private unsetCurrentTabindex() {
    this.tabs[this.tabFocusIndexRef.current].setAttribute('tabindex', '-1')
  }

  private updateFocusableTab() {
    this.tabs[this.tabFocusIndexRef.current].setAttribute('tabindex', '0')
  }

  private updateFocusTabRef() {
    if (!this.selectedTab) return

    this.tabFocusIndexRef.current = Array.from(this.tabs).indexOf(
      this.selectedTab,
    )
  }
}

export const tabKeyChangeFacade = new TabKeyChangeFacade({
  event: {} as KeyboardEvent<HTMLDivElement>,
  tabFocusIndexRef: { current: 0 },
  tablistRef: { current: null },
})
