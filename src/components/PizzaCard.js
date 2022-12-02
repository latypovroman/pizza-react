import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCartItemById } from "../redux/slices/cartSlice";
import { openPopup, setPopupData } from "../redux/slices/popupSlice";
import { useNavigate } from "react-router-dom";

const PizzaCard = ({ id, title, price, imageUrl, sizes, types }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addedItem = useSelector(selectCartItemById(id));
  const [activeSize, setActiveSize] = React.useState(0);
  const [doughType, setDoughType] = React.useState(0);
  const doughTypes = ["Тонкое", "Традиционное"];
  const item = React.useMemo(() => {
    return {
      id,
      title,
      price,
      imageUrl,
      size: sizes[activeSize],
      type: doughTypes[doughType],
    };
  }, [id, imageUrl, sizes, types, price, doughType, activeSize, title]);

  const onClickSize = (index) => {
    setActiveSize(index);
  };

  const onClickType = (index) => {
    setDoughType(index);
  };

  const onClickImage = () => {
    dispatch(setPopupData(item));
    dispatch(openPopup());
    navigate(`/pizzas/${item.id}`);
  };

  const onClickAdd = () => {
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <img
        onClick={onClickImage}
        className="pizza-block__image"
        src={imageUrl}
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => {
            return (
              <li
                key={index}
                className={doughType === index ? "active" : ""}
                onClick={() => onClickType(index)}
              >
                {doughTypes[type]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, index) => {
            return (
              <li
                key={index}
                className={activeSize === index ? "active" : ""}
                onClick={() => onClickSize(index)}
              >
                {size} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          onClick={onClickAdd}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedItem && <i>{addedItem.count}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaCard;
