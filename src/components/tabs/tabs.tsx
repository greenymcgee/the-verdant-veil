'use client'
import React, { KeyboardEvent, ReactElement, useCallback, useRef } from 'react'

import { useHash } from '@/hooks'

import { Tab } from '../tab'
import { TabPanel } from '../tabPanel'
import { tabKeyChangeFacade } from './facades'

interface Tab {
  hash: string
  icon: IconType
  title: string
}

interface Props {
  panels: Array<{ element: ReactElement; hash: string }>
  tabs: Array<Tab>
}

export function Tabs({ panels, tabs }: Props) {
  const hash = useHash()
  const tablistRef = useRef<HTMLUListElement>(null)
  const tabFocusIndexRef = useRef(0)

  const handleKeyDownChange = useCallback(
    (event: KeyboardEvent<HTMLUListElement>) => {
      tabKeyChangeFacade.update({ event, tabFocusIndexRef, tablistRef })
      tabKeyChangeFacade.handleTabKeyChange()
    },
    [],
  )

  return (
    <>
      <nav
        className="md:overflow-x-unset max-w-full overflow-x-auto"
        data-testid="tabs"
      >
        <ul
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
        </ul>
      </nav>
      {panels.map((panel, index) => {
        return (
          <TabPanel
            active={hash ? `#${panel.hash}` === hash : index === 0}
            hash={panel.hash}
            key={panel.hash}
          >
            {panel.element}
          </TabPanel>
        )
      })}
    </>
  )
}
