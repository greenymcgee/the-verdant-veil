import { UseComboboxSelectedItemChange } from 'downshift'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { ROUTES } from '@/constants'

type ItemChangeEvent = UseComboboxSelectedItemChange<GameWithLimitedResources>
type Push = AppRouterInstance['push']

export function handleSelectedItemChange(query: string, push: Push) {
  return ({ selectedItem }: ItemChangeEvent) => {
    if (!selectedItem?.slug) return push(`${ROUTES.games}?query=${query}`)

    push(ROUTES.game(selectedItem.slug))
  }
}
