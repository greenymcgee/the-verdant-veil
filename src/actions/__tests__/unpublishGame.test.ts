import { SUPER_METROID } from '@/test/fixtures'
import { gamesServer, mockGameUpdateRequestFailure } from '@/test/servers'

import { unpublishGame } from '..'

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

describe('unpublishGame', () => {
  it('should return success state', async () => {
    const result = await unpublishGame({
      game: SUPER_METROID,
      message: '',
      status: 'idle',
    })
    expect(result).toEqual({
      game: SUPER_METROID,
      message: '',
      status: 'success',
    })
  })

  it('should return failure state', async () => {
    const { message } = mockGameUpdateRequestFailure()
    const result = await unpublishGame({
      game: SUPER_METROID,
      message: '',
      status: 'idle',
    })
    expect(result).toEqual({
      game: SUPER_METROID,
      message,
      status: 'failure',
    })
  })
})
