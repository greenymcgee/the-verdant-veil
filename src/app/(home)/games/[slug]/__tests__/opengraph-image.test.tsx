import { SUPER_METROID } from '@/test/fixtures'
import { gamesServer } from '@/test/servers'

import GameOGImage from '../opengraph-image'

const PROPS: PropsOf<typeof GameOGImage> = {
  params: { slug: SUPER_METROID.slug },
}

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

describe('<GameOGImage />', () => {
  it('should return a 200', async () => {
    const response = await GameOGImage(PROPS)
    expect(response.status).toBe(302)
  })
})
