import React, { useState, Fragment } from "react";

function Pharmacies() {
  const [pharmacies, setpharmacies] = useState([
    {
      name: "الثقة",
      phone: "077XXXXXX",
      zone: "بغداد",
      address: "قرب",
      support: "",
      date_of_joining: "2020-09-02",
    },
    {
      name: "علمنا",
      phone: "077XXXXXX",
      zone: "كربلاء",
      address: "قرب",
      support: "",
      date_of_joining: "2020-10-02",
    },
  ]);
  const [searchType, setSearchType] = useState("0");
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [searchedPharmacies, setSearchedPharmacies] = useState([...pharmacies]);
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };
  const handleSearch2Change = (e) => {
    console.log(e.target.value);
    setSearch2(e.target.value);
  };
  console.log(searchedPharmacies);
  const handleSearchButton = (e) => {
    e.preventDefault();
    if (searchType == "1") {
      setSearchedPharmacies(
        [...pharmacies].filter(
          (d) => d.date_of_joining <= search2 && d.date_of_joining >= search
        )
      );
    } else if (searchType == "2") {
      setSearchedPharmacies([...pharmacies].filter((d) => d.name == search));
    } else if (searchType == "3") {
      setSearchedPharmacies([...pharmacies].filter((d) => d.zone == search));
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
              onChange={handleSearchChange}
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
        <div className="col-7">
          <input
            type="text"
            className="form-control text"
            id="searchPharmacy"
            onChange={handleSearchChange}
            placeholder="ابحث"
          ></input>
        </div>
      );
    } else if (searchType == "3") {
      return (
        <div className="col-7">
          <input
            type="text"
            className="form-control text"
            id="searchZone"
            onChange={handleSearchChange}
            placeholder="ابحث"
          ></input>
        </div>
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
                      <div className="col-3 col-sm-2">
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
                          <option value="2">الاسم</option>
                          <option value="3">المنطقة</option>
                        </select>
                      </div>
                      {searchBar()}
                    </div>
                  </form>
                </div>
                <div className="col-12 col-md-4 order-first order-md-last">
                  <h2 className="text">الصيدليات</h2>
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
                      <th>الاسم</th>
                      <th>رقم الهاتف</th>
                      <th>المنطقة</th>
                      <th>العنوان</th>
                      <th>الدعم</th>
                      <th>تاريخ الانضمام</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchType == "0"
                      ? pharmacies.map((pharmacy, index) => {
                          return (
                            <tr key={index} className="font-weight-bold">
                              <th>{pharmacy.name}</th>
                              <th>{pharmacy.phone}</th>
                              <td>{pharmacy.zone}</td>
                              <td>{pharmacy.address}</td>
                              <td>{pharmacy.support}</td>
                              <td>{pharmacy.date_of_joining}</td>
                              <td>
                                <button className="btn btn-secondary text-white">
                                  تعديل
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      : searchedPharmacies.map((pharmacy, index) => {
                          return (
                            <tr key={index} className="font-weight-bold">
                              <th>{pharmacy.name}</th>
                              <th>{pharmacy.phone}</th>
                              <td>{pharmacy.zone}</td>
                              <td>{pharmacy.address}</td>
                              <td>{pharmacy.support}</td>
                              <td>{pharmacy.date_of_joining}</td>
                              <td>
                                <button className="btn btn-secondary text-white">
                                  تعديل
                                </button>
                              </td>
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

export default Pharmacies;
