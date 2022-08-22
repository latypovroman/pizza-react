import React from "react";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import * as api from "../assets/api";
import PizzaSkeleton from "../assets/PizzaSkeleton";
import Pagination from "../components/Pagination";

const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(true);
  const [activeFilter, setActiveFilter] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [activeSort, setActiveSort] = React.useState({
    name: "популярности",
    property: "rating",
  });

  React.useEffect(() => {
    setIsFetching(true);
    api
      .getPizzas(activeFilter, activeSort, searchValue, currentPage)
      .then((pizzas) => {
        setPizzas(pizzas);
        setIsFetching(false);
      });
    window.scrollTo(0, 0);
  }, [activeFilter, activeSort, searchValue, currentPage]);

  const onClickCategory = (index) => {
    setActiveFilter(index);
  };

  const onClickSort = (type) => {
    setActiveSort(type);
  };

  const onChangeCurrentPage = (number) => {
    setCurrentPage(number);
  };
  console.log(pizzas.length);

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
      {(pizzas.length > 5 || currentPage > 1) && (
        <Pagination onChangeCurrentPage={onChangeCurrentPage} />
      )}
    </div>
  );
};

export default Home;
