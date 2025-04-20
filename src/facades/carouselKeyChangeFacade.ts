import { KeyboardEvent, RefObject } from 'react'

interface Params {
  carouselRef: RefObject<HTMLDivElement | null>
  event: KeyboardEvent<HTMLDivElement>
  keenSliderInstanceRef: RefObject<{
    next: VoidFunction
    prev: VoidFunction
  } | null>
  slideFocusIndexRef: RefObject<number>
}

export class CarouselKeyChangeFacade {
  private carouselRef: Params['carouselRef']

  private event: Params['event']

  private keenSliderInstanceRef: Params['keenSliderInstanceRef']

  private slideFocusIndexRef: Params['slideFocusIndexRef']

  constructor(params: Params) {
    this.carouselRef = params.carouselRef
    this.event = params.event
    this.keenSliderInstanceRef = params.keenSliderInstanceRef
    this.slideFocusIndexRef = params.slideFocusIndexRef
  }

  public update(params: Params) {
    this.carouselRef = params.carouselRef
    this.event = params.event
    this.keenSliderInstanceRef = params.keenSliderInstanceRef
    this.slideFocusIndexRef = params.slideFocusIndexRef
  }

  public handleTabKeyChange = () => {
    if (this.invalidKey || !this.slides.length) return

    this.updateFocusIndexRef()
    this.unsetCurrentTabindex()
    this.navigateToNewTab()
  }

  private focusTabbedElement() {
    return (
      this.slides[this.slideFocusIndexRef.current].querySelector(
        'a',
      ) as HTMLAnchorElement
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

  private setArrowLeftIndex() {
    if (this.slideFocusIndexRef.current - 1 < 0) return

    this.slideFocusIndexRef.current = this.slideFocusIndexRef.current - 1
    this.keenSliderInstanceRef.current?.prev()
  }

  private setArrowRightIndex() {
    if (this.slideFocusIndexRef.current + 1 >= this.slides.length) return

    this.slideFocusIndexRef.current = this.slideFocusIndexRef.current + 1
    this.keenSliderInstanceRef.current?.next()
  }

  private get currentCarousel() {
    return this.carouselRef.current
  }

  private get slides() {
    return (
      this.currentCarousel?.querySelectorAll('[role="group"]') ??
      ([] as unknown as NodeListOf<Element>)
    )
  }

  private get slideContainingLinkAtCurrentFocusIndex() {
    return this.slides[this.slideFocusIndexRef.current]
  }

  private get linkAtCurrentFocusIndex() {
    return this.slideContainingLinkAtCurrentFocusIndex.querySelector(
      'a',
    ) as HTMLAnchorElement
  }

  private unsetCurrentTabindex() {
    this.linkAtCurrentFocusIndex.setAttribute('tabindex', '-1')
  }

  private updateFocusableTab() {
    this.linkAtCurrentFocusIndex.setAttribute('tabindex', '0')
  }

  private get activeLink() {
    return this.currentCarousel?.querySelector('[tabindex="0"]')
  }

  private get activeSlide() {
    return this.activeLink?.closest('[role="group"]')
  }

  private updateFocusIndexRef() {
    if (!this.activeSlide) return

    this.slideFocusIndexRef.current = Array.from(this.slides).indexOf(
      this.activeSlide,
    )
  }
}
