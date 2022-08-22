import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ onChangeCurrentPage }) => {
  const onPageHandle = (evt) => onChangeCurrentPage(evt.selected + 1);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageHandle}
      pageRangeDisplayed={5}
      pageCount={2}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
