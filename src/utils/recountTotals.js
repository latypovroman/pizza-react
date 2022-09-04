export default (items) => {
  return {
    price: items.reduce((sum, obj) => {
      return obj.price * obj.count + sum;
    }, 0),
    count: items.reduce((sum, item) => {
      return item.count + sum;
    }, 0),
  };
};
