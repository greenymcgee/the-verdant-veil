import { HTMLInputTypeAttribute } from 'react'
import clsx from 'clsx'

import { TRANSITION_STYLES } from '@/constants'

type InputTypes = Exclude<
  HTMLInputTypeAttribute,
  | 'button'
  | 'color'
  | 'hidden'
  | 'image'
  | 'month'
  | 'range'
  | 'reset'
  | 'submit'
  | 'tel'
  | 'time'
  | 'url'
  | 'week'
>

export const BASE_INPUT_CLASSNAMES = clsx(
  'hover:shadow-input-hover',
  'transition-shadow',
  TRANSITION_STYLES.inputHover,
)

const TEXT_INPUT_CLASS_NAMES =
  'rounded-sm border border-neutral-400 px-2 py-2 text-neutral-700'

export const INPUT_CLASS_NAMES_MAP: Record<InputTypes, string> = {
  checkbox: '',
  date: TEXT_INPUT_CLASS_NAMES,
  'datetime-local': TEXT_INPUT_CLASS_NAMES,
  email: TEXT_INPUT_CLASS_NAMES,
  file: '',
  number: TEXT_INPUT_CLASS_NAMES,
  password: TEXT_INPUT_CLASS_NAMES,
  radio: '',
  search: TEXT_INPUT_CLASS_NAMES,
  text: TEXT_INPUT_CLASS_NAMES,
}
