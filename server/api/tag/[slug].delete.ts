import { tags } from '../../data/tags'

export default defineEventHandler((event) => {
  const slug = event.context.params?.slug
  const index = tags.findIndex((t) => t.slug === slug)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Tag not found' })
  }
  tags.splice(index, 1)
  return { ok: true }
})

