import React, { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const apiUrl = process.env.API_URL;

function Reports() {
  const { getAccessTokenSilently } = useAuth0();
  const [reports, setReports] = useState([]);
  const [searchType, setSearchType] = useState("0");
  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [searchedReports, setSearchedReports] = useState([...reports]);
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
        setReports(responseData.reports);
        setSearchedReports(responseData.reports);
      } catch (error) {
        console.log(error.message);
      }
    };
    getReports();
  }, []);
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch1Change = (e) => {
    setSearch1(e.target.value);
  };
  const handleSearch2Change = (e) => {
    setSearch2(e.target.value);
  };
  const handleSearchButton = (e) => {
    e.preventDefault();
    const reg = new RegExp(search, "i");
    if (searchType == "1") {
      setSearchedReports(
        [...reports].filter((r) => r.history <= search2 && r.history >= search1)
      );
      setSearch1("");
      setSearch2("");
    } else if (searchType == "2") {
      if (search2 != "") {
        setSearchedReports(
          [...reports].filter((r) => {
            return (
              r.doctor.match(reg) &&
              r.history <= search2 &&
              r.history >= search1
            );
          })
        );
      } else {
        setSearchedReports([...reports].filter((r) => r.doctor.match(reg)));
      }
      setSearch1("");
      setSearch2("");
    } else if (searchType == "3") {
      if (search2 != "") {
        setSearchedReports(
          [...reports].filter((r) => {
            return (
              r.zone.match(reg) && r.history <= search2 && r.history >= search1
            );
          })
        );
      } else {
        setSearchedReports([...reports].filter((r) => r.zone.match(reg)));
      }
      setSearch1("");
      setSearch2("");
    } else if (searchType == "4") {
      if (search2 != "") {
        setSearchedReports(
          [...reports].filter((r) => {
            return (
              r.user.match(reg) && r.history <= search2 && r.history >= search1
            );
          })
        );
      } else {
        setSearchedReports([...reports].filter((r) => r.user.match(reg)));
      }
      setSearch1("");
      setSearch2("");
    } else if (searchType == "5") {
      if (search2 != "") {
        setSearchedReports(
          [...reports].filter((r) => {
            return (
              r.company.match(reg) &&
              r.history <= search2 &&
              r.history >= search1
            );
          })
        );
      } else {
        setSearchedReports([...reports].filter((r) => r.company.match(reg)));
      }
      setSearch1("");
      setSearch2("");
    }
  };
  const searchBar = () => {
    if (searchType == "0") {
      return (
        <div className="col-7">
          <p className="form-control text">بحث حسب </p>
        </div>
      );
    } else if (searchType == "1") {
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
    } else if (searchType == "2") {
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
    } else if (searchType == "3") {
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
    } else if (searchType == "4") {
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
    } else if (searchType == "5") {
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
              <div className="table-responsive">
                <table
                  className="table table-striped table-bordered table-hover text"
                  dir="rtl"
                >
                  <thead className="thead-dark">
                    <tr>
                      <th>التاريخ</th>
                      <th>المندوب</th>
                      <th>المنطقة</th>
                      <th>الدكتور</th>
                      <th>الشركة</th>
                      <th>الصيدلية</th>
                      <th>اخر طلبية</th>
                      <th>المادة</th>
                      <th>التعليق</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchType == "0"
                      ? reports.map((report, index) => {
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
                        })
                      : searchedReports.map((report, index) => {
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
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reports;
