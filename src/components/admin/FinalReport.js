import React, { useState } from "react";

function FinalReport() {
  const [reports, setReports] = useState([
    {
      history: "2020-09-01",
      user: "علي رياض",
      zone: "بغداد",
      doctor: "محمد",
      company: "الصحة",
      pharmacy: "النجاح",
      item: "paracetamol",
      comment: "المادة جيدة",
    },
    {
      history: "2020-09-02",
      user: "محمد احمد",
      zone: "كربلاء",
      doctor: "علي",
      company: "التفوق",
      pharmacy: "الرياحين",
      item: "paracetamol",
      comment: "المادة جيدة",
    },
  ]);
  const [searchType, setSearchType] = useState("0");
  const [search, setSearch] = useState("");
  const [searchedReports, setSearchedReports] = useState([...reports]);
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };
  console.log(searchedReports);
  const handleSearchButton = (e) => {
    e.preventDefault();
    if (searchType == "1") {
      setSearchedReports([...reports].filter((r) => r.history <= search));
    } else if (searchType == "2") {
      setSearchedReports([...reports].filter((r) => r.doctor == search));
    } else if (searchType == "3") {
      setSearchedReports([...reports].filter((r) => r.zone == search));
    } else if (searchType == "4") {
      setSearchedReports([...reports].filter((r) => r.user == search));
    } else if (searchType == "5") {
      setSearchedReports([...reports].filter((r) => r.company == search));
    }
  };
  const searchBar = () => {
    if (searchType == "0") {
      return (
        <input
          type="text"
          className="form-control text"
          id="All"
          onChange={handleSearchChange}
        ></input>
      );
    } else if (searchType == "1") {
      return (
        <input
          type="date"
          className="form-control text"
          id="searchDate"
          onChange={handleSearchChange}
        ></input>
      );
    } else if (searchType == "2") {
      return (
        <input
          type="text"
          className="form-control text"
          id="searchDoctor"
          onChange={handleSearchChange}
          placeholder="ابحث"
        ></input>
      );
    } else if (searchType == "3") {
      return (
        <input
          type="text"
          className="form-control text"
          id="searchZone"
          onChange={handleSearchChange}
          placeholder="ابحث"
        ></input>
      );
    } else if (searchType == "4") {
      return (
        <input
          type="text"
          className="form-control text"
          id="searchSaleman"
          onChange={handleSearchChange}
          placeholder="ابحث"
        ></input>
      );
    } else if (searchType == "5") {
      return (
        <input
          type="text"
          className="form-control text"
          id="searchCompany"
          onChange={handleSearchChange}
          placeholder="ابحث"
        ></input>
      );
    }
  };
  return (
    <section className="main">
      <div className="row min-height">
        <div className="col-xl-10 col-lg-9 col-md-9 mr-auto">
          <div className="row pt-md-3 pr-2 pl-2 mt-md-3 mb-5">
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
                      <div className="col-7">{searchBar()}</div>
                    </div>
                  </form>
                </div>
                <div className="col-12 col-sm-6 order-first order-sm-last">
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
                              <td>{report.item}</td>
                              <td>{report.comment}</td>
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
                              <td>{report.item}</td>
                              <td>{report.comment}</td>
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

export default FinalReport;
