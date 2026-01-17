interface Params {
  active: boolean | undefined
  validating: boolean
}

export function getTabIndex({ active, validating }: Params) {
  if (validating) return -1

  if (!active) return -1

  return 0
}
