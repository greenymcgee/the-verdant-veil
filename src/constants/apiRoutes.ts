export const API_ROUTES = {
  currentUser: '/current_user',
  game: (slug: Game['slug']) => `/games/${slug}`,
  gameFilters: '/game_filters',
  games: '/games',
  login: '/login',
  logout: '/logout',
  resetPassword: '/reset_password',
} as const
