import React, { ReactElement } from 'react'

import { Card, Heading, Icon, Logo } from '@/components'

interface Props {
  actionBar: string | ReactElement
  heading: string | ReactElement
  status: number | undefined
  subtitle: string | ReactElement
  testId?: string
}

export function HomeErrorBoundary({
  actionBar,
  heading,
  subtitle,
  status,
  testId,
}: Props) {
  return (
    <div className="container" data-testid={testId}>
      <Card className="px-6 py-8">
        <header className="flex flex-col items-center gap-6 lg:flex-row">
          <Logo className="mb-3 text-[16rem] text-neutral-900 md:text-[20rem] lg:text-[16rem]" />
          <div>
            <Heading className="mb-2 font-serif">{heading}</Heading>
            <Heading
              as="h2"
              className="text-danger-700 mb-4 flex items-center gap-2"
            >
              <div className="leading-6 md:leading-8">
                <span className="bg-danger-700 inline-flex rounded-full p-1 align-middle text-white">
                  <Icon
                    className="inline text-base md:text-2xl"
                    icon="exclamation-thick"
                  />
                </span>
              </div>
              <span className="align-middle">{status}</span>
            </Heading>
            <p>{subtitle}</p>
            <section className="pt-6" data-testid="action-bar">
              {actionBar}
            </section>
          </div>
        </header>
      </Card>
    </div>
  )
}
