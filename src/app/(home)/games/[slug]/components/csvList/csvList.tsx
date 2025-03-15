import React from 'react'

interface Props {
  listItems: Array<{ id: number; name: string }>
  name: string
  testId: string
}

export function CSVList({ listItems, name, testId }: Props) {
  return (
    <div className="mb-2" data-testid={testId}>
      <p className="inline font-semibold text-neutral-900">{name}: </p>
      <ul className="inline">
        {listItems.map((listItem) => (
          <li
            className="text-secondary-800 mr-1 inline after:content-[','] last:mr-0 last:after:content-none"
            key={listItem.id}
          >
            {listItem.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
