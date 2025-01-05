import { useSearchParams } from 'next/navigation'

import { ROUTES } from '@/constants'

export function useLoginRedirectUrl() {
  const redirect = useSearchParams().get('redirect')
  if (redirect) return redirect as string

  return ROUTES.home
}
