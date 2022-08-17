import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import PizzaCard from "./components/PizzaCard";
import * as api from "./assets/api";

function App() {
  const [pizzas, setPizzas] = React.useState([]);

  React.useEffect(() => {
    api.getPizzas().then((pizzas) => setPizzas(pizzas));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Filter />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza) => (
              <PizzaCard key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
