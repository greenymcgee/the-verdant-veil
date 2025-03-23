'use client'
import React, { KeyboardEvent, useCallback, useRef } from 'react'

import { useHash } from '@/hooks'

import { Tab } from '../tab'
import { tabKeyChangeFacade } from './facades'

interface Tab {
  hash: string
  icon: IconType
  title: string
}

interface Props {
  tabs: Array<Tab>
}

export function Tabs({ tabs }: Props) {
  const hash = useHash()
  const tablistRef = useRef<HTMLDivElement>(null)
  const tabFocusIndexRef = useRef(0)

  const handleKeyDownChange = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      tabKeyChangeFacade.update({ event, tabFocusIndexRef, tablistRef })
      tabKeyChangeFacade.handleTabKeyChange()
    },
    [],
  )

  return (
    <nav
      className="md:overflow-x-unset max-w-full overflow-x-auto"
      data-testid="tabs"
    >
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        className="text-primary-900 flex"
        onKeyDown={handleKeyDownChange}
        ref={tablistRef}
        role="tablist"
      >
        {tabs.map((tab, index) => (
          <Tab
            active={hash ? `#${tab.hash}` === hash : index === 0}
            hash={tab.hash}
            icon={tab.icon}
            key={tab.hash}
            title={tab.title}
          />
        ))}
      </div>
    </nav>
  )
}
