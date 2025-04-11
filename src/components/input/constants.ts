import { HTMLInputTypeAttribute } from 'react'
import clsx from 'clsx'

import { FOCUS_STYLE_CLASS_NAME, TRANSITION_STYLES } from '@/constants'

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
  TRANSITION_STYLES.inputHover,
  'hover:shadow-input-hover transition',
)

const TEXT_INPUT_CLASS_NAMES = clsx(
  'rounded-sm border border-neutral-400 px-2 py-2 text-neutral-700 w-full',
  FOCUS_STYLE_CLASS_NAME,
)

export const INPUT_CLASS_NAMES_MAP: Record<InputTypes, string> = {
  checkbox: clsx(
    'rounded checked:bg-primary-900 border-primary-300 cursor-pointer',
    BASE_INPUT_CLASSNAMES,
    FOCUS_STYLE_CLASS_NAME,
  ),
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
