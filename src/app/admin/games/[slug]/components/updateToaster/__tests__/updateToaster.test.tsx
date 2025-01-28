import React from 'react'
import { act, render, waitFor } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { DARK_SOULS, SUPER_METROID } from '@/test/fixtures'
import { toastMock } from '@/test/helpers'

import { GameUpdateToaster } from '..'

describe('<GameUpdateToaster />', () => {
  describe('when the updated param is present', () => {
    it('should toast a message', async () => {
      mockRouter.push(`${ROUTES.adminGame(SUPER_METROID.slug)}?updated=true`)
      render(<GameUpdateToaster game={SUPER_METROID} />)
      await waitFor(() => {
        expect(toastMock.success).toHaveBeenCalledWith(
          `${SUPER_METROID.name} has been updated!`,
        )
      })
    })

    it('should not double toast a message', async () => {
      mockRouter.push(`${ROUTES.adminGame(SUPER_METROID.slug)}?updated=true`)
      const { rerender } = render(<GameUpdateToaster game={SUPER_METROID} />)
      act(() => {
        mockRouter.push(`${ROUTES.adminGame(SUPER_METROID.slug)}?updated=true`)
      })
      rerender(<GameUpdateToaster game={DARK_SOULS} />)
      await waitFor(() => new Promise((resolve) => setTimeout(resolve, 15)))
      expect(toastMock.success).toHaveBeenCalledTimes(1)
    })

    it('should push to the game page', async () => {
      mockRouter.push(`${ROUTES.adminGame(SUPER_METROID.slug)}?updated=true`)
      render(<GameUpdateToaster game={SUPER_METROID} />)
      await waitFor(() => new Promise((resolve) => setTimeout(resolve, 10)))
      expect(mockRouter.pathname).toBe(ROUTES.adminGame(SUPER_METROID.slug))
    })
  })

  describe('when the updated param is not present', () => {
    it('should not toast a message when the updated param is blank', async () => {
      render(<GameUpdateToaster game={SUPER_METROID} />)
      await waitFor(() => new Promise((resolve) => setTimeout(resolve, 10)))
      expect(toastMock.success).not.toHaveBeenCalled()
    })
  })
})
