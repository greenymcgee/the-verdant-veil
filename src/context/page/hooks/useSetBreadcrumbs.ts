'use client'
import { useEffect } from 'react'

import { usePageContext } from './usePageContext'

export function useSetBreadcrumbs(givenBreadcrumbs: Breadcrumb[]) {
  const { breadcrumbs, setBreadcrumbs } = usePageContext()
  useEffect(() => {
    const breadcrumbNames = breadcrumbs.map(({ name }) => name)
    if (givenBreadcrumbs.every(({ name }) => breadcrumbNames.includes(name)))
      return

    setBreadcrumbs(givenBreadcrumbs)
  }, [breadcrumbs, givenBreadcrumbs, setBreadcrumbs])
  return breadcrumbs
}
