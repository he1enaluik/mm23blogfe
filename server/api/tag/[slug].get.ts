import { tags } from '../../data/tags'

export default defineEventHandler((event) => {
  const slug = event.context.params?.slug
  const tag = tags.find((t) => t.slug === slug)
  if (!tag) {
    throw createError({ statusCode: 404, statusMessage: 'Tag not found' })
  }
  return tag
})

