import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'

import { generateGameMetadata } from '@/actions'
import { ROUTES } from '@/constants'
import { DARK_SOULS, SUPER_METROID } from '@/test/fixtures'
import { gamesServer, mockGameRequestFailure } from '@/test/servers'

import AdminGameShowPage, { generateMetadata } from '../page'

beforeAll(() => gamesServer.listen())
afterAll(() => gamesServer.close())
afterEach(() => gamesServer.resetHandlers())

const PROPS: PropsOf<typeof AdminGameShowPage> = {
  params: Promise.resolve({ slug: SUPER_METROID.slug }),
}

describe('<AdminGameShowPage />', () => {
  describe('generateMetadata', () => {
    it('should generate the game metadata', async () => {
      const result = await generateMetadata(PROPS)
      expect(result).toEqual(
        await generateGameMetadata({
          pageParams: Promise.resolve({ slug: SUPER_METROID.slug }),
          type: 'admin-show',
        }),
      )
    })
  })

  describe('success', () => {
    it('should render the game name as an h1', async () => {
      const jsx = await AdminGameShowPage(PROPS)
      render(jsx)
      expect(screen.getByTestId('main-heading').tagName).toEqual('H1')
    })

    describe('published', () => {
      it('should render yes when true', async () => {
        const jsx = await AdminGameShowPage(PROPS)
        render(jsx)
        expect(screen.getByText('Yes')).toBeVisible()
      })

      it('should render no when false', async () => {
        const jsx = await AdminGameShowPage({
          params: Promise.resolve({ slug: DARK_SOULS.slug }),
        })
        render(jsx)
        expect(screen.getByText('No')).toBeVisible()
      })
    })

    it('should render the rating', async () => {
      const jsx = await AdminGameShowPage(PROPS)
      render(jsx)
      expect(screen.getByText(SUPER_METROID.rating)).toBeVisible()
    })

    it('should render the review', async () => {
      const jsx = await AdminGameShowPage(PROPS)
      render(jsx)
      expect(screen.getByTestId('review')).toBeVisible()
    })
  })

  describe('failure', () => {
    it('should render a message', async () => {
      const { message } = mockGameRequestFailure()
      const jsx = await AdminGameShowPage(PROPS)
      render(jsx)
      expect(screen.getByText(message)).toBeVisible()
    })

    it('should render a link back to games', async () => {
      mockGameRequestFailure()
      const jsx = await AdminGameShowPage(PROPS)
      render(jsx)
      expect(
        screen.getByTestId('back-to-games-link').getAttribute('href'),
      ).toEqual(ROUTES.adminGames)
    })
  })
})
