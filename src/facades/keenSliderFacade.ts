import { KeyboardEvent, RefObject } from 'react'
import { KeenSliderInstance } from 'keen-slider/react'

interface Params {
  event: KeyboardEvent<HTMLDivElement> | null
  keenSliderInstanceRef: RefObject<KeenSliderInstance | null>
}

export class KeenSliderFacade {
  public focusedLinkIndex: number

  private event: Params['event']

  private keenSliderInstanceRef: Params['keenSliderInstanceRef']

  constructor(params: Params) {
    this.event = params.event
    this.focusedLinkIndex = 0
    this.keenSliderInstanceRef = params.keenSliderInstanceRef
  }

  public decrementFocusIndex() {
    this.focusedLinkIndex = this.focusedLinkIndex - 1
  }

  public handleKeyChange = () => {
    if (this.isInvalidKey || !this.slides.length) return

    this.navigateToNewTab()
  }

  public get isEndOfSlides() {
    if (!this.trackDetails) return false

    return this.focusedLinkIndex >= this.trackDetails.maxIdx
  }

  public incrementFocusIndex() {
    this.focusedLinkIndex = this.focusedLinkIndex + 1
  }

  public update(params: Partial<Params>) {
    if (params.event) this.event = params.event
    if (params.keenSliderInstanceRef) {
      this.keenSliderInstanceRef = params.keenSliderInstanceRef
    }
  }

  private get currentLink() {
    const { focusedLinkIndex, slides } = this
    return slides[focusedLinkIndex].querySelector<HTMLAnchorElement>('a')
  }

  private focusCurrentLink() {
    return this.currentLink?.focus()
  }

  private get isBeginningOfSlides() {
    return this.trackDetails?.rel === 0
  }

  private get isFocusGreaterThanSliderCount() {
    return (
      this.isEndOfSlides && this.focusedLinkIndex !== this.trackDetails?.maxIdx
    )
  }

  private get isInvalidKey() {
    return !this.pressedLeftArrow && !this.pressedRightArrow
  }

  private navigateLeft() {
    if (this.focusedLinkIndex - 1 < 0) return

    if (this.isBeginningOfSlides || this.isFocusGreaterThanSliderCount) {
      this.decrementFocusIndex()
      this.focusCurrentLink()
      return
    }

    this.decrementFocusIndex()
    this.focusCurrentLink()
    this.keenSliderInstanceRef.current?.prev()
  }

  private navigateRight() {
    if (this.focusedLinkIndex === this.slides.length - 1) return

    if (this.isEndOfSlides) {
      this.incrementFocusIndex()
      this.focusCurrentLink()
      return
    }

    this.incrementFocusIndex()
    this.focusCurrentLink()
    this.keenSliderInstanceRef.current?.next()
  }

  private navigateToNewTab() {
    if (this.pressedRightArrow) return this.navigateRight()

    return this.navigateLeft()
  }

  private get pressedLeftArrow() {
    return this.event?.key === 'ArrowLeft'
  }

  private get pressedRightArrow() {
    return this.event?.key === 'ArrowRight'
  }

  private get slides() {
    return this.keenSliderInstanceRef.current?.slides ?? []
  }

  private get trackDetails() {
    return this.keenSliderInstanceRef.current?.track.details
  }
}
