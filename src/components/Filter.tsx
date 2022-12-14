import React from "react";

type CategoriesProps = {
  activeFilter: number;
  onClickCategory: (index: number) => void;
};

const Filter: React.FC<CategoriesProps> = React.memo(
  ({ activeFilter, onClickCategory }) => {
    const categories = [
      "Все",
      "Мясные",
      "Вегетарианские",
      "Гриль",
      "Острые",
      "Закрытые",
    ];

    return (
      <div className="categories">
        <ul>
          {categories.map((category, index) => {
            return (
              <li
                key={index}
                onClick={() => onClickCategory(index)}
                className={activeFilter === index ? "active" : ""}
              >
                {category}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

export default Filter;
