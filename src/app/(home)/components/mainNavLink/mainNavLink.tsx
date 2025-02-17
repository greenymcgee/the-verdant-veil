import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { TRANSITION_STYLES } from '@/constants'
import { useScrollPosition } from '@/hooks'

interface MainNavLinkProps {
  activeLinkTitle: 'Home' | 'About'
  href: PropsOf<typeof Link>['href']
  onClick?: VoidFunction
  title: 'Home' | 'Admin' | 'About' | 'Login'
  type: 'desktop' | 'mobile'
}

const BASE_CLASSNAME = clsx(
  TRANSITION_STYLES.inputHover,
  'relative font-bold transition-colors',
  'after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-0',
  'after:rounded-sm after:transition-width after:content-[""] hover:after:w-[75%]',
)

export function MainNavLink({
  activeLinkTitle,
  href,
  onClick,
  title,
  type,
  ...options
}: MainNavLinkProps) {
  const { y } = useScrollPosition()
  const isActiveLink = activeLinkTitle === title

  return (
    <Link
      className={clsx(BASE_CLASSNAME, {
        'after:bg-secondary-400': type === 'desktop' && !y,
        'after:bg-secondary-900': type === 'mobile' || y,
        'after:w-[75%]': isActiveLink,
        'hover:text-secondary-400': type === 'desktop' && !y,
        'hover:text-secondary-900': type === 'mobile' || y,
        'text-secondary-400': isActiveLink && type === 'desktop' && !y,
        'text-secondary-900':
          (isActiveLink && type === 'mobile') || (isActiveLink && y),
      })}
      href={href}
      onClick={onClick}
      {...options}
    >
      {title}
    </Link>
  )
}
