import { UseComboboxInputValueChange } from 'downshift'

import { SEE_ALL_RESULTS_ITEM } from '../../../constants'

type InputChangeEvent = UseComboboxInputValueChange<GameWithLimitedResources>
type DebouncedSetQuery = (inputValue: string) => void

export function handleInputValueChange(debouncedSetQuery: DebouncedSetQuery) {
  return ({ inputValue }: InputChangeEvent) => {
    if (inputValue === SEE_ALL_RESULTS_ITEM.name) return

    debouncedSetQuery(inputValue)
  }
}
