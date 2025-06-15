import { SUPER_METROID } from '@/test/fixtures'

import { SEE_ALL_RESULTS_ITEM } from '../../../../constants'
import { handleItemToString } from '..'

describe('handleItemToString', () => {
  it('should return an empty string when the game is blank', () => {
    const result = handleItemToString('query')(null)
    expect(result).toBe('')
  })

  it('should return the query when the "game" is the all results item', () => {
    const result = handleItemToString('query')(SEE_ALL_RESULTS_ITEM)
    expect(result).toBe('query')
  })

  it('should return the game name', () => {
    const result = handleItemToString('query')(SUPER_METROID)
    expect(result).toBe(SUPER_METROID.name)
  })
})
