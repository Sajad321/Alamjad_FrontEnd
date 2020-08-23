import React, { useState, Fragment } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../common/Loading";
import Header from "./Header";

function ShowPreviousReports() {
  const [reports, setReports] = useState([
    {
      history: "2020-9-1",
      doctor: "د. محمد",
      company: "الصحة",
      pharmacy: "النجاح",
      lastOrder: "2020-8-27",
      item: "paracetamol",
      comment: "المادة جيدة",
    },
  ]);
  const [searchType, setSearchType] = useState("1");
  const [search, setSearch] = useState("");
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  console.log(search);
  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row mt-3">
              <div className="col-12 col-sm-6 order-last order-sm-first">
                <form>
                  <div className="form-group row mt-1">
                    <div className="col-2">
                      <button className="btn btn-secondary btn-sm mt-1">
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
                        <option value="1" defaultValue>
                          التاريخ
                        </option>
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
                  {reports.map((report, index) => {
                    return (
                      <tr key={index}>
                        <th>{report.history}</th>
                        <td>{report.doctor}</td>
                        <td>{report.company}</td>
                        <td>{report.pharmacy}</td>
                        <td>{report.lastOrder}</td>
                        <td>{report.item}</td>
                        <td>{report.comment}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12 col-sm-3"></div>
        </div>
      </div>
    </Fragment>
  );
}

export default withAuthenticationRequired(ShowPreviousReports, {
  onRedirecting: <Loading />,
});
