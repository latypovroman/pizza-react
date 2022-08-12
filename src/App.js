import "./scss/app.scss";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import PizzaCard from "./components/PizzaCard";

function App() {
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
            <PizzaCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
