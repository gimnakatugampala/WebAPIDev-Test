const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 1000;

/**
 * Paginates an in-memory array based on req.query.page / req.query.limit
 * and returns a consistent { data, meta } envelope.
 */
function paginate(array, req) {
  let page = parseInt(req.query.page, 10);
  let limit = parseInt(req.query.limit, 10);

  if (!Number.isInteger(page) || page < 1) page = 1;
  if (!Number.isInteger(limit) || limit < 1) limit = DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  const total = array.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const data = array.slice(start, start + limit);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      total_pages: totalPages,
      has_next: page < totalPages,
      has_prev: page > 1,
    },
  };
}

module.exports = { paginate };
