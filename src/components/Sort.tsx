import React from "react";
import { useDispatch } from "react-redux";
import { setActiveSort } from "../redux/slices/filterSlice";
import { SortType } from "../redux/slices/pizzasSlice";

export const sortTypes: SortType[] = [
  { name: "популярности", property: "rating" },
  { name: "цене", property: "price" },
  { name: "алфавиту", property: "title" },
];

type SortProps = {
  activeValue: SortType;
};

const Sort: React.FC<SortProps> = React.memo(({ activeValue }) => {
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);
  const [isPopupOpened, setIsPopupOpened] = React.useState(false);

  React.useEffect(() => {
    const handleOutsideClick = (evt: MouseEvent) => {
      const _evt = evt as MouseEvent & { path: Node[] };
      if (sortRef.current && !_evt.path.includes(sortRef.current)) {
        setIsPopupOpened(false);
      }
    };
    document.body.addEventListener("click", handleOutsideClick);

    return () => document.body.removeEventListener("click", handleOutsideClick);
  }, []);

  const onClickHandle = (type: SortType) => {
    dispatch(setActiveSort(type));
    setIsPopupOpened(false);
  };

  const switchPopup = () => setIsPopupOpened(!isPopupOpened);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={switchPopup}>{activeValue.name}</span>
      </div>
      {isPopupOpened && (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((type, index) => {
              return (
                <li
                  key={type.name}
                  onClick={() => onClickHandle(type)}
                  className={
                    activeValue.property === type.property ? "active" : ""
                  }
                >
                  {type.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
