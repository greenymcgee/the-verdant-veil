import { SUPER_METROID } from '@/test/fixtures'
import { gamesServer, mockUnpublishGameFailure } from '@/test/servers'

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
    mockUnpublishGameFailure(SUPER_METROID.slug)
    const result = await unpublishGame({
      game: SUPER_METROID,
      message: '',
      status: 'idle',
    })
    expect(result).toEqual({
      game: SUPER_METROID,
      message: expect.any(String),
      status: 'failure',
    })
  })
})
