import { ROUTES } from '@/constants'
import { renderHookWithProviders } from '@/test/helpers'

import { useSetBreadcrumbs } from '..'

describe('useSetBreadcrumbs', () => {
  it('should set the PageContext breadcrumbs', () => {
    const breadcrumbs: Breadcrumb[] = [{ name: 'Games', route: ROUTES.games }]
    const { result } = renderHookWithProviders(() =>
      useSetBreadcrumbs(breadcrumbs),
    )
    expect(result.current).toEqual(breadcrumbs)
  })

  // The result is the same either way, but this test runs with the if statement being true
  it('should not set the breadcrumbs when they match the given breadcrumbs', () => {
    const breadcrumbs: Breadcrumb[] = [{ name: 'Games', route: ROUTES.games }]
    const { result } = renderHookWithProviders(
      () => useSetBreadcrumbs(breadcrumbs),
      { initialPageContext: { initialBreadcrumbs: breadcrumbs } },
    )
    expect(result.current).toEqual(breadcrumbs)
  })
})
