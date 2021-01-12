
export const getPagination = (page, size: number) => {
  const limit: number = size ? +size : 5;
  const offset: number = page ? parseInt(page) * limit : 0;
  return { limit, offset };
};

export const getPagingData = (propData: any, page: number, limit: number) => {
  const { count: totalItems, rows: data } = propData;
  const currentPage = page ? page : 0;
  const totalPages: number = Math.ceil(totalItems / limit);
  return { totalItems, data, totalPages, currentPage };
};
