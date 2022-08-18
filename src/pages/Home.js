import React from "react";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import * as api from "../assets/api";
import PizzaSkeleton from "../assets/PizzaSkeleton";

const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(true);

  React.useEffect(() => {
    api.getPizzas().then((pizzas) => {
      setPizzas(pizzas);
      setIsFetching(false);
    });
  }, []);

  return (
    <>
      <div className="content__top">
        <Filter />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isFetching
          ? [...new Array(9)].map((p, index) => <PizzaSkeleton key={index} />)
          : pizzas.map((pizza) => <PizzaCard key={pizza.id} {...pizza} />)}
      </div>
    </>
  );
};

export default Home;
