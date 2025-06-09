import React, { Suspense } from 'react'

import { Input } from '../input'
import { IndexSearchbarClientComponent } from './clientComponent'

type Props = PropsOf<typeof IndexSearchbarClientComponent>

/**
 * A <Searchbar /> setup specifically for running a search in and index page of
 * records like /games.
 */
export function IndexSearchbar(props: Props) {
  return (
    <Suspense
      fallback={
        <Input
          autoComplete="off"
          className="skeleton px-8"
          data-testid={props.id}
          id={props.id}
          placeholder="Search"
        />
      }
    >
      <IndexSearchbarClientComponent {...props} />
    </Suspense>
  )
}
