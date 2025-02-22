'use client'
import React, { useCallback, useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Pagination } from 'react-headless-pagination'

import { Icon } from '@/components/icon'
import { ROUTES, TRANSITION_STYLES } from '@/constants'

type PaginationProps = Omit<
  PropsOf<typeof Pagination>,
  | 'currentPage'
  | 'setCurrentPage'
  | 'totalPages'
  | 'edgePageCount'
  | 'middlePagesSiblingCount'
>

interface Props extends PaginationProps {
  route: 'adminGames'
  totalPages: number
}

const PAGE_TURN_BUTTON_CLASSES =
  'text-primary-700 flex h-8 w-8 items-center justify-center rounded-lg border-1 border-neutral-50'

export function PaginationWrapper({
  className,
  route,
  totalPages,
  ...options
}: Props) {
  const searchParams = useSearchParams()
  const initialPage = Number(searchParams.get('page'))
  const [currentPage, setCurrentPage] = useState<number>(initialPage || 0)
  const { push } = useRouter()

  const renderExtraProps = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams)
      params.set('page', String(page - 1))
      return {
        'aria-label': `Go to page ${page}`,
        'data-testid': `page-${page}`,
        href: `${ROUTES[route]}?${params}`,
      }
    },
    [route, searchParams],
  )
  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams)
      params.set('page', String(page))
      setCurrentPage(page)
      push(`${ROUTES[route]}?${params}`)
    },
    [push, route, searchParams],
  )

  return (
    <Pagination
      className={clsx(
        'text-body-xs flex justify-end gap-1 font-medium',
        className,
      )}
      currentPage={currentPage}
      edgePageCount={2}
      middlePagesSiblingCount={2}
      setCurrentPage={handlePageChange}
      totalPages={totalPages}
      truncableText="..."
      {...options}
    >
      <Pagination.PrevButton
        aria-label="Previous Page"
        className={clsx(PAGE_TURN_BUTTON_CLASSES, {
          'cursor-pointer': currentPage !== 0,
          'opacity-50': currentPage === 0,
        })}
      >
        <Icon icon="chevron-double-left" />
      </Pagination.PrevButton>

      <nav>
        <ul className="flex items-center gap-1">
          <Pagination.PageButton
            activeClassName="bg-primary-700 text-white hover:opacity-70"
            as={<Link href="/" />}
            className={clsx(
              'flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg',
              TRANSITION_STYLES.inputHover,
            )}
            inactiveClassName="border-neutral-50 border-1 text-primary-700 hover:opacity-60"
            renderExtraProps={renderExtraProps}
          />
        </ul>
      </nav>

      <Pagination.NextButton
        aria-label="Next Page"
        className={clsx(PAGE_TURN_BUTTON_CLASSES, {
          'cursor-pointer': currentPage !== totalPages - 1,
          'opacity-50': currentPage === totalPages - 1,
        })}
      >
        <Icon icon="chevron-double-right" />
      </Pagination.NextButton>
    </Pagination>
  )
}
