import React, { useState, Fragment, useEffect } from "react";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import Loading from "../common/Loading";
import Header from "./Header";
const apiUrl = process.env.API_URL;

function ShowPreviousReports({ history }) {
  const [reports, setReports] = useState([]);
  const [searchedReports, setSearchedReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const getReportsForm = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/reports`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        setReports(responseData.reports);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getReportsForm();
  }, []);
  const [searchType, setSearchType] = useState("0");
  const [search, setSearch] = useState("");
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchButton = (e) => {
    e.preventDefault();
    const reg = new RegExp(search, "i");
    if (searchType == "1") {
      setSearchedReports([...reports].filter((r) => r.history == search));
      setSearch("");
    } else if (searchType == "2") {
      setSearchedReports([...reports].filter((r) => r.doctor.match(reg)));
      setSearch("");
    }
  };
  const handleEditButton = (report) => {
    history.push("/reports/" + report.id);
  };

  return (
    <Fragment>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Loading />
        </div>
      ) : (
        <Fragment>
          <Header />
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="row mt-3">
                  <div className="col-12 col-sm-6 order-last order-sm-first">
                    <form onSubmit={handleSearchButton}>
                      <div className="form-group row mt-1">
                        <div className="col-2">
                          <button
                            type="submit"
                            className="btn btn-secondary btn-sm mt-1"
                          >
                            ابحث
                          </button>
                        </div>
                        <div className="col-3">
                          <select
                            id="searchType"
                            onChange={handleSearchTypeChange}
                            className="form-control"
                            dir="rtl"
                          >
                            <option value="1">التاريخ</option>
                            <option value="2">الدكتور</option>
                          </select>
                        </div>
                        <div className="col-7">
                          {searchType == "1" ? (
                            <input
                              type="date"
                              className="form-control text"
                              id="searchDate"
                              onChange={handleSearchChange}
                            ></input>
                          ) : (
                            <input
                              type="text"
                              className="form-control text"
                              id="searchDoctor"
                              onChange={handleSearchChange}
                              placeholder="ابحث"
                            ></input>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 col-sm-6 order-first order-sm-last">
                    <h2 className="text">التقارير السابقة</h2>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-striped text" dir="rtl">
                    <thead className="thead-dark">
                      <tr>
                        <th>التاريخ</th>
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
                        ? reports.map((report) => {
                            return (
                              <tr key={report.id}>
                                <th>{report.history}</th>
                                <td>{report.doctor}</td>
                                <td>{report.company}</td>
                                <td>{report.pharmacy}</td>
                                <td>{report.last_pharmacy_order_date}</td>
                                <td>{report.item}</td>
                                <td>{report.acceptance_of_item}</td>
                              </tr>
                            );
                          })
                        : searchedReports.map((report) => {
                            return (
                              <tr key={report.id}>
                                <th>{report.history}</th>
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
          <div className="row justify-content-center">
            <div className="col-auto mt-5 mb-3">
              Copyright &copy; 2020 by SH inc.
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default withAuthenticationRequired(ShowPreviousReports, {
  onRedirecting: () => <Loading />,
});
