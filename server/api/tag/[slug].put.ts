import { tags } from '../../data/tags'

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug
  const body = await readBody<{ name?: string; slug?: string }>(event)
  const tag = tags.find((t) => t.slug === slug)
  if (!tag) {
    throw createError({ statusCode: 404, statusMessage: 'Tag not found' })
  }
  if (!body?.name || !body?.slug) {
    throw createError({ statusCode: 422, statusMessage: 'Validation error', data: { errors: { name: ['Name required'], slug: ['Slug required'] } } })
  }
  const slugExists = tags.find((t) => t.slug === body.slug && t.slug !== slug)
  if (slugExists) {
    throw createError({ statusCode: 422, statusMessage: 'Validation error', data: { errors: { slug: ['Slug already exists'] } } })
  }
  tag.name = body.name
  tag.slug = body.slug
  tag.updated_at = new Date().toISOString().slice(0, 10)
  return tag
})

