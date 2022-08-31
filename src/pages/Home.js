import React from "react";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import * as api from "../assets/api";
import PizzaSkeleton from "../assets/PizzaSkeleton";
import Pagination from "../components/Pagination";
import { SearchValueContext } from "../context/SearchValueContext";
import { useDispatch, useSelector } from "react-redux";
import { setActiveFilter } from "../redux/slices/filterSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { activeFilter, activeSort } = useSelector(
    (state) => state.filterReducer
  );
  const { searchValue } = React.useContext(SearchValueContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

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

  const onChangeCategory = (index) => {
    dispatch(setActiveFilter(index));
  };

  const onChangeCurrentPage = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Filter
          activeFilter={activeFilter}
          onClickCategory={onChangeCategory}
        />
        <Sort />
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
