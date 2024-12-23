/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes'

import '@testing-library/jest-dom'

vi.mock('next/navigation', async () => {
  const mockRouter = await vi.importActual('next-router-mock')
  // @ts-ignore
  mockRouter.useParser(createDynamicRouteParser(['/reset-password/[token]']))
  return {
    useParams: () => mockRouter.query,
    usePathname: () => mockRouter.pathname,
    useRouter: mockRouter.useRouter,
    useSearchParams: () =>
      new URLSearchParams(mockRouter.query as Record<string, string>),
  }
})

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn().mockImplementation((query) => ({
      addEventListener: vi.fn(),
      addListener: vi.fn(), // deprecated
      dispatchEvent: vi.fn(),
      matches: false,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
      removeListener: vi.fn(), // deprecated
    })),
    writable: true,
  })
})

/* eslint-enable @typescript-eslint/ban-ts-comment */
