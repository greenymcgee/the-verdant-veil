import { SUPER_METROID } from '@/test/fixtures'
import { gamesServer, mockUnpublishableGameFailure } from '@/test/servers'

import { publishGame } from '..'

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

const FORM_DATA = new FormData()
FORM_DATA.set('timezone', 'America/Denver')

describe('publishGame', () => {
  it('should return success state', async () => {
    const state = {
      game: SUPER_METROID,
      message: '',
      status: 'IDLE',
      unpublishableReasons: [],
    }
    const result = await publishGame({
      game: SUPER_METROID,
      message: '',
      status: 'IDLE',
      unpublishableReasons: [],
    })
    expect(result).toEqual({
      ...state,
      status: 'SUCCESS',
    })
  })

  it('should return failure state', async () => {
    const unpublishableReasons = mockUnpublishableGameFailure(
      SUPER_METROID.slug,
    )
    const state: FirstParameterOf<typeof publishGame> = {
      game: SUPER_METROID,
      message: '',
      status: 'IDLE',
      unpublishableReasons: [],
    }
    const result = await publishGame(state)
    expect(result).toEqual({
      ...state,
      message: expect.any(String),
      status: 'ERROR',
      unpublishableReasons,
    })
  })
})
