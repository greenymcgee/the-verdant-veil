export const useParamsMock = vi.fn()

export function mockNextNavigation() {
  vi.mock('next/navigation', async () => {
    const actualNavigation = await vi.importActual('next/navigation')
    const mockRouter = await vi.importActual('next-router-mock')
    return {
      ...actualNavigation,
      useParams: useParamsMock.mockImplementation(() => ({})),
      useRouter: mockRouter.useRouter,
    }
  })
}
