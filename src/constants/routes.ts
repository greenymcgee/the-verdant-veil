export const ROUTES = {
  about: '/about',
  adminGames: '/admin/games',
  adminUsers: '/admin/users',
  forbidden: '/forbidden',
  forgotYourPassword: '/forgot-password',
  games: '/games',
  home: '/',
  login: '/login',
} as const

export type RouteKey = keyof typeof ROUTES
