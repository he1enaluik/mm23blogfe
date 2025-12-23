export function paginate<T>(items: T[], page: number = 1, perPage: number = 5) {
  const currentPage = Math.max(1, Number(page) || 1);
  const total = items.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  return {
    data: items.slice(start, end),
    per_page: perPage,
    current_page: currentPage,
    total,
    last_page: lastPage,
  };
}

