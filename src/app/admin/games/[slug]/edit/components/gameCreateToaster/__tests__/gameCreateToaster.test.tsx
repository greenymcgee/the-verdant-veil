import React from 'react'
import { act, render, waitFor } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { ROUTES } from '@/constants'
import { DARK_SOULS, NEW_GAME } from '@/test/fixtures'
import { toastMock } from '@/test/helpers'

import { GameCreateToaster } from '..'

describe('<GameCreateToaster />', () => {
  describe('when the updated param is present', () => {
    it('should toast a message', async () => {
      mockRouter.push(`${ROUTES.adminGame(NEW_GAME.slug)}?created=true`)
      render(<GameCreateToaster game={NEW_GAME} />)
      await waitFor(() => {
        expect(toastMock.success).toHaveBeenCalledWith(
          `${NEW_GAME.name} has been created!`,
        )
      })
    })

    it('should not double toast a message', async () => {
      mockRouter.push(`${ROUTES.adminGame(NEW_GAME.slug)}?created=true`)
      const { rerender } = render(<GameCreateToaster game={NEW_GAME} />)
      act(() => {
        mockRouter.push(`${ROUTES.adminGame(NEW_GAME.slug)}?created=true`)
      })
      rerender(<GameCreateToaster game={DARK_SOULS} />)
      await waitFor(() => new Promise((resolve) => setTimeout(resolve, 15)))
      expect(toastMock.success).toHaveBeenCalledTimes(1)
    })

    it('should push to the edit game page', async () => {
      mockRouter.push(`${ROUTES.adminEditGame(NEW_GAME.slug)}?created=true`)
      render(<GameCreateToaster game={NEW_GAME} />)
      await waitFor(() => new Promise((resolve) => setTimeout(resolve, 10)))
      expect(mockRouter.pathname).toBe(ROUTES.adminEditGame(NEW_GAME.slug))
    })
  })

  describe('when the created param is not present', () => {
    it('should not toast a message when the updated param is blank', async () => {
      render(<GameCreateToaster game={NEW_GAME} />)
      await waitFor(() => new Promise((resolve) => setTimeout(resolve, 10)))
      expect(toastMock.success).not.toHaveBeenCalled()
    })
  })
})
