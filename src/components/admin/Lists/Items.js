import React, { useState, Fragment } from "react";

function Items() {
  const [items, setItems] = useState([
    {
      name: "Chloramphenicol",
      company: "النجاح",
      price: "20 $",
      expire_date: "2020-09-22",
    },
    {
      name: "Chloramphenicol",
      company: "النجاح",
      price: "20 $",
      expire_date: "2020-09-02",
    },
  ]);
  const [searchType, setSearchType] = useState("0");
  const [search, setSearch] = useState("");
  const [searchedItems, setSearchedItems] = useState([...items]);
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };
  console.log(searchedItems);
  const handleSearchButton = (e) => {
    e.preventDefault();
    if (searchType == "1") {
      setSearchedItems([...items].filter((d) => d.expire_date == search));
    } else if (searchType == "2") {
      setSearchedItems([...items].filter((d) => d.name == search));
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
        <div className="col-7">
          <input
            type="date"
            className="form-control text"
            id="searchDate"
            onChange={handleSearchChange}
          ></input>
        </div>
      );
    } else if (searchType == "2") {
      return (
        <div className="col-7">
          <input
            type="text"
            className="form-control text"
            id="searchDoctor"
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
                          <option value="1">تاريخ</option>
                          <option value="2">الاسم</option>
                        </select>
                      </div>
                      {searchBar()}
                    </div>
                  </form>
                </div>
                <div className="col-12 col-md-4 order-first order-md-last">
                  <h2 className="text">المواد</h2>
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
                      <th>الشركة</th>
                      <th>السعر</th>
                      <th>تاريخ الانتهاء</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchType == "0"
                      ? items.map((item, index) => {
                          return (
                            <tr key={index} className="font-weight-bold">
                              <th>{item.name}</th>
                              <th>{item.company}</th>
                              <th>{item.price}</th>
                              <td>{item.expire_date}</td>
                              <td>
                                <button className="btn btn-secondary text-white">
                                  تعديل
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      : searchedItems.map((item, index) => {
                          return (
                            <tr key={index} className="font-weight-bold">
                              <th>{item.name}</th>
                              <th>{item.company}</th>
                              <th>{item.price}</th>
                              <td>{item.expire_date}</td>
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

export default Items;
