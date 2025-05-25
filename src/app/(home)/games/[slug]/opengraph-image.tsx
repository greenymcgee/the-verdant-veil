import { getGame } from '@/actions'

interface Props {
  params: { slug: string }
}

export const size = {
  height: 630,
  width: 1200,
}

export const contentType = 'image/webp'

export default async function GameOGImage({ params }: Props) {
  const { game } = await getGame(params.slug)
  return Response.redirect(game.cover.url)
}
