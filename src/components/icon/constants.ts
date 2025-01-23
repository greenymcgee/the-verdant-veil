import { HTMLAttributes, JSX } from 'react'

import {
  ChevronLeft,
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

export const ICON_TYPE_MAP: Record<
  IconType,
  (props: HTMLAttributes<HTMLOrSVGElement>) => JSX.Element
> = {
  'chevron-left': ChevronLeft,
  edit: EditIcon,
  'filter-alt': FilterAlt,
  image: ImageIcon,
  magnify: Magnify,
  'message-draw': MessageDraw,
  'outline-filter-alt': OutlineFilterAlt,
  'plus-thick': PlusThick,
  'round-sort': RoundSort,
  table: TableIcon,
  trash: TrashIcon,
  user: UserIcon,
  videogame: VideogameIcon,
} as const
