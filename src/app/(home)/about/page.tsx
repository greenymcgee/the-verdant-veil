import React from 'react'
import type { Metadata } from 'next'

import { Card, Heading, Icon } from '@/components'

import { PageWithNavbar } from '../components'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <PageWithNavbar activeLinkTitle="About">
      <div className="container" data-testid="about-page">
        <Card>
          <Heading className="mb-2 flex items-center gap-3">
            About The Verdant Veil
          </Heading>
          <p className="mb-4">
            The Verdant Veil is a review site for any game I can conjure up
            memories about. I associate many of my favorite memories closely
            with the games I was playing at any given point in my life.
            Oftentimes, people are a core part of those memories, and I hope to
            capture what I like or dislike about a game by traveling down memory
            lane.
          </p>
          <Heading as="h2" className="mb-1 flex items-center gap-1">
            <Icon className="text-primary-900 inline" icon="user" /> Who?
          </Heading>
          <p className="mb-4">
            Hi, I&apos;m Houston. I&apos;ve loved video games for as long as I
            can remember, and I plan to keep playing new games I find
            interesting and revisiting old games I love. I&apos;ve realized in
            recent years that my brain is running out of space for some of those
            older memories, and I want to try to capture them before I lose
            them.
          </p>
          <Heading as="h2" className="mb-1 flex items-center gap-1">
            <Icon className="text-primary-900 inline" icon="edit" /> What to
            Expect
          </Heading>
          <p className="mb-4">
            Casual tales of epic journeys, dull landscapes, or somewhere in
            between. As long as there&apos;s a memory, there&apos;s a game to be
            reviewed.
          </p>
          <Heading as="h2" className="mb-1 flex items-center gap-1">
            <Icon className="text-primary-900 inline" icon="videogame" /> My
            Kind of Games
          </Heading>
          <p>
            I&apos;m typically looking for some sort of journey that has an
            incredible story attached to it or something that has really fun
            mechanics, if not both. I&apos;m rarely looking for a shooter, but
            sometimes the mood hits. I like a good strategy game from time to
            time, and I enjoy the occasional superhero flying through the city
            type. I&apos;m pretty likely to pick up a soulsborne, and I can
            really get into a good metroidvania. Nintendo will probably always
            be up to something that I&apos;m interested in for one reason or
            another, and I really go for some cozy games like Minecraft and
            Stardew Valley.
          </p>
        </Card>
      </div>
    </PageWithNavbar>
  )
}
