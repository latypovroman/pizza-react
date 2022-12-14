import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import qs from "qs";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import PizzaSkeleton from "../assets/PizzaSkeleton";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import {
  selectFilterSlice,
  setActiveFilter,
  setCurrentPage,
  setDeeplinkFilter,
} from "../redux/slices/filterSlice";
import { sortTypes } from "../components/Sort";
import { fetchPizzas, selectPizzasSlice } from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pizzas, status } = useSelector(selectPizzasSlice);
  const { activeFilter, activeSort, currentPage, searchValue } =
    useSelector(selectFilterSlice);
  const hasParams = React.useRef(false);
  const didMounted = React.useRef(false);

  React.useEffect(() => {
    const deeplink = window.location.search;

    if (deeplink) {
      const params = qs.parse(deeplink.slice(1));
      const activeSort = sortTypes.find((type) => {
        return params.activeSort === type.property;
      });

      if (activeSort) {
        dispatch(setDeeplinkFilter({ ...params, activeSort }));
        hasParams.current = true;
      }
    }
  }, []);

  async function getPizzas() {
    try {
      const data = {
        activeFilter,
        activeSort,
        searchValue,
        currentPage,
      };
      dispatch(fetchPizzas(data));
    } catch (err) {
      console.log(err);
      alert("произошла ошибка");
    }
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!hasParams.current) {
      getPizzas();
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

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setActiveFilter(index));
  }, []);

  const onChangeCurrentPage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const pizzasRender = pizzas.map((pizza: any) => {
    const title = pizza.title.toLowerCase();
    const value = searchValue.toLowerCase();
    if (title.includes(value)) {
      return <PizzaCard key={pizza.id} {...pizza} />;
    }
    return null;
  });

  const skeleton = [...new Array(9)].map((p, index) => (
    <PizzaSkeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Filter
          activeFilter={activeFilter}
          onClickCategory={onChangeCategory}
        />
        <Sort activeValue={activeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" && (
        <>
          <h2 style={{ fontSize: 40 }}>Произошла ошибка</h2>
          <p>Сервер, к сожалению, не хочет показывать пиццы :(</p>
        </>
      )}
      <div className="content__items">
        {status === "loading" ? skeleton : pizzasRender}
        {!pizzasRender.length && status === "success" && (
          <h2 style={{ fontSize: 40 }}>Пиццы не найдены</h2>
        )}
      </div>
      {(pizzas.length > 5 || currentPage > 1) && (
        <Pagination onChangeCurrentPage={onChangeCurrentPage} />
      )}
      <Outlet />
    </div>
  );
};

export default Home;
