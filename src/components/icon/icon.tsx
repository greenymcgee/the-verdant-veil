import React, { HTMLAttributes } from 'react'

import {
  FilterAlt,
  ImageIcon,
  Magnify,
  MessageDraw,
  OutlineFilterAlt,
  RoundPlus,
  RoundSort,
  TableIcon,
  UserIcon,
  VideogameIcon,
} from '../svgs'

interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
  icon:
    | 'filter-alt'
    | 'image'
    | 'magnify'
    | 'message-draw'
    | 'outline-filter-alt'
    | 'round-plus'
    | 'round-sort'
    | 'table'
    | 'user'
    | 'videogame'
}

export function Icon({ icon, ...options }: IconProps) {
  switch (icon) {
    case 'filter-alt':
      return <FilterAlt data-testid="filter-alt-icon" {...options} />
    case 'image':
      return <ImageIcon data-testid="image-icon" {...options} />
    case 'message-draw':
      return <MessageDraw data-testid="message-draw-icon" {...options} />
    case 'magnify':
      return <Magnify data-testid="magnify-icon" {...options} />
    case 'outline-filter-alt':
      return (
        <OutlineFilterAlt data-testid="outline-filter-alt-icon" {...options} />
      )
    case 'round-plus':
      return <RoundPlus data-testid="round-plus-icon" {...options} />
    case 'round-sort':
      return <RoundSort data-testid="round-sort-icon" {...options} />
    case 'table':
      return <TableIcon data-testid="table-icon" {...options} />
    case 'user':
      return <UserIcon data-testid="user-icon" {...options} />
    case 'videogame':
      return <VideogameIcon data-testid="videogame-icon" {...options} />
    default:
      return null
  }
}
