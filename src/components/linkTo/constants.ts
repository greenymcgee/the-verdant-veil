import clsx from 'clsx'

import { TRANSITION_STYLES } from '@/constants'

export const BASE_LINK_TO_CLASSNAME = clsx(
  'hover:opacity-70 hover:underline font-medium transition-opacity',
  TRANSITION_STYLES.inputHover,
)

export const LINK_TO_THEME_MAP: Record<StyleTheme, string> = {
  danger: 'text-danger-800',
  neutral: 'text-neutral-800',
  primary: 'text-primary-800',
  secondary: 'text-secondary-800',
  success: 'text-success-800',
}
