'use client'
import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

import { TRANSITION_STYLES } from '@/constants'

import { Icon } from '../icon'

type ButtonProps = Omit<
  HTMLAttributes<HTMLButtonElement>,
  'id' | 'onClick' | 'aria-controls' | 'aria-expanded' | 'type'
>

interface Props extends HTMLAttributes<HTMLDivElement> {
  buttonProps?: ButtonProps
  expanded: boolean
  id: string
  label: string
  toggleExpanded: VoidFunction
}

export function Accordion({
  buttonProps = {},
  children,
  className,
  expanded,
  id,
  label,
  toggleExpanded,
  ...options
}: Props) {
  const { className: buttonClassName, ...buttonOptions } = buttonProps

  return (
    <div className={clsx(className)} {...options}>
      <h3>
        <button
          aria-controls={id}
          aria-expanded={expanded}
          className={clsx(
            'text-primary-900 cursor-pointer rounded transition-opacity hover:opacity-70',
            TRANSITION_STYLES.inputHover,
            buttonClassName,
          )}
          id={label}
          onClick={toggleExpanded}
          type="button"
          {...buttonOptions}
        >
          {label}{' '}
          <Icon
            className={clsx(
              'inline text-2xl transition-transform duration-150 ease-linear',
              {
                '-rotate-180': expanded,
              },
            )}
            icon="chevron-down"
          />
        </button>
      </h3>
      <div
        aria-labelledby={label}
        className={clsx(
          'transition-grid-template-rows grid',
          TRANSITION_STYLES.expand,
          {
            'grid-rows-[0fr]': !expanded,
            'grid-rows-[1fr]': expanded,
          },
        )}
        id={id}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
