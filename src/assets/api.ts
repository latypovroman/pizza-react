import axios from "axios";
import { Pizza, SortType } from "../redux/slices/pizzasSlice";

type GetPizzas = {
  activeFilter: number;
  activeSort: SortType;
  searchValue: string;
  currentPage: number;
};

export const getPizzas = ({
  activeFilter,
  activeSort,
  searchValue,
  currentPage,
}: GetPizzas) => {
  return axios.get<Pizza[]>(
    `https://62fd332bb9e38585cd4e884a.mockapi.io/items?page=${currentPage}&limit=6&${
      activeFilter > 0 ? `category=${activeFilter}` : ""
    }&sortBy=${activeSort.property}${
      searchValue ? `&search=${searchValue}` : ""
    }`
  );
};
