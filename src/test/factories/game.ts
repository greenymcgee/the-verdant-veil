import { Factory } from 'fishery'

import { artworkFactory } from './artwork'
import { companyFactory } from './company'
import { franchiseFactory } from './franchise'
import { genreFactory } from './genre'
import { platformFactory } from './platform'
import { playerPerspectiveFactory } from './playerPerspective'
import { screenshotFactory } from './screenshot'
import { themeFactory } from './theme'
import { videoFactory } from './video'

const currentTime = new Date().toISOString()

export const gameFactory = Factory.define<Game>(
  ({ associations, sequence }) => ({
    ageRatings: [],
    artworks: [artworkFactory.build(), artworkFactory.build()],
    bannerImage: {
      mobile: {
        url: `https://test.com/storage/uploads/games/${sequence}/mobile_blah.webp`,
      },
      url: `https://test.com/storage/uploads/games/${sequence}/blah.webp`,
    },
    cover: {
      animated: false,
      createdAt: currentTime,
      height: 24,
      id: sequence,
      igdbId: sequence * Math.random(),
      imageId: `cover-image-${sequence}`,
      updatedAt: currentTime,
      url: 'http://test-gq-.com',
      width: 56,
    },
    createdAt: currentTime,
    currentlyPlaying: false,
    developers: associations.developers || [companyFactory.build()],
    estimatedFirstPlayedDate: null,
    featuredVideoId: '',
    firstReleaseDate: '1999-01-09T00:00:00Z',
    franchises: associations.franchises || [franchiseFactory.build()],
    gameEngines: [],
    gameModes: [],
    genres: associations.genres || [genreFactory.build()],
    id: sequence,
    igdbId: sequence * Math.random(),
    lastPlayedDate: null,
    name: 'Super Metroid',
    platforms: associations.platforms || [platformFactory.build()],
    playerPerspectives: associations.playerPerspectives || [
      playerPerspectiveFactory.build(),
    ],
    porters: associations.porters || [companyFactory.build()],
    published: true,
    publishedAt: '2025-03-12T15:57',
    publishers: associations.publishers || [companyFactory.build()],
    rating: 5,
    releaseDates: [],
    review: '<p>So good</p>',
    screenshots: [screenshotFactory.build(), screenshotFactory.build()],
    slug: 'super-metroid',
    storyline: '',
    summary: '',
    supporters: associations.supporters || [companyFactory.build()],
    themes: associations.themes || [themeFactory.build()],
    updatedAt: currentTime,
    videos: [videoFactory.build(), videoFactory.build()],
    websites: [],
  }),
)
