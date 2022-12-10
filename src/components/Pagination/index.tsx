import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = { onChangeCurrentPage: (page: number) => void };
type PageHandle = MouseEvent & { selected: number };

const Pagination: React.FC<PaginationProps> = ({ onChangeCurrentPage }) => {
  const onPageHandle = (evt: PageHandle) =>
    onChangeCurrentPage(evt.selected + 1);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageHandle}
      pageRangeDisplayed={5}
      pageCount={2}
      previousLabel="<"
    />
  );
};

export default Pagination;
