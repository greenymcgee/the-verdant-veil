import React, { HTMLAttributes } from 'react'

import {
  EditIcon,
  FilterAlt,
  ImageIcon,
  Magnify,
  MessageDraw,
  OutlineFilterAlt,
  PlusThick,
  RoundSort,
  TableIcon,
  TrashIcon,
  UserIcon,
  VideogameIcon,
} from '../svgs'

interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
  icon: IconType
}

export function Icon({ icon, ...options }: IconProps) {
  switch (icon) {
    case 'edit':
      return <EditIcon data-testid="edit-icon" {...options} />
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
    case 'plus-thick':
      return <PlusThick data-testid="plus-thick-icon" {...options} />
    case 'round-sort':
      return <RoundSort data-testid="round-sort-icon" {...options} />
    case 'table':
      return <TableIcon data-testid="table-icon" {...options} />
    case 'trash':
      return <TrashIcon data-testid="trash-icon" {...options} />
    case 'user':
      return <UserIcon data-testid="user-icon" {...options} />
    case 'videogame':
      return <VideogameIcon data-testid="videogame-icon" {...options} />
    default:
      return null
  }
}
