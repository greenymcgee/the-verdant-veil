import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { SUPER_METROID } from '@/test/fixtures'
import { toastMock } from '@/test/helpers'
import { gamesServer, mockUnpublishableGameFailure } from '@/test/servers'

import { PublishGameForm } from '..'

const PROPS: PropsOf<typeof PublishGameForm> = {
  game: SUPER_METROID,
  onErrorCallback: vi.fn(),
}

beforeAll(() => gamesServer.listen())
afterEach(() => {
  vi.clearAllMocks()
  gamesServer.resetHandlers()
})
afterAll(() => gamesServer.close())

describe('<PublishGameForm />', () => {
  it('should toast a success message', async () => {
    render(<PublishGameForm {...PROPS} />)
    fireEvent.click(screen.getByText('Publish'))
    await waitFor(() =>
      expect(toastMock.success).toHaveBeenCalledWith(
        `${SUPER_METROID.name} has been successfully published`,
      ),
    )
  })

  it('should toast an error message', async () => {
    const unpublishableReasons = mockUnpublishableGameFailure(PROPS.game.slug)
    render(<PublishGameForm {...PROPS} />)
    fireEvent.click(screen.getByText('Publish'))
    await waitFor(() =>
      expect(PROPS.onErrorCallback).toHaveBeenCalledWith(unpublishableReasons),
    )
  })
})
