import React, { HTMLAttributes } from 'react'

import { Magnify, User, VideoGame } from '../svgs'

interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
  icon: 'user' | 'magnify' | 'videogame'
}

export function Icon({ icon, ...options }: IconProps) {
  switch (icon) {
    case 'magnify':
      return <Magnify data-testid="magnify-icon" {...options} />
    case 'user':
      return <User data-testid="user-icon" {...options} />
    case 'videogame':
      return <VideoGame data-testid="videogame-icon" {...options} />
    default:
      return null
  }
}
