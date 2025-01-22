export const API_ROUTES = {
  currentUser: '/current_user',
  game: (slug: Game['slug']) => `/games/${slug}`,
  games: '/games',
  login: '/login',
  resetPassword: '/reset_password',
} as const
