import React from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import * as api from "../assets/api";
import PizzaSkeleton from "../assets/PizzaSkeleton";
import Pagination from "../components/Pagination";
import { SearchValueContext } from "../context/SearchValueContext";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveFilter,
  setCurrentPage,
  setDeeplinkFilter,
} from "../redux/slices/filterSlice";
import { sortTypes } from "../components/Sort";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeFilter, activeSort, currentPage } = useSelector(
    (state) => state.filterReducer
  );
  const { searchValue } = React.useContext(SearchValueContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(true);
  const hasParams = React.useRef(false);
  const didMounted = React.useRef(false);

  React.useEffect(() => {
    const deeplink = window.location.search;

    if (deeplink) {
      const params = qs.parse(deeplink.slice(1));
      const activeSort = sortTypes.find((type) => {
        return params.activeSort === type.property;
      });

      dispatch(setDeeplinkFilter({ ...params, activeSort }));
      hasParams.current = true;
    }
  }, []);

  function fetchPizzas() {
    setIsFetching(true);
    api
      .getPizzas(activeFilter, activeSort, searchValue, currentPage)
      .then((res) => {
        setPizzas(res.data);
        setIsFetching(false);
      });
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!hasParams.current) {
      fetchPizzas();
    }

    hasParams.current = false;
  }, [activeFilter, activeSort, searchValue, currentPage]);

  React.useEffect(() => {
    if (didMounted.current) {
      const queryString = qs.stringify({
        activeSort: activeSort.property,
        activeFilter,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    didMounted.current = true;
  }, [activeFilter, activeSort, currentPage]);

  const onChangeCategory = (index) => {
    dispatch(setActiveFilter(index));
  };

  const onChangeCurrentPage = (number) => {
    dispatch(setCurrentPage(number));
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
