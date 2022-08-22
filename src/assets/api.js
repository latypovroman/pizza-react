const isResOk = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getPizzas = (
  activeFilter,
  activeSort,
  searchValue,
  currentPage
) => {
  return fetch(
    `https://62fd332bb9e38585cd4e884a.mockapi.io/items?page=${currentPage}&limit=6&${
      activeFilter > 0 ? `category=${activeFilter}` : ""
    }&sortBy=${activeSort.property}${
      searchValue ? `&search=${searchValue}` : ""
    }`
  ).then(isResOk);
};
