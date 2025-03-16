'use client'
import React, { ReactElement } from 'react'
import clsx from 'clsx'

import { useHash } from '@/hooks'

import { Tab } from '../tab'

interface Props {
  tabContents: Array<{ element: ReactElement; hash: string }>
  tabs: Array<{
    hash: string
    icon: IconType
    title: string
  }>
}

export function Tabs({ tabContents, tabs }: Props) {
  const hash = useHash()

  return (
    <>
      <nav className="mb-[21px]" data-testid="tabs">
        <ul className="text-primary-900 flex">
          {tabs.map((tab, index) => (
            <Tab
              active={hash ? `#${tab.hash}` === hash : index === 0}
              hash={tab.hash}
              icon={tab.icon}
              key={tab.hash}
              title={tab.title}
            />
          ))}
        </ul>
      </nav>
      {tabContents.map((tabContent, index) => {
        const active = hash ? `#${tabContent.hash}` === hash : index === 0
        return (
          <article
            className={clsx(
              'shadow-card-light rounded-tr-sm rounded-b-sm bg-white p-3',
              {
                hidden: !active,
              },
            )}
            id={tabContent.hash}
            key={tabContent.hash}
          >
            {tabContent.element}
          </article>
        )
      })}
    </>
  )
}
