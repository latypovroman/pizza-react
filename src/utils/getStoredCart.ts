export default () => {
  const storedCart = localStorage.getItem("cart");
  const emptyCartState = {
    totalPrice: 0,
    items: [],
    totalCount: 0,
  };
  return storedCart ? JSON.parse(storedCart) : emptyCartState;
};
