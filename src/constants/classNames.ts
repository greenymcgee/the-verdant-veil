import clsx from 'clsx'

interface ButtonThemes {
  outline: Record<StyleTheme, string>
  solid: Record<StyleTheme, string>
}

/**
 * Class names for consistent transition styles.
 */
export const TRANSITION_STYLES = {
  expand: 'duration-200 ease-out',
  inputHover: 'duration-100 ease-linear',
} as const

export const DEFAULT_BUTTON_CLASS_NAMES = clsx(
  'rounded-md font-semibold transition-colors cursor-pointer',
  TRANSITION_STYLES.inputHover,
)

export const DEFAULT_BUTTON_DISPLAY_CLASS_NAMES =
  'inline-flex items-center gap-1'

export const BUTTON_THEMES: ButtonThemes = {
  outline: {
    danger: clsx(
      'border-2 border-danger-900 text-danger-900',
      'hover:border-danger-700 hover:text-danger-700',
    ),
    neutral: clsx(
      'border-2 border-neutral-900 text-neutral-900',
      'hover:border-neutral-700 hover:text-neutral-700',
    ),
    primary: clsx(
      'border-2 border-primary-900 text-primary-900',
      'hover:border-primary-700 hover:text-primary-700',
    ),
    secondary: clsx(
      'border-2 border-secondary-900 text-secondary-900',
      'hover:border-secondary-700 hover:text-secondary-700',
    ),
    success: clsx(
      'border-2 border-success-900 text-neutral-900',
      'hover:border-success-700 hover:text-neutral-700',
    ),
  },
  solid: {
    danger: 'bg-danger-900 text-white hover:bg-danger-700',
    neutral: 'bg-neutral-900 text-white hover:bg-neutral-700',
    primary: 'bg-primary-900 text-white hover:bg-primary-700',
    secondary: 'bg-secondary-900 text-white hover:bg-secondary-700',
    success: 'bg-success-900 text-neutral-900 hover:bg-success-700',
  },
} as const

export const BUTTON_SIZES: Record<'xs' | 'sm' | 'md' | 'lg', string> = {
  lg: 'px-6 py-4',
  md: 'px-5 py-3',
  sm: 'px-3 py-2',
  xs: 'px-2 py-1 text-sm',
} as const

export const FOCUS_STYLE_CLASS_NAME =
  'focus-visible:ring-ring-color focus:shadow-none ring-offset-0 outline-none focus-visible:ring-2 ring-0'

export const GAME_CARD_VARIANTS = {
  carousel: {
    coverClassName: 'aspect-2/3 rounded-t-lg',
    divClassName: 'rounded-b-lg',
    heading: 'truncate',
    linkClassName: 'rounded-lg',
    platforms: 'truncate',
  },
  list: {
    coverClassName:
      'h-96 md:h-64 md:w-48 rounded-t-lg md:rounded-none md:rounded-s-lg',
    divClassName: 'rounded-b-lg md:rounded-none md:rounded-e-lg',
    heading: '',
    linkClassName: 'flex flex-col rounded-lg md:flex-row',
    platforms: '',
  },
} as const

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
} as const
