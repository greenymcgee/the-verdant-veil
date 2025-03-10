import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

import { HEADING_CLASSNAME_MAP } from './constants'

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  as?: keyof typeof HEADING_CLASSNAME_MAP
  /**
   * Classnames that will override their given style's default classnames.
   * Example:
   *
   * // This would override the default font-size classnames determined by the "as" prop.
   * { classNameOverrides: { fontSize: 'text-heading-xxl' } }
   */
  classNameOverrides?: {
    color?: string
    fontSize?: string
    fontWeight?: string
    leading?: string
  }
}

export function Heading({
  as: As = 'h1',
  children,
  className,
  classNameOverrides,
  ...options
}: Props) {
  return (
    <As
      className={clsx(
        {
          [HEADING_CLASSNAME_MAP[As]]: !classNameOverrides?.fontSize,
          'font-bold': !classNameOverrides?.fontWeight && As === 'h1',
          'font-semibold': !classNameOverrides?.fontWeight && As !== 'h1',
          'leading-heading': !classNameOverrides?.leading,
          'text-neutral-900': !classNameOverrides?.color && As === 'h1',
        },
        classNameOverrides?.color,
        classNameOverrides?.fontSize,
        classNameOverrides?.fontWeight,
        classNameOverrides?.leading,
        className,
      )}
      {...options}
    >
      {children}
    </As>
  )
}
