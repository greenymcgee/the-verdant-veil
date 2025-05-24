import { render, screen } from '@testing-library/react'

import { generateGameMetadata } from '@/actions'
import { SUPER_METROID } from '@/test/fixtures'
import { gamesServer, mockGameRequestFailure } from '@/test/servers'

import GameShowPage, { generateMetadata } from '../page'

const PROPS: PropsOf<typeof GameShowPage> = {
  params: new Promise((resolve) => resolve({ slug: SUPER_METROID.slug })),
}

beforeAll(() => gamesServer.listen())
afterEach(() => gamesServer.resetHandlers())
afterAll(() => gamesServer.close())

describe('<GameShowPage />', () => {
  describe('generateMetadata', () => {
    it('should generate the game metadata', async () => {
      const result = await generateMetadata(PROPS)
      expect(result).toEqual(
        await generateGameMetadata({
          pageParams: Promise.resolve({ slug: SUPER_METROID.slug }),
          type: 'show',
        }),
      )
    })
  })

  it('should render a 404 error', async () => {
    mockGameRequestFailure()
    const jsx = await GameShowPage(PROPS)
    render(jsx)
    expect(screen.getByTestId('game-not-found-error')).toBeVisible()
  })

  it('should render a generic error', async () => {
    mockGameRequestFailure(500)
    const jsx = await GameShowPage(PROPS)
    render(jsx)
    expect(screen.getByTestId('generic-game-error')).toBeVisible()
  })

  it('should render a game page', async () => {
    const jsx = await GameShowPage(PROPS)
    render(jsx)
    expect(screen.getByTestId('game-page')).toBeVisible()
  })
})
