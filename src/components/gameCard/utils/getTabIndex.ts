interface Params {
  active: boolean | undefined
  validating: boolean
}

export function getTabIndex({ active, validating }: Params) {
  if (typeof active === 'undefined' && validating) return -1

  if (typeof active === 'undefined' && !validating) return 0

  if (!active || validating) return -1

  return 0
}
