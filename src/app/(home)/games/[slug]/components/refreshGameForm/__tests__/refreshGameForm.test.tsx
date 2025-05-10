import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { SUPER_METROID } from '@/test/fixtures'
import { toastMock } from '@/test/helpers'
import {
  gamesServer,
  mockPartialGameRefreshResponse,
  mockRefreshGameFailure,
} from '@/test/servers'

import { RefreshGameForm } from '..'

const PROPS: PropsOf<typeof RefreshGameForm> = {
  game: SUPER_METROID,
  onPartialRefreshCallback: vi.fn(),
}

beforeAll(() => gamesServer.listen())
afterEach(() => {
  vi.clearAllMocks()
  gamesServer.resetHandlers()
})
afterAll(() => gamesServer.close())

describe('<RefreshGameForm />', () => {
  it('should toast a success message', async () => {
    render(<RefreshGameForm {...PROPS} />)
    fireEvent.click(screen.getByText('Refresh IGDB Data'))
    await waitFor(() =>
      expect(toastMock.success).toHaveBeenCalledWith(
        `${SUPER_METROID.name} has been successfully refreshed`,
      ),
    )
  })

  it('should call onPartialRefreshCallback when the responseStatus is 207', async () => {
    mockPartialGameRefreshResponse(SUPER_METROID.slug)
    render(<RefreshGameForm {...PROPS} />)
    fireEvent.click(screen.getByText('Refresh IGDB Data'))
    await waitFor(() =>
      expect(PROPS.onPartialRefreshCallback).toHaveBeenCalledTimes(1),
    )
  })

  it('should not call onPartialRefreshCallback when the responseStatus is not 207', async () => {
    render(<RefreshGameForm {...PROPS} />)
    fireEvent.click(screen.getByText('Refresh IGDB Data'))
    await waitFor(() =>
      expect(PROPS.onPartialRefreshCallback).not.toHaveBeenCalled(),
    )
  })

  it('should toast an error message', async () => {
    const { message } = mockRefreshGameFailure(PROPS.game.slug)
    render(<RefreshGameForm {...PROPS} />)
    fireEvent.click(screen.getByText('Refresh IGDB Data'))
    await waitFor(() => expect(toastMock.error).toHaveBeenCalledWith(message))
  })
})
