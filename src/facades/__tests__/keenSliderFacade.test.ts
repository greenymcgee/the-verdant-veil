/* eslint-disable @vitest/max-expects */
import { KeenSliderInstance, TrackInstance } from 'keen-slider/react'

import { KeenSliderFacade } from '..'

function createEvent(key: string) {
  return { key } as (typeof PARAMS)['event']
}

function createSlide(link: HTMLElement) {
  return { querySelector: vi.fn(() => link) } as unknown as HTMLElement
}

function createLink() {
  return { focus: vi.fn() } as unknown as HTMLElement
}

const LINK_ONE = createLink()
const LINK_TWO = createLink()
const LINK_THREE = createLink()
const LINK_FOUR = createLink()
const LINK_FIVE = createLink()

const SLIDE_ONE = createSlide(LINK_ONE)
const SLIDE_TWO = createSlide(LINK_TWO)
const SLIDE_THREE = createSlide(LINK_THREE)
const SLIDE_FOUR = createSlide(LINK_FOUR)
const SLIDE_FIVE = createSlide(LINK_FIVE)

const TRACK = { details: { maxIdx: 3, rel: 0 } } as TrackInstance

const PARAMS: FirstConstructorParameterOf<typeof KeenSliderFacade> = {
  event: null,
  keenSliderInstanceRef: {
    current: {
      next: vi.fn(() => {
        TRACK.details.rel += 1
      }),
      prev: vi.fn(() => {
        TRACK.details.rel -= 1
      }),
      slides: [SLIDE_ONE, SLIDE_TWO, SLIDE_THREE, SLIDE_FOUR, SLIDE_FIVE],
      track: TRACK,
    } as unknown as KeenSliderInstance,
  },
}

afterEach(() => {
  vi.clearAllMocks()
  TRACK.details.rel = 0
})

