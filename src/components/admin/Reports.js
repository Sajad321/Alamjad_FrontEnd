import React, { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../common/Loading";
import Pagination from "../common/Pagination";
const apiUrl = process.env.API_URL;

function Reports() {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({
    reports: [],
    searchType: "0",
    search: "",
    search1: "",
    search2: "",
    searchedReports: [],
    currentPage: 1,
    currentSearchPage: 1,
    totalPages: 1,
    totalSearchPages: 1,
    loading: true,
    sorting: "",
    sortingColumn: "",
  });
  useEffect(() => {
    const getReports = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/reports-detail`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        setState({
          ...state,
          reports: responseData.reports,
          searchedReports: responseData.reports,
          totalPages: responseData.pages,
          totalSearchPages: responseData.pages,
          loading: false,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    getReports();
  }, []);
  const handleSearchTypeChange = (e) => {
    setState({
      ...state,
      searchType: e.target.value,
      search: "",
      search1: "",
      search2: "",
    });
  };
  const handleSearchChange = (e) => {
    setState({ ...state, search: e.target.value });
  };
  const handleSearch1Change = (e) => {
    setState({ ...state, search1: e.target.value });
  };
  const handleSearch2Change = (e) => {
    setState({ ...state, search2: e.target.value });
  };
  const handleSearchButton = (e) => {
    e.preventDefault();
    if (state.searchType != "0") {
      f(
        1,
        "",
        "",
        state.searchType,
        state.search,
        state.search1,
        state.search2
      );
    }
  };
  const createPagination = () => {
    let pageNumbers = [];
    if (state.searchType == "0") {
      for (let i = 1; i <= state.totalPages; i++) {
        let number =
          i == state.currentPage ? (
            <li className="page-item active">
              <a className="page-link" href="#">
                {i}
              </a>
            </li>
          ) : (
            <li
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
            <li className="page-item active">
              <a className="page-link" href="#">
                {i}
              </a>
            </li>
          ) : (
            <li
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
  const f = async (
    page,
    sorting,
    sortingColumn,
    searchType,
    search,
    search1,
    search2
  ) => {
    setState({ ...state, loading: true });
    const url =
      state.searchType == 0
        ? `${apiUrl}/reports-detail?page=${page}&sorting=${sorting}&sortingColumn=${sortingColumn}`
        : `${apiUrl}/reports-detail?page=${page}&sorting=${sorting}&sortingColumn=${sortingColumn}&searchType=${searchType}&search=${search}&search1=${search1}&search2=${search2}`;
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      if (state.searchType == 0) {
        setState({
          ...state,
          reports: responseData.reports,
          currentPage: page,
          totalPages: responseData.pages,
          loading: false,
          sorting: responseData.sorting,
          sortingColumn: responseData.sortingColumn,
        });
      } else {
        setState({
          ...state,
          searchedReports: responseData.reports,
          currentSearchPage: page,
          totalSearchPages: responseData.pages,
          loading: false,
          sorting: responseData.sorting,
          sortingColumn: responseData.sortingColumn,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const updatePage = (p) => {
    f(
      p,
      state.sorting,
      state.sortingColumn,
      state.searchType,
      state.search,
      state.search1,
      state.search2
    );
  };
  const sortData = (sortingColumn) => {
    let direction = "ascending";
    if (state.sortingColumn && state.sorting === "ascending") {
      direction = "descending";
    }
    if (state.searchType == "0") {
      f(
        state.currentPage,
        direction,
        sortingColumn,
        state.searchType,
        state.search,
        state.search1,
        state.search2
      );
    } else {
      f(
        state.currentSearchPage,
        direction,
        sortingColumn,
        state.searchType,
        state.search,
        state.search1,
        state.search2
      );
    }
  };
  const getClassNamesFor = (name) => {
    if (!state.sortingColumn) {
      return;
    }
    return state.sortingColumn === name ? state.sorting : undefined;
  };
  const render_table = () => {
    if (state.searchType == "0") {
      const render_reports = state.reports.map((report, index) => {
        return (
          <tr key={index} className="font-weight-bold">
            <th>{report.history}</th>
            <th>{report.user}</th>
            <th>{report.zone}</th>
            <td>{report.doctor}</td>
            <td>{report.company}</td>
            <td>{report.pharmacy}</td>
            <td>{report.last_pharmacy_order_date}</td>
            <td>{report.item}</td>
            <td>{report.acceptance_of_item}</td>
          </tr>
        );
      });

      return (
        <table
          className="table table-striped table-bordered table-hover text"
          dir="rtl"
        >
          <thead className="thead-dark">
            <tr>
              <th>
                <th
                  onClick={() => sortData("history")}
                  className={getClassNamesFor("history") + " button"}
                >
                  التاريخ{" "}
                </th>
              </th>
              <th>
                <th
                  onClick={() => sortData("user")}
                  className={getClassNamesFor("user") + " button"}
                >
                  المندوب{" "}
                </th>
              </th>
              <th>
                <th
                  onClick={() => sortData("zone")}
                  className={getClassNamesFor("zone") + " button"}
                >
                  المنطقة{" "}
                </th>
              </th>
              <th>
                <th
                  onClick={() => sortData("doctor")}
                  className={getClassNamesFor("doctor") + " button"}
                >
                  الدكتور{" "}
                </th>
              </th>
              <th>الشركة</th>
              <th>
                <th
                  onClick={() => sortData("pharmacy")}
                  className={getClassNamesFor("pharmacy") + " button"}
                >
                  الصيدلية{" "}
                </th>
              </th>
              <th>اخر طلبية</th>
              <th>المادة</th>
              <th>التعليق</th>
            </tr>
          </thead>
          <tbody>{state.loading == true ? <Loading /> : render_reports}</tbody>
        </table>
      );
    } else {
      const render_reports = state.searchedReports.map((report, index) => {
        return (
          <tr key={index} className="font-weight-bold">
            <th>{report.history}</th>
            <th>{report.user}</th>
            <th>{report.zone}</th>
            <td>{report.doctor}</td>
            <td>{report.company}</td>
            <td>{report.pharmacy}</td>
            <td>{report.last_pharmacy_order_date}</td>
            <td>{report.item}</td>
            <td>{report.acceptance_of_item}</td>
          </tr>
        );
      });

      return (
        <table
          className="table table-striped table-bordered table-hover text"
          dir="rtl"
        >
          <thead className="thead-dark">
            <tr>
              <th>
                <th
                  onClick={() => sortData("history")}
                  className={getClassNamesFor("history") + " button"}
                >
                  التاريخ{" "}
                </th>
              </th>
              <th>
                <th
                  onClick={() => sortData("user")}
                  className={getClassNamesFor("user") + " button"}
                >
                  المندوب{" "}
                </th>
              </th>
              <th>
                <th
                  onClick={() => sortData("zone")}
                  className={getClassNamesFor("zone") + " button"}
                >
                  المنطقة{" "}
                </th>
              </th>
              <th>
                <th
                  onClick={() => sortData("doctor")}
                  className={getClassNamesFor("doctor") + " button"}
                >
                  الدكتور{" "}
                </th>
              </th>
              <th>الشركة</th>
              <th>
                <th
                  onClick={() => sortData("pharmacy")}
                  className={getClassNamesFor("pharmacy") + " button"}
                >
                  الصيدلية{" "}
                </th>
              </th>
              <th>اخر طلبية</th>
              <th>المادة</th>
              <th>التعليق</th>
            </tr>
          </thead>
          <tbody>{state.loading == true ? <Loading /> : render_reports}</tbody>
        </table>
      );
    }
  };
  const searchBar = () => {
    if (state.searchType == "0") {
      return (
        <div className="col-7">
          <p className="form-control text">بحث حسب </p>
        </div>
      );
    } else if (state.searchType == "1") {
      return (
        <Fragment>
          <div className="col-5 col-md-3 order-0 order-md-2">
            <input
              type="date"
              className="form-control text"
              id="searchDate"
              onChange={handleSearch1Change}
            ></input>
          </div>
          <p className="col-2 col-md-1 order-1 order-md-3">من</p>
          <div className="col-5 offset-5 offset-sm-4 col-md-3 offset-md-0 order-2 order-md-0">
            <input
              type="date"
              className="form-control text"
              id="searchDate"
              onChange={handleSearch2Change}
            ></input>
          </div>
          <p className="col-2 col-md-1 order-3 order-md-1">الى</p>
        </Fragment>
      );
    } else if (state.searchType == "2") {
      return (
        <Fragment>
          <div className="col-7">
            <input
              type="text"
              className="form-control text"
              id="searchDoctor"
              onChange={handleSearchChange}
              placeholder="ابحث"
            ></input>
          </div>
          <div className="col-5 offset-5 col-md-3 offset-md-0 order-0 order-md-2 mt-1">
            <input
              type="date"
              className="form-control text"
              id="searchDate"
              onChange={handleSearch1Change}
            ></input>
          </div>
          <p className="col-2 col-md-1 order-1 order-md-3 mt-1">من</p>
          <div className="col-5 offset-5 col-md-3 offset-md-4 offset-md-0 order-2 order-md-0 mt-md-1">
            <input
              type="date"
              className="form-control text"
              id="searchDate"
              onChange={handleSearch2Change}
            ></input>
          </div>
          <p className="col-2 col-md-1 order-3 order-md-1 mt-md-1">الى</p>
        </Fragment>
      );
    } else if (state.searchType == "3") {
      return (
        <Fragment>
          <div className="col-7">
            <input
              type="text"
              className="form-control text"
              id="searchZone"
              onChange={handleSearchChange}
              placeholder="ابحث"
            ></input>
          </div>
          <div className="col-5 offset-5 col-md-3 offset-md-0 order-0 order-md-2 mt-1">
            <input
              type="date"
              className="form-control text"
              id="searchDate"
              onChange={handleSearch1Change}
            ></input>
          </div>
          <p className="col-2 col-md-1 order-1 order-md-3 mt-1">من</p>
          <div className="col-5 offset-5 col-md-3 offset-md-4 offset-md-0 order-2 order-md-0 mt-md-1">
            <input
              type="date"
              className="form-control text"
              id="searchDate"
              onChange={handleSearch2Change}
            ></input>
          </div>
          <p className="col-2 col-md-1 order-3 order-md-1 mt-md-1">الى</p>
        </Fragment>
      );
    } else if (state.searchType == "4") {
      return (
        <Fragment>
          <div className="col-7">
            <input
              type="text"
              className="form-control text"
              id="searchSaleman"
              onChange={handleSearchChange}
              placeholder="ابحث"
            ></input>
          </div>
          <div className="col-5 offset-5 col-md-3 offset-md-0 order-0 order-md-2 mt-1">
            <input
              type="date"
              className="form-control text"
              id="searchDate"
              onChange={handleSearch1Change}
            ></input>
          </div>
          <p className="col-2 col-md-1 order-1 order-md-3 mt-1">من</p>
          <div className="col-5 offset-5 col-md-3 offset-md-4 offset-md-0 order-2 order-md-0 mt-md-1">
            <input
              type="date"
              className="form-control text"
              id="searchDate"
              onChange={handleSearch2Change}
            ></input>
          </div>
          <p className="col-2 col-md-1 order-3 order-md-1 mt-md-1">الى</p>
        </Fragment>
      );
    } else if (state.searchType == "5") {
      return (
        <Fragment>
          <div className="col-7">
            <input
              type="text"
              className="form-control text"
              id="searchCompany"
              onChange={handleSearchChange}
              placeholder="ابحث"
            ></input>
          </div>
          <div className="col-5 offset-5 col-md-3 offset-md-0 order-0 order-md-2 mt-1">
            <input
              type="date"
              className="form-control text"
              id="searchDate"
              onChange={handleSearch1Change}
            ></input>
          </div>
          <p className="col-2 col-md-1 order-1 order-md-3 mt-1">من</p>
          <div className="col-5 offset-5 col-md-3 offset-md-4 offset-md-0 order-2 order-md-0 mt-md-1">
            <input
              type="date"
              className="form-control text"
              id="searchDate"
              onChange={handleSearch2Change}
            ></input>
          </div>
          <p className="col-2 col-md-1 order-3 order-md-1 mt-md-1">الى</p>
        </Fragment>
      );
    } else if (state.searchType == "6") {
      return (
        <div className="col-7">
          <input
            type="text"
            className="form-control text"
            id="searchItem"
            onChange={handleSearchChange}
            placeholder="ابحث"
          ></input>
        </div>
      );
    }
  };
  return (
    <section className="main">
      <div className="row">
        <div className="col-xl-10 col-lg-9 col-md-9 mr-auto">
          <div className="row pt-md-3 pr-2 pl-2 mt-md-3 mb-5">
            <div className="col-12">
              <div className="row mt-3">
                <div className="col-12 col-md-8 order-last order-md-first">
                  <form onSubmit={handleSearchButton}>
                    <div className="form-group row mt-1">
                      <div className="col-2 text">
                        <button
                          type="submit"
                          className="btn btn-secondary btn-sm mt-1"
                        >
                          ابحث
                        </button>
                      </div>
                      <div className="col-3 col-md-2">
                        <select
                          id="searchType"
                          onChange={handleSearchTypeChange}
                          className="form-control"
                          dir="rtl"
                        >
                          <option value="0" defaultValue>
                            الكل
                          </option>
                          <option value="1">التاريخ</option>
                          <option value="2">الدكتور</option>
                          <option value="3">المنطقة</option>
                          <option value="4">المندوب</option>
                          <option value="5">الشركة</option>
                          <option value="6">المادة</option>
                        </select>
                      </div>
                      {searchBar()}
                    </div>
                  </form>
                </div>
                <div className="col-12 col-md-4 order-first order-md-last">
                  <h2 className="text">التقارير</h2>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="table-responsive">{render_table()}</div>
            </div>
          </div>
          <div className="col-12">
            {state.searchType == "0" ? (
              <Pagination
                totalPages={state.totalPages}
                currentPage={state.currentPage}
                pageNeighbours={1}
                pageChange={updatePage}
              />
            ) : (
              <Pagination
                totalPages={state.totalSearchPages}
                currentPage={state.currentSearchPage}
                pageNeighbours={1}
                pageChange={updatePage}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reports;
