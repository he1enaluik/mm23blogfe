import { posts } from '../../data/posts'

export default defineEventHandler((event) => {
  const slug = event.context.params?.slug
  const post = posts.find((p) => p.slug === slug)
  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }
  return post
})

