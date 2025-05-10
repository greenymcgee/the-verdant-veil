export const API_ROUTES = {
  currentUser: '/current_user',
  game: (slug: Game['slug']) => `/games/${slug}`,
  gameFilters: '/game_filters',
  games: '/games',
  homeCarousel: (carousel: HomeCarouselType) => `/home_carousels/${carousel}`,
  login: '/login',
  logout: '/logout',
  publishGame: (slug: Game['slug']) => `/games/${slug}/publish`,
  refreshGame: (slug: Game['slug']) => `/games/${slug}/refresh`,
  resetPassword: '/reset_password',
} as const
