import React, { Suspense } from 'react'

import { Input } from '../input'
import { SearchbarClientComponent } from './clientComponent'

export function Searchbar(props: PropsOf<typeof SearchbarClientComponent>) {
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
      <SearchbarClientComponent {...props} />
    </Suspense>
  )
}
