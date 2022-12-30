import { CartItem, CartSliceState } from "../redux/slices/cartSlice";

const recountCounters = (items: CartItem[]) => {
  return {
    price: items.reduce((sum, obj) => {
      return obj.price * obj.count + sum;
    }, 0),
    count: items.reduce((sum, item) => {
      return item.count + sum;
    }, 0),
  };
};

export default (state: CartSliceState) => {
  state.totalPrice = recountCounters(state.items).price;
  state.totalCount = recountCounters(state.items).count;
};
