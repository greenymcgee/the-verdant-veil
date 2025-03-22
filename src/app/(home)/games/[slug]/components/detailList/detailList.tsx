import React from 'react'

type GameListProperty =
  | Game['developers']
  | Game['publishers']
  | Game['genres']
  | Game['gameEngines']
  | Game['gameModes']
  | Game['themes']
  | Game['playerPerspectives']
  | Game['franchises']

interface Props {
  list: GameListProperty
  title: string
}

export function DetailList({ list, title }: Props) {
  return (
    <div>
      <p className="text-heading-sm mb-2 font-semibold text-neutral-800">
        {title}
      </p>
      {list.length ? (
        <ul data-testid="list">
          {list.map(({ id, name }) => (
            <li className="text-secondary-800 font-medium" key={id}>
              {name}
            </li>
          ))}
        </ul>
      ) : (
        '-'
      )}
    </div>
  )
}
