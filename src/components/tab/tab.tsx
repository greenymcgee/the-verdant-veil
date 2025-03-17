import React from 'react'
import clsx from 'clsx'

import { TRANSITION_STYLES } from '@/constants'

import { Icon } from '../icon'

interface Props {
  active: boolean
  hash: string
  icon: IconType
  title: string
}

export function Tab({ active, hash, icon, title }: Props) {
  return (
    <li className="group">
      <a
        aria-controls={`${hash}-tabpanel`}
        aria-selected={active}
        className={clsx(
          'hover:bg-primary-50 focus:bg-primary-50 border-primary-900 block',
          'font-semibold transition-colors group-first:rounded-tl-sm group-last:rounded-tr-sm',
          'border-r-1 border-b-1 whitespace-nowrap group-last:border-r-0',
          TRANSITION_STYLES.inputHover,
          {
            'bg-primary-50': active,
            'bg-white': !active,
          },
        )}
        data-testid={`${hash}-tab`}
        href={`#${hash}`}
        id={`${hash}-tab`}
        role="tab"
        tabIndex={active ? 0 : -1}
      >
        <span className="block px-8 py-6">
          <Icon className="inline align-middle text-2xl" icon={icon} />{' '}
          <span className="align-middle">{title}</span>
        </span>
      </a>
    </li>
  )
}
