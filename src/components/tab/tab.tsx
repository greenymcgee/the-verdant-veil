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
        className={clsx(
          'hover:bg-primary-50 focus:bg-primary-50 border-primary-900 px-8 py-6',
          'font-semibold transition-colors group-first:rounded-tl-sm group-last:rounded-tr-sm',
          'border-r-1 border-b-1 group-last:border-r-0',
          TRANSITION_STYLES.inputHover,
          {
            'bg-primary-50': active,
            'bg-white': !active,
          },
        )}
        href={`#${hash}`}
      >
        <Icon className="inline align-middle text-2xl" icon={icon} />{' '}
        <span className="align-middle">{title}</span>
      </a>
    </li>
  )
}
