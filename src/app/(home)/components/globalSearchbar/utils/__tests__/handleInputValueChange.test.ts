import { UseComboboxStateChangeTypes } from 'downshift'

import { SEE_ALL_RESULTS_ITEM } from '../../../../constants'
import { handleInputValueChange } from '..'

const debouncedSetQuery = vi.fn()
const EVENT = {
  inputValue: SEE_ALL_RESULTS_ITEM.name,
  type: '' as UseComboboxStateChangeTypes.ControlledPropUpdatedSelectedItem,
}

afterEach(() => {
  vi.clearAllMocks()
})

describe('handleInputValueChange', () => {
  it('should do nothing when the inputValue is the all results name', () => {
    handleInputValueChange(debouncedSetQuery)(EVENT)
    expect(debouncedSetQuery).not.toHaveBeenCalled()
  })

  it('should call debouncedSetQuery in any other case', () => {
    handleInputValueChange(debouncedSetQuery)({
      ...EVENT,
      inputValue: 'anything',
    })
    expect(debouncedSetQuery).toHaveBeenCalledWith('anything')
  })
})
