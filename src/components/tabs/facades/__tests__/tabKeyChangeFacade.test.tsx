/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { KeyboardEvent, PropsWithChildren, useRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { tabKeyChangeFacade } from '..'

function Wrapper({
  children,
  includesRef = true,
  preselected = true,
}: PropsWithChildren<{ includesRef?: boolean; preselected?: boolean }>) {
  const tabFocusIndexRef = useRef(0)
  const tablistRef = useRef<HTMLDivElement>(null)
  const handleKeyDownChange = (event: KeyboardEvent<HTMLDivElement>) => {
    tabKeyChangeFacade.update({ event, tabFocusIndexRef, tablistRef })
    tabKeyChangeFacade.handleTabKeyChange()
  }

  return (
    <>
      <div
        data-testid="tablist"
        onKeyDown={handleKeyDownChange}
        ref={includesRef ? tablistRef : undefined}
        role="tablist"
      >
        <a aria-selected="false" href="#review" role="tab" tabIndex={-1}>
          Review
        </a>
        <a
          aria-selected={preselected ? 'true' : 'false'}
          href="#about"
          role="tab"
          tabIndex={preselected ? 0 : -1}
        >
          About
        </a>
        <a aria-selected="false" href="#media" role="tab" tabIndex={-1}>
          Media
        </a>
      </div>
      {children}
    </>
  )
}

describe('tabKeyChangeFacade', () => {
  describe('handleTabKeyChange', () => {
    it('should do nothing when tablistRef is blank', () => {
      render(<Wrapper includesRef={false} />)
      fireEvent.keyDown(screen.getByTestId('tablist'), { key: 'ArrowRight' })
      expect(screen.getByText('About')).toHaveAttribute('tabindex', '0')
    })

    it('should do nothing if the event key is neither ArrowRight nor ArrowLeft', () => {
      render(<Wrapper />)
      fireEvent.keyDown(screen.getByTestId('tablist'))
      expect(screen.getByText('About')).toHaveAttribute('tabindex', '0')
    })

    it('should navigate to the right on ArrowRight', () => {
      render(<Wrapper />)
      fireEvent.keyDown(screen.getByTestId('tablist'), { key: 'ArrowRight' })
      expect(screen.getByText('Media')).toHaveFocus()
    })

    it('should navigate to the left on ArrowLeft', () => {
      render(<Wrapper />)
      fireEvent.keyDown(screen.getByTestId('tablist'), { key: 'ArrowLeft' })
      expect(screen.getByText('Review')).toHaveFocus()
    })

    it('should navigate to the end on ArrowLeft when at beginning of tabs', () => {
      render(<Wrapper />)
      fireEvent.keyDown(screen.getByTestId('tablist'), { key: 'ArrowLeft' })
      fireEvent.keyDown(screen.getByTestId('tablist'), { key: 'ArrowLeft' })
      expect(screen.getByText('Media')).toHaveFocus()
    })

    it('should navigate to the beginning on ArrowRight when at end of tabs', () => {
      render(<Wrapper />)
      fireEvent.keyDown(screen.getByTestId('tablist'), { key: 'ArrowRight' })
      fireEvent.keyDown(screen.getByTestId('tablist'), { key: 'ArrowRight' })
      expect(screen.getByText('Review')).toHaveFocus()
    })

    it('should update the tabFocusIndex before navigating', () => {
      render(<Wrapper />)
      fireEvent.keyDown(screen.getByTestId('tablist'), { key: 'ArrowRight' })
      fireEvent.keyDown(screen.getByTestId('tablist'), { key: 'ArrowRight' })
      expect(screen.getByText('Review')).toHaveFocus()
    })

    it('should not update the tabFocusIndex before navigating if selectedTab is blank', () => {
      render(<Wrapper preselected={false} />)
      fireEvent.keyDown(screen.getByTestId('tablist'), { key: 'ArrowRight' })
      expect(screen.getByText('About')).toHaveFocus()
    })
  })
})
