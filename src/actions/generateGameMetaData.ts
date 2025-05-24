import type { Metadata } from 'next'

import { getGame } from './getGame'

interface Params {
  pageParams: Promise<{ slug: string }>
  type: 'admin-show' | 'edit' | 'preview-show' | 'show'
}

const TITLE_MAP = {
  'admin-show': 'Admin: ',
  edit: 'Edit: ',
  'preview-show': 'Preview: ',
  show: '',
}

export async function generateGameMetadata({
  pageParams,
  type,
}: Params): Promise<Metadata> {
  const { slug } = await pageParams
  const { game, isNotFoundError } = await getGame(slug)

  if (isNotFoundError) return { title: 'Not Found' }

  return {
    description: game.summary,
    title: `${TITLE_MAP[type]}${game.name}`,
  }
}
