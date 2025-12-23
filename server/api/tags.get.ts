import { tags } from '../data/tags'
import { paginate } from '../utils/paginate'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = Number(query.page ?? 1)
  const perPage = Number(query.perPage ?? 5)
  return paginate(tags, page, perPage)
})

