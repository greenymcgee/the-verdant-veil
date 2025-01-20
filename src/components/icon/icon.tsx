import React, { HTMLAttributes } from 'react'

import { ICON_TYPE_MAP } from './constants'

interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
  icon: IconType
}

export function Icon({ icon, ...options }: IconProps) {
  const IconComponent = ICON_TYPE_MAP[icon]
  return <IconComponent data-testid={`${icon}-icon`} {...options} />
}
