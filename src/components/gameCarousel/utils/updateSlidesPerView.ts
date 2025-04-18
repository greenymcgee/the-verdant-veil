import { BREAKPOINTS } from '@/constants'

import { SLIDES_PER_VIEW_MAP } from '../constants'

interface Params {
  callback(slidesPerView: number): void
  slidesPerView: number
  width: number
}

export function updateSlidesPerView({
  callback,
  slidesPerView,
  width,
}: Params) {
  if (width >= BREAKPOINTS.lg && slidesPerView !== SLIDES_PER_VIEW_MAP.lg) {
    return callback(SLIDES_PER_VIEW_MAP.lg)
  }

  if (
    width >= BREAKPOINTS.sm &&
    width < BREAKPOINTS.lg &&
    slidesPerView !== SLIDES_PER_VIEW_MAP.sm
  ) {
    return callback(SLIDES_PER_VIEW_MAP.sm)
  }

  if (width < BREAKPOINTS.sm && slidesPerView !== SLIDES_PER_VIEW_MAP.base) {
    callback(SLIDES_PER_VIEW_MAP.base)
  }
}
