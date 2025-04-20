'use client'
import React, {
  HTMLAttributes,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import { useKeenSlider } from 'keen-slider/react'
import { noop } from 'swr/_internal'

import 'keen-slider/keen-slider.min.css'
import { CarouselKeyChangeFacade } from '@/facades'
import { useWindowSize } from '@/hooks'

import { CarouselArrow } from '../carouselArrow'
import { GameCard } from '../gameCard'
import { Heading } from '../heading'
import { LinkTo } from '../linkTo'
import { Spinner } from '../spinner'
import { SLIDES_PER_VIEW_MAP } from './constants'
import { updateSlidesPerView } from './utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  allResultsLink: string
  games: GameWithLimitedResources[]
  loading: boolean
  title: string
  validating: boolean
}

const facade = new CarouselKeyChangeFacade({
  carouselRef: { current: null },
  event: {} as KeyboardEvent<HTMLDivElement>,
  keenSliderInstanceRef: { current: { next: noop, prev: noop } },
  slideFocusIndexRef: { current: 0 },
})

export function GameCarousel({
  allResultsLink,
  className,
  games,
  loading,
  title,
  validating,
  ...options
}: Props) {
  const headingId = `${title.toLocaleLowerCase()}-heading`
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)
  const [sliderLoaded, setSliderLoaded] = useState(false)
  const { width } = useWindowSize()
  const carouselRef = useRef<HTMLDivElement>(null)
  const slideFocusIndexRef = useRef(0)

  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      '(min-width: 40rem)': {
        slides: { perView: SLIDES_PER_VIEW_MAP.sm, spacing: 24 },
      },
      '(min-width: 64rem)': {
        slides: { perView: SLIDES_PER_VIEW_MAP.lg, spacing: 24 },
      },
    },
    created() {
      setSliderLoaded(true)
    },
    mode: 'snap',
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    slides: { perView: SLIDES_PER_VIEW_MAP.base },
  })

  const goToPreviousSlide = useCallback(
    () => instanceRef.current?.prev(),
    [instanceRef],
  )

  const goToNextSlide = useCallback(
    () => instanceRef.current?.next(),
    [instanceRef],
  )

  const handleKeyDownChange = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      facade.update({
        carouselRef,
        event,
        keenSliderInstanceRef: instanceRef,
        slideFocusIndexRef,
      })
      facade.handleTabKeyChange()
    },
    [instanceRef],
  )

  useEffect(() => {
    updateSlidesPerView({ callback: setSlidesPerView, slidesPerView, width })
  }, [slidesPerView, width])

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      aria-labelledby={headingId}
      aria-roledescription="carousel"
      className={clsx(
        'bg-primary-50 border-primary-500 border-l-8 px-6 py-3',
        className,
      )}
      data-testid="carousel"
      onKeyDown={handleKeyDownChange}
      ref={carouselRef}
      role="region"
      {...options}
    >
      <header className="flex items-center justify-between">
        <Heading
          as="h2"
          classNameOverrides={{ color: 'text-neutral-900' }}
          id={headingId}
        >
          {title}
        </Heading>
        <LinkTo href={allResultsLink} theme="secondary">
          See all
        </LinkTo>
      </header>
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <div className="relative">
          <CarouselArrow
            direction="left"
            disabled={currentSlide === 0}
            onClick={goToPreviousSlide}
            sliderLoaded={sliderLoaded}
          />
          <div className="keen-slider py-4" ref={sliderRef}>
            {games.map((game, index) => {
              const gameHeadingId = `game-heading-${game.id}`

              return (
                <GameCard
                  active={index === slideFocusIndexRef.current}
                  aria-labelledby={gameHeadingId}
                  aria-roledescription="slide"
                  className={clsx(
                    `keen-slider__slide number-slide${index}`,
                    'sm:shadow-card-dark',
                  )}
                  data-testid={`game-slide-${game.id}`}
                  game={game}
                  headingProps={{ as: 'h3', id: gameHeadingId }}
                  key={game.id}
                  role="group"
                  validating={validating}
                  variant="carousel"
                />
              )
            })}
          </div>
          <CarouselArrow
            direction="right"
            disabled={currentSlide === games.length - slidesPerView}
            onClick={goToNextSlide}
            sliderLoaded={sliderLoaded}
          />
        </div>
      )}
    </div>
  )
}
