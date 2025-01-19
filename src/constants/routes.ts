export const ROUTES = {
  about: '/about',
  adminEditGame: (slug: Game['slug']) => `/admin/games/${slug}/edit`,
  adminGame: (slug: Game['slug']) => `/admin/games/${slug}`,
  adminGames: '/admin/games',
  adminNewGame: '/admin/games/new',
  adminUsers: '/admin/users',
  forbidden: '/forbidden',
  forgotYourPassword: '/forgot-password',
  games: '/games',
  home: '/',
  login: '/login',
} as const

export type RouteKey = keyof typeof ROUTES
