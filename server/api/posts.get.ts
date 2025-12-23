import { posts } from '../data/posts'
import { paginate } from '../utils/paginate'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = Number(query.page ?? 1)
  const perPage = Number(query.perPage ?? 5)
  return paginate(posts, page, perPage)
})

