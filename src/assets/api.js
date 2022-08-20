const isResOk = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getPizzas = (activeFilter, activeSort) => {
  return fetch(
    `https://62fd332bb9e38585cd4e884a.mockapi.io/items?${
      activeFilter > 0 ? `category=${activeFilter}` : ""
    }&sortBy=${activeSort.property}`
  ).then(isResOk);
};
