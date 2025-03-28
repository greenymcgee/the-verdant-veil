import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { SUPER_METROID } from '@/test/fixtures'
import { toastMock } from '@/test/helpers'
import { gamesServer, mockGameUpdateRequestFailure } from '@/test/servers'

import { PublishGameForm } from '..'

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

describe('<PublishGameForm />', () => {
  it('should toast a success message', async () => {
    render(<PublishGameForm game={SUPER_METROID} />)
    fireEvent.click(screen.getByText('Publish'))
    await waitFor(() =>
      expect(toastMock.success).toHaveBeenCalledWith(
        `${SUPER_METROID.name} has been successfully published`,
      ),
    )
  })

  it('should toast an error message', async () => {
    const { message } = mockGameUpdateRequestFailure()
    render(<PublishGameForm game={SUPER_METROID} />)
    fireEvent.click(screen.getByText('Publish'))
    await waitFor(() => expect(toastMock.error).toHaveBeenCalledWith(message))
  })
})
