import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth0 } from "@auth0/auth0-react";
const apiUrl = process.env.API_URL;

function Companies({ edit }) {
  const { getAccessTokenSilently } = useAuth0();
  const [companies, setCompanies] = useState([]);
  const [searchType, setSearchType] = useState("0");
  const [search, setSearch] = useState("");
  const [searchedCompanies, setSearchedCompanies] = useState([...companies]);
  useEffect(() => {
    const getCompanies = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/companies`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        setCompanies(responseData.companies);
        setSearchedCompanies(responseData.companies);
      } catch (error) {
        console.log(error.message);
      }
    };
    getCompanies();
  }, []);
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
      setSearchedCompanies([...companies].filter((d) => d.name.match(reg)));
    }
  };
  const searchBar = () => {
    if (searchType == "0") {
      return (
        <div className="col-7">
          <p className="form-control text m-0">بحث حسب </p>
        </div>
      );
    } else if (searchType == "1") {
      return (
        <div className="col-7">
          <input
            type="text"
            className="form-control text"
            id="searchCompany"
            onChange={handleSearchChange}
            placeholder="ابحث"
          ></input>
        </div>
      );
    }
  };
  const handleEditButton = (company) => {
    edit(company);
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
                          <option value="1">الاسم</option>
                        </select>
                      </div>
                      {searchBar()}
                    </div>
                  </form>
                </div>
                <div className="col-12 col-md-4 order-first order-md-last">
                  <h2 className="text">الشركات</h2>
                </div>
              </div>
            </div>
            {searchType == "0"
              ? companies.map((company) => {
                  return (
                    <div className="col-sm-3 p-2" key={company.id}>
                      <div className="card card-common card-height">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-10 col-sm-9 text-right text-secondary">
                              <h5>{company.name}</h5>
                            </div>
                            <div className="col-2 col-sm-3 p-0 text-center text-secondary">
                              <FontAwesomeIcon icon="users" size="3x" />
                            </div>
                            <button
                              onClick={() => handleEditButton(company)}
                              className="btn btn-secondary text-white"
                            >
                              تعديل
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : searchedCompanies.map((company) => {
                  return (
                    <div className="col-sm-3 p-2" key={company.id}>
                      <div className="card card-common card-height">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-10 col-sm-9 text-right text-secondary">
                              <h5>{company.name}</h5>
                            </div>
                            <div className="col-2 col-sm-3 p-0 text-center text-secondary">
                              <FontAwesomeIcon icon="users" size="3x" />
                            </div>
                            <button
                              onClick={() => handleEditButton(company)}
                              className="btn btn-secondary text-white"
                            >
                              تعديل
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Companies;
