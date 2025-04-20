/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { KeyboardEvent, PropsWithChildren, useRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { ROUTES } from '@/constants'
import { DARK_SOULS, NEW_GAME, SUPER_METROID } from '@/test/fixtures'

import { CarouselKeyChangeFacade } from '..'

const keenSliderInstanceRef = { current: { next: vi.fn(), prev: vi.fn() } }
const facade = new CarouselKeyChangeFacade({
  carouselRef: { current: null },
  event: {} as KeyboardEvent<HTMLDivElement>,
  keenSliderInstanceRef,
  slideFocusIndexRef: { current: 0 },
})

function Wrapper({
  children,
  includesRef = true,
  preselected = true,
}: PropsWithChildren<{ includesRef?: boolean; preselected?: boolean }>) {
  const slideFocusIndexRef = useRef(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const handleKeyDownChange = (event: KeyboardEvent<HTMLDivElement>) => {
    facade.update({
      carouselRef,
      event,
      keenSliderInstanceRef,
      slideFocusIndexRef,
    })
    facade.handleTabKeyChange()
  }

  return (
    <>
      <div
        data-testid="carousel"
        onKeyDown={handleKeyDownChange}
        ref={includesRef ? carouselRef : undefined}
        role="region"
      >
        <div aria-roledescription="slide" role="group">
          <a href={ROUTES.game(SUPER_METROID.slug)} tabIndex={-1}>
            {SUPER_METROID.name}
          </a>
        </div>
        <div aria-roledescription="slide" role="group">
          <a
            href={ROUTES.game(DARK_SOULS.slug)}
            tabIndex={preselected ? 0 : -1}
          >
            {DARK_SOULS.name}
          </a>
        </div>
        <div aria-roledescription="slide" role="group">
          <a href={ROUTES.game(NEW_GAME.slug)} tabIndex={-1}>
            {NEW_GAME.name}
          </a>
        </div>
      </div>
      {children}
    </>
  )
}

afterEach(() => {
  vi.clearAllMocks()
})

describe('CarouselKeyChangeFacade', () => {
  describe('handleTabKeyChange', () => {
    it('should do nothing when carouselRef is blank', () => {
      render(<Wrapper includesRef={false} />)
      fireEvent.keyDown(screen.getByTestId('carousel'), { key: 'ArrowRight' })
      expect(screen.getByText(DARK_SOULS.name)).toHaveAttribute('tabindex', '0')
    })

    it('should do nothing if the event key is neither ArrowRight nor ArrowLeft', () => {
      render(<Wrapper />)
      fireEvent.keyDown(screen.getByTestId('carousel'))
      expect(screen.getByText(DARK_SOULS.name)).toHaveAttribute('tabindex', '0')
    })

    it('should navigate to the right on ArrowRight', () => {
      render(<Wrapper />)
      fireEvent.keyDown(screen.getByTestId('carousel'), { key: 'ArrowRight' })
      expect(screen.getByText(NEW_GAME.name)).toHaveFocus()
    })

    it('should call next on ArrowRight', () => {
      render(<Wrapper />)
      fireEvent.keyDown(screen.getByTestId('carousel'), { key: 'ArrowRight' })
      expect(keenSliderInstanceRef.current.next).toHaveBeenCalledTimes(1)
    })

    it('should navigate to the left on ArrowLeft', () => {
      render(<Wrapper />)
      fireEvent.keyDown(screen.getByTestId('carousel'), { key: 'ArrowLeft' })
      expect(screen.getByText(SUPER_METROID.name)).toHaveFocus()
    })

    it('should call prev on ArrowLeft', () => {
      render(<Wrapper />)
      fireEvent.keyDown(screen.getByTestId('carousel'), { key: 'ArrowLeft' })
      expect(keenSliderInstanceRef.current.prev).toHaveBeenCalledTimes(1)
    })

    it('should do nothing on ArrowLeft when at beginning of slides', () => {
      render(<Wrapper />)
      fireEvent.keyDown(screen.getByTestId('carousel'), { key: 'ArrowLeft' })
      fireEvent.keyDown(screen.getByTestId('carousel'), { key: 'ArrowLeft' })
      expect(screen.getByText(SUPER_METROID.name)).toHaveFocus()
    })

    it('should do nothing on ArrowRight when at end of slides', () => {
      render(<Wrapper />)
      fireEvent.keyDown(screen.getByTestId('carousel'), { key: 'ArrowRight' })
      fireEvent.keyDown(screen.getByTestId('carousel'), { key: 'ArrowRight' })
      expect(screen.getByText(NEW_GAME.name)).toHaveFocus()
    })

    it('should not update the tabFocusIndex before navigating if selectedTab is blank', () => {
      render(<Wrapper preselected={false} />)
      fireEvent.keyDown(screen.getByTestId('carousel'), { key: 'ArrowRight' })
      expect(screen.getByText(DARK_SOULS.name)).toHaveFocus()
    })
  })
})
