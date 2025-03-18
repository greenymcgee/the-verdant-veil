import { Factory } from 'fishery'

import { artworkFactory } from './artwork'
import { genreFactory } from './genre'
import { platformFactory } from './platform'
import { screenshotFactory } from './screenshot'
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
    developers: [],
    featuredVideoId: '',
    firstReleaseDate: '',
    franchises: [],
    gameEngines: [],
    gameModes: [],
    genres: associations.genres || [genreFactory.build()],
    id: sequence,
    igdbId: sequence * Math.random(),
    name: 'Super Metroid',
    platforms: associations.platforms || [platformFactory.build()],
    playerPerspectives: [],
    porters: [],
    published: true,
    publishedAt: '2025-03-12T15:57',
    publishers: [],
    rating: 5,
    releaseDates: [],
    review: '<p>So good</p>',
    screenshots: [screenshotFactory.build(), screenshotFactory.build()],
    slug: 'super-metroid',
    storyline: '',
    summary: '',
    supporters: [],
    themes: [],
    updatedAt: currentTime,
    videos: [videoFactory.build(), videoFactory.build()],
    websites: [],
  }),
)
