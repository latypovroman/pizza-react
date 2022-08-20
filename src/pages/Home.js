import React from "react";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import * as api from "../assets/api";
import PizzaSkeleton from "../assets/PizzaSkeleton";

const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(true);
  const [activeFilter, setActiveFilter] = React.useState(0);
  const [activeSort, setActiveSort] = React.useState({
    name: "популярности",
    property: "rating",
  });

  React.useEffect(() => {
    setIsFetching(true);
    api.getPizzas(activeFilter, activeSort).then((pizzas) => {
      setPizzas(pizzas);
      setIsFetching(false);
    });
    window.scrollTo(0, 0);
  }, [activeFilter, activeSort]);

  const onClickCategory = (index) => {
    setActiveFilter(index);
  };

  const onClickSort = (type) => {
    setActiveSort(type);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Filter activeFilter={activeFilter} onClickCategory={onClickCategory} />
        <Sort activeSort={activeSort} onClickSort={onClickSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isFetching
          ? [...new Array(9)].map((p, index) => <PizzaSkeleton key={index} />)
          : pizzas.map((pizza) => <PizzaCard key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
