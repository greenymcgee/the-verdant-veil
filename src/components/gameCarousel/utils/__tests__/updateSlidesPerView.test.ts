import { BREAKPOINTS } from '@/constants'

import { SLIDES_PER_VIEW_MAP } from '../../constants'
import { updateSlidesPerView } from '..'

const PARAMS: FirstParameterOf<typeof updateSlidesPerView> = {
  callback: vi.fn(),
  slidesPerView: 0,
  width: 0,
}

afterEach(() => {
  vi.clearAllMocks()
})

describe('updateSlidesPerView', () => {
  it('should handle a large update', () => {
    updateSlidesPerView({ ...PARAMS, width: BREAKPOINTS.lg })
    expect(PARAMS.callback).toHaveBeenCalledWith(SLIDES_PER_VIEW_MAP.lg)
  })

  it('should handle a small update', () => {
    updateSlidesPerView({ ...PARAMS, width: BREAKPOINTS.sm })
    expect(PARAMS.callback).toHaveBeenCalledWith(SLIDES_PER_VIEW_MAP.sm)
  })

  it('should handle a base update', () => {
    updateSlidesPerView(PARAMS)
    expect(PARAMS.callback).toHaveBeenCalledWith(SLIDES_PER_VIEW_MAP.base)
  })

  it("should do nothing when slidesPerView doesn't need updating", () => {
    updateSlidesPerView({
      ...PARAMS,
      slidesPerView: SLIDES_PER_VIEW_MAP.sm,
      width: BREAKPOINTS.sm + 1,
    })
    expect(PARAMS.callback).not.toHaveBeenCalled()
  })
})