describe('KeenSliderFacade', () => {
  describe('decrementFocus', () => {
    it('should decrease the focusedLinkIndex by 1', () => {
      const facade = new KeenSliderFacade(PARAMS)
      facade.decrementFocusIndex()
      expect(facade.focusedLinkIndex).toBe(-1)
    })
  })

  describe('handleKeyChange', () => {
    it('should gracefully handle a null event', () => {
      const facade = new KeenSliderFacade(PARAMS)
      facade.handleKeyChange()
      expect(facade.focusedLinkIndex).toBe(0)
    })

    it('should gracefully handle a null keen slider', () => {
      const facade = new KeenSliderFacade({
        event: createEvent('ArrowRight'),
        keenSliderInstanceRef: { current: null },
      })
      facade.handleKeyChange()
      expect(facade.focusedLinkIndex).toBe(0)
    })

    it('should gracefully handle an event with an invalid key', () => {
      const facade = new KeenSliderFacade({
        ...PARAMS,
        event: createEvent('invalid'),
      })
      facade.handleKeyChange()
      expect(facade.focusedLinkIndex).toBe(0)
    })

    it('should gracefully handle empty slides', () => {
      const facade = new KeenSliderFacade({
        event: createEvent('ArrowRight'),
        keenSliderInstanceRef: {
          current: {
            ...PARAMS.keenSliderInstanceRef,
            slides: [],
          } as unknown as KeenSliderInstance,
        },
      })
      facade.handleKeyChange()
      expect(facade.focusedLinkIndex).toBe(0)
    })

    describe('right', () => {
      it('should navigate right', () => {
        const facade = new KeenSliderFacade({
          ...PARAMS,
          event: createEvent('ArrowRight'),
        })
        facade.handleKeyChange()
        expect(facade.focusedLinkIndex).toBe(1)
        expect(
          PARAMS.keenSliderInstanceRef.current?.next,
        ).toHaveBeenCalledTimes(1)
        expect(LINK_TWO.focus).toHaveBeenCalledTimes(1)
      })

      it('should not call the slider next when the focusedLinkIndex is greater than the total number of Keen slides', () => {
        const facade = new KeenSliderFacade({
          ...PARAMS,
          event: createEvent('ArrowRight'),
        })
        facade.handleKeyChange()
        facade.handleKeyChange()
        facade.handleKeyChange()
        facade.handleKeyChange()
        expect(facade.focusedLinkIndex).toBe(4)
        expect(
          PARAMS.keenSliderInstanceRef.current?.next,
        ).toHaveBeenCalledTimes(3)
        expect(LINK_FOUR.focus).toHaveBeenCalledTimes(1)
      })

      it('should do nothing when the user has reached the end of the focusable links', () => {
        const facade = new KeenSliderFacade({
          ...PARAMS,
          event: createEvent('ArrowRight'),
        })
        facade.handleKeyChange()
        facade.handleKeyChange()
        facade.handleKeyChange()
        facade.handleKeyChange()
        facade.handleKeyChange()
        facade.handleKeyChange()
        expect(facade.focusedLinkIndex).toBe(4)
        expect(LINK_FIVE.focus).toHaveBeenCalledTimes(1)
      })
    })

    describe('left', () => {
      it('should navigate left', () => {
        const facade = new KeenSliderFacade({
          ...PARAMS,
          event: { key: 'ArrowRight' } as (typeof PARAMS)['event'],
        })
        facade.handleKeyChange()
        facade.update({ event: createEvent('ArrowLeft') })
        facade.handleKeyChange()
        expect(facade.focusedLinkIndex).toBe(0)
        expect(
          PARAMS.keenSliderInstanceRef.current?.prev,
        ).toHaveBeenCalledTimes(1)
        expect(LINK_ONE.focus).toHaveBeenCalledTimes(1)
      })

      it('should not call the slider prev when the focusedLinkIndex is greater than the total number of Keen slides', () => {
        const facade = new KeenSliderFacade({
          ...PARAMS,
          event: { key: 'ArrowRight' } as (typeof PARAMS)['event'],
        })
        facade.handleKeyChange()
        facade.handleKeyChange()
        facade.handleKeyChange()
        facade.handleKeyChange()
        facade.handleKeyChange()
        facade.update({ event: createEvent('ArrowLeft') })
        facade.handleKeyChange()
        expect(facade.focusedLinkIndex).toBe(3)
        expect(
          PARAMS.keenSliderInstanceRef.current?.prev,
        ).not.toHaveBeenCalled()
        expect(LINK_FOUR.focus).toHaveBeenCalledTimes(2)
      })

      it('should call the slider prev when the focusedLinkIndex is equal to the total number of Keen slides', () => {
        const facade = new KeenSliderFacade({
          ...PARAMS,
          event: { key: 'ArrowRight' } as (typeof PARAMS)['event'],
        })
        facade.handleKeyChange()
        facade.handleKeyChange()
        facade.handleKeyChange()
        facade.update({ event: createEvent('ArrowLeft') })
        facade.handleKeyChange()
        expect(facade.focusedLinkIndex).toBe(2)
        expect(
          PARAMS.keenSliderInstanceRef.current?.prev,
        ).toHaveBeenCalledTimes(1)
        expect(LINK_THREE.focus).toHaveBeenCalledTimes(2)
      })

      it('should do nothing when the user has reached the beginning of the focusable links', () => {
        const facade = new KeenSliderFacade({
          ...PARAMS,
          event: createEvent('ArrowLeft'),
        })
        facade.handleKeyChange()
        expect(facade.focusedLinkIndex).toBe(0)
        expect(
          PARAMS.keenSliderInstanceRef.current?.prev,
        ).not.toHaveBeenCalled()
      })
    })
  })

  describe('incrementFocus', () => {
    it('should increase the focusedLinkIndex by 1', () => {
      const facade = new KeenSliderFacade(PARAMS)
      facade.incrementFocusIndex()
      expect(facade.focusedLinkIndex).toBe(1)
    })
  })

  describe('update', () => {
    it('should update the event', () => {
      const event = {} as (typeof PARAMS)['event']
      const facade = new KeenSliderFacade(PARAMS)
      facade.update({ event })
      // @ts-expect-error: easier to test this way
      expect(facade.event).toBe(event)
    })

    it('should update the keen slider', () => {
      const slider = { current: null }
      const facade = new KeenSliderFacade(PARAMS)
      facade.update({ keenSliderInstanceRef: slider })
      // @ts-expect-error: easier to test this way
      expect(facade.keenSliderInstanceRef).toBe(slider)
    })
  })
})

/* eslint-enable @vitest/max-expects */
