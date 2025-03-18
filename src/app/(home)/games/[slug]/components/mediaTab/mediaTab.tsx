import React from 'react'
import Image from 'next/image'

import { Heading } from '@/components'

interface Props {
  game: Game
}

export function MediaTab({ game }: Props) {
  return (
    <>
      <section className="mb-8" data-testid="game-videos">
        <Heading as="h2" className="mb-2">
          Videos
        </Heading>
        <ul className="grid gap-6 sm:grid-cols-2">
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
        </ul>
      </section>
      <section className="mb-8" data-testid="game-screenshots">
        <Heading as="h2" className="mb-2">
          Screenshots
        </Heading>
        <ul className="grid gap-6 sm:grid-cols-2">
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
        </ul>
      </section>
      <section data-testid="game-artworks">
        <Heading as="h2" className="mb-2">
          Artworks
        </Heading>
        <ul className="grid gap-6 sm:grid-cols-2">
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
        </ul>
      </section>
    </>
  )
}
