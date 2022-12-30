import React from "react";
import styles from "./PizzaPopup.module.scss";
import closeIcon from "../../assets/img/close-icon.svg";
import { useSelector } from "react-redux";
import { closePopup, selectPopup } from "../../redux/slices/popupSlice";
import { addItem, selectCartItemById } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { CartItem } from "../../redux/slices/cartSlice";

const PizzaPopup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { item, isOpened } = useSelector(selectPopup);
  const addedItem = useSelector(selectCartItemById(item));
  const rootStyles = [styles.inner];

  if (isOpened) {
    rootStyles.push(styles.active);
  }

  const close = () => {
    dispatch(closePopup());
    navigate(`/`);
  };

  const onClickAdd = () => {
    dispatch(addItem(item));
  };

  return (
    <div className={rootStyles.join(" ")} onClick={close}>
      <div className={styles.popup} onClick={(evt) => evt.stopPropagation()}>
        <button onClick={close} className={styles.buttonClose}>
          <img src={closeIcon} alt="Закрыть окно" />
        </button>
        <img src={item.imageUrl} alt="pizza" />
        <h3 className={styles.title}>{item.title}</h3>
        <span className={styles.price}>{item.price} ₽</span>
        <span>Состав:</span>
        <ul>
          <li>Свинина мокрого посола, канадский бекон, жареный на гриле</li>
          <li>Томатный соус, консервированный</li>
          <li>Соус для барбекю</li>
          <li>Лук репчатый (Припускание)</li>
          <li>Сыр, моцарелла, из цельного молока</li>
          <li>Дрожжевое тесто для пиццы на оливковом масле</li>
        </ul>
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

export default PizzaPopup;
