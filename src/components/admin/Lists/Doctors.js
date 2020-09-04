import React, { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const apiUrl = process.env.API_URL;

function Doctors({ edit }) {
  const { getAccessTokenSilently } = useAuth0();
  const [doctors, setDoctors] = useState([]);
  const [searchType, setSearchType] = useState("0");
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [searchedDoctors, setSearchedDoctors] = useState([...doctors]);
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/doctors-detail`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        setDoctors(responseData.doctors);
        setSearchedDoctors(responseData.doctors);
      } catch (error) {
        console.log(error.message);
      }
    };
    getDoctors();
  }, []);
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch2Change = (e) => {
    setSearch2(e.target.value);
  };
  const handleSearchButton = (e) => {
    e.preventDefault();
    const reg = new RegExp(search, "i");
    if (searchType == "1") {
      setSearchedDoctors(
        [...doctors].filter(
          (d) => d.date_of_joining <= search2 && d.date_of_joining >= search
        )
      );
      setSearch("");
      setSearch2("");
    } else if (searchType == "2") {
      setSearchedDoctors([...doctors].filter((d) => d.name.match(reg)));
      setSearch("");
    }
  };

  const handleEditButton = (doctor) => {
    edit(doctor);
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
                          <option value="1">التاريخ</option>
                          <option value="2">الاسم</option>
                        </select>
                      </div>
                      {searchBar()}
                    </div>
                  </form>
                </div>
                <div className="col-12 col-md-4 order-first order-md-last">
                  <h2 className="text">الاطباء</h2>
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
                      <th>الايميل</th>
                      <th>الاختصاص</th>
                      <th>الكلاس</th>
                      <th>المنطقة</th>
                      <th>الصيدلية</th>
                      <th>الدعم</th>
                      <th>تاريخ الانضمام</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchType == "0"
                      ? doctors.map((doctor) => {
                          return (
                            <tr key={doctor.id} className="font-weight-bold">
                              <th>{doctor.name}</th>
                              <th>{doctor.phone}</th>
                              <th>{doctor.email}</th>
                              <td>{doctor.speciality}</td>
                              <td>{doctor.d_class}</td>
                              <td>{doctor.zone}</td>
                              <td>{doctor.pharmacy}</td>
                              <td>{doctor.support}</td>
                              <td>{doctor.date_of_joining}</td>
                              <td>
                                <button
                                  onClick={() => handleEditButton(doctor)}
                                  className="btn btn-secondary text-white"
                                >
                                  تعديل
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      : searchedDoctors.map((doctor, index) => {
                          return (
                            <tr key={index} className="font-weight-bold">
                              <th>{doctor.name}</th>
                              <th>{doctor.phone}</th>
                              <th>{doctor.email}</th>
                              <td>{doctor.speciality}</td>
                              <td>{doctor.class}</td>
                              <td>{doctor.zone}</td>
                              <td>{doctor.pharmacy}</td>
                              <td>{doctor.support}</td>
                              <td>{doctor.date_of_joining}</td>
                              <td>
                                <button
                                  onClick={() => handleEditButton(doctor)}
                                  className="btn btn-secondary text-white"
                                >
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

export default Doctors;
