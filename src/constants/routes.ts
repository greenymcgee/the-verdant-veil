export const ROUTES = {
  about: '/about',
  adminEditGame: (slug: Game['slug']) => `/admin/games/${slug}/edit`,
  adminGame: (slug: Game['slug']) => `/admin/games/${slug}`,
  adminGames: '/admin/games',
  adminNewGame: '/admin/games/new',
  adminUsers: '/admin/users',
  forbidden: '/forbidden',
  forgotYourPassword: '/forgot-password',
  game: (slug: Game['slug']) => `/games/${slug}`,
  gamePreview: (slug: Game['slug']) => `/games/${slug}/preview`,
  games: '/games',
  home: '/',
  login: '/login',
  platform: (slug: Platform['slug']) => `/games?platforms[]=${slug}`,
} as const

export type RouteKey = keyof typeof ROUTES
