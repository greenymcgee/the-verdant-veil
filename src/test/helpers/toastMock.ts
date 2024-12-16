export const toastMock = { error: vi.fn(), success: vi.fn() }

vi.mock('react-hot-toast', () => ({ default: toastMock }))
