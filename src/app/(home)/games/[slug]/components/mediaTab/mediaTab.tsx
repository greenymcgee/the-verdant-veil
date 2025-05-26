import React from 'react'
import Image from 'next/image'

import { Card } from '@/components'

import { MediaSection } from '../mediaSection'

interface Props {
  game: Game
}

export function MediaTab({ game }: Props) {
  return (
    <Card variant="tabpanel">
      <MediaSection heading="Videos" itemCount={game.videos.length}>
        {game.videos.map((video) => (
          <li key={video.id}>
            <p className="mb-1 font-medium">{video.name}</p>
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-64 w-full md:h-96"
              referrerPolicy="strict-origin-when-cross-origin"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title="YouTube video player"
            />
          </li>
        ))}
      </MediaSection>
      <MediaSection heading="Screenshots" itemCount={game.screenshots.length}>
        {game.screenshots.map((screenshot, index) => (
          <li key={screenshot.id}>
            <Image
              alt={`${game.name} - Screenshot ${index + 1}`}
              className="w-full"
              height={screenshot.height}
              src={screenshot.url}
              width={screenshot.width}
            />
          </li>
        ))}
      </MediaSection>
      <MediaSection heading="Artworks" itemCount={game.artworks.length}>
        {game.artworks.map((artwork, index) => (
          <li key={artwork.id}>
            <Image
              alt={`${game.name} - Artwork ${index + 1}`}
              className="w-full"
              height={artwork.height}
              src={artwork.url}
              width={artwork.width}
            />
          </li>
        ))}
      </MediaSection>
    </Card>
  )
}
