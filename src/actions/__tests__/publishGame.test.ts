import { SUPER_METROID } from '@/test/fixtures'
import { gamesServer, mockGameUpdateRequestFailure } from '@/test/servers'

import { publishGame } from '..'

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

const FORM_DATA = new FormData()
FORM_DATA.set('timezone', 'America/Denver')

describe('publishGame', () => {
  it('should return success state', async () => {
    const result = await publishGame({
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
    const result = await publishGame({
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
