import { UseComboboxStateChangeTypes } from 'downshift'

import { ROUTES } from '@/constants'
import { SUPER_METROID } from '@/test/fixtures'

import { handleSelectedItemChange } from '..'

const push = vi.fn()
const QUERY = 'query'
const EVENT: FirstParameterOf<ReturnType<typeof handleSelectedItemChange>> = {
  selectedItem: SUPER_METROID,
  type: '' as UseComboboxStateChangeTypes.ControlledPropUpdatedSelectedItem,
}

afterEach(() => {
  vi.clearAllMocks()
})

describe('handleSelectedItemChange', () => {
  it('should push to the results page when the game is blank', () => {
    const event = { ...EVENT, selectedItem: null }
    handleSelectedItemChange(QUERY, push)(event)
    expect(push).toHaveBeenCalledWith(`${ROUTES.games}?query=${QUERY}`)
  })

  it('should push to the results page when a slug is not present', () => {
    const event = { ...EVENT, selectedItem: {} as Game }
    handleSelectedItemChange(QUERY, push)(event)
    expect(push).toHaveBeenCalledWith(`${ROUTES.games}?query=${QUERY}`)
  })

  it('should push to game page when the slug is present', () => {
    handleSelectedItemChange(QUERY, push)(EVENT)
    expect(push).toHaveBeenCalledWith(ROUTES.game(SUPER_METROID.slug))
  })
})
