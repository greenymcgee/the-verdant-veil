import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { revalidatePath } from 'next/cache'

import { ROUTES } from '@/constants'
import { SUPER_METROID } from '@/test/fixtures'
import { toastMock } from '@/test/helpers'
import { gamesServer, mockGameUpdateRequestFailure } from '@/test/servers'

import { UnpublishGameForm } from '..'

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

describe('<UnpublishGameForm />', () => {
  describe('success', () => {
    it('should revalidate the preview path', async () => {
      render(<UnpublishGameForm game={SUPER_METROID} />)
      fireEvent.click(screen.getByText('Unpublish'))
      await waitFor(() => {
        expect(revalidatePath).toHaveBeenCalledWith(
          ROUTES.gamePreview(SUPER_METROID.slug),
        )
      })
    })

    it('should toast a success message', async () => {
      render(<UnpublishGameForm game={SUPER_METROID} />)
      fireEvent.click(screen.getByText('Unpublish'))
      await waitFor(() => {
        expect(toastMock.success).toHaveBeenCalledWith(
          `${SUPER_METROID.name} has been successfully unpublished`,
        )
      })
    })
  })

  describe('failure', () => {
    it('should toast an error message', async () => {
      const { message } = mockGameUpdateRequestFailure()
      render(<UnpublishGameForm game={SUPER_METROID} />)
      fireEvent.click(screen.getByText('Unpublish'))
      await waitFor(() => {
        expect(toastMock.error).toHaveBeenCalledWith(message)
      })
    })
  })
})
