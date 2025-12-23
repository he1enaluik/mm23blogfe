import { tags } from '../data/tags'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name?: string; slug?: string }>(event)
  if (!body?.name || !body?.slug) {
    throw createError({ statusCode: 422, statusMessage: 'Validation error', data: { errors: { name: ['Name required'], slug: ['Slug required'] } } })
  }
  const exists = tags.find((t) => t.slug === body.slug)
  if (exists) {
    throw createError({ statusCode: 422, statusMessage: 'Validation error', data: { errors: { slug: ['Slug already exists'] } } })
  }
  const now = new Date().toISOString().slice(0, 10)
  const tag = {
    id: tags.length ? Math.max(...tags.map((t) => t.id)) + 1 : 1,
    name: body.name,
    slug: body.slug,
    created_at: now,
    updated_at: now,
  }
  tags.push(tag)
  return tag
})

