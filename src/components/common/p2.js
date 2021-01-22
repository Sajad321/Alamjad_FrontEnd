const createPagination = () => {
  let pageNumbers = [];
  if (state.searchType == "0") {
    for (let i = 1; i <= state.totalPages; i++) {
      let number =
        i == state.currentPage ? (
          <li key={i} className="page-item active">
            <a className="page-link" href="#">
              {i}
            </a>
          </li>
        ) : (
          <li
            key={i}
            className={"page-item"}
            onClick={() => {
              updatePage(i);
            }}
          >
            <a className="page-link" href="#">
              {i}
            </a>
          </li>
        );
      pageNumbers.unshift(number);
    }
  } else {
    for (let i = 1; i <= state.totalSearchPages; i++) {
      let number =
        i == state.currentPage ? (
          <li key={i} className="page-item active">
            <a className="page-link" href="#">
              {i}
            </a>
          </li>
        ) : (
          <li
            key={i}
            className={"page-item"}
            onClick={() => {
              updatePage(i);
            }}
          >
            <a className="page-link" href="#">
              {i}
            </a>
          </li>
        );
      pageNumbers.unshift(number);
    }
  }
  return pageNumbers;
};
<nav aria-label="Page navigation">
  <ul className="pagination justify-content-center">
    {state.currentPage == state.totalPages ? (
      <li className="page-item disabled">
        <a className="page-link" aria-label="Next">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    ) : (
      <li
        className="page-item"
        onClick={() => updatePage(state.currentPage + 1)}
      >
        <a className="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    )}
    {createPagination()}
    {state.currentPage == 1 ? (
      <li className="page-item disabled">
        <a className="page-link" aria-label="Previous">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    ) : (
      <li
        className="page-item"
        onClick={() => updatePage(state.currentPage - 1)}
      >
        <a className="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    )}
  </ul>
</nav>;
