import React, { useState, useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/logo.jpg";
import Loading from "../common/Loading";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
const apiUrl = process.env.API_URL;

function Owner(props) {
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState({
    users_count: "",
    doctors_count: "",
    pharmacies_count: "",
    reports_count: "",
    orders_count: "",
    items_count: "",
  });

  useEffect(() => {
    const getMain = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/main-admin`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMain();
  }, []);

  return (
    <Fragment>
      <nav className="navbar navbar-dark navbar-expand-md">
        <div className="fixed sm-navbar row">
          <button
            className="navbar-toggler mb-0 mr-auto toggle-icon col-2 offset-4 order-last"
            type="button"
            data-toggle="collapse"
            data-target="#Navbar"
          >
            <FontAwesomeIcon icon="bars" className="bars" />
          </button>

          <div className="col-6 ml-auto p-0 order-first">
            <NavLink to="/">
              <img src={Logo} className="img" />
            </NavLink>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="Navbar">
          <div className="row">
            <div className="col-xl-2 col-lg-3 col-md-3 sidebar rightfixed p-0">
              <a className="navbar-brand d-block admin-icon" href="#">
                <FontAwesomeIcon icon="user-circle" className="shadow-icon" />
              </a>
              <p className="d-block admin-text">مرحبا</p>
              <ul className="navbar-nav d-block">
                <li className={"nav-item admin-list active"}>
                  <a className="nav-link">احصائيات</a>
                </li>
                <li className="nav-item admin-list">
                  <NavLink className="nav-link" to="/orders/send">
                    ارسال طلبية
                  </NavLink>
                </li>
                <li className="nav-item admin-list">
                  <button
                    id="loginButton"
                    onClick={props.logoutWithRedirect}
                    className="nav-link btn btn-outline mt-5 mr-auto ml-auto"
                  >
                    <FontAwesomeIcon icon="power-off" /> تسجيل الخروج
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-xl-10 col-lg-9 col-md-9 fixed-top mr-auto pt-2 admin-nav-bg top-navbar">
              <div className="row justify-content-center">
                <div className="col-auto">
                  <NavLink to="/">
                    <img src={Logo} className="img align-self-center" />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section className="main">
        <div className="row">
          <div className="col-xl-10 col-lg-9 col-md-9 mr-auto">
            <div className="row pt-md-2 pr-2 pl-2 mt-md-3 mb-5">
              <div className="col-sm-6 p-2">
                <div className="card card-common">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <i className="fas fa-chart-line fa-3x text-danger"></i>
                      <div className="text-right text-secondary">
                        <h5>عدد المندوبين</h5>
                        <h3>{data.users_count}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-secondary">
                    <i className="fas fa-sync mr-3"></i>
                    <span>تم التحديث الان</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 p-2">
                <div className="card card-common">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <i className="fas fa-chart-line fa-3x text-danger"></i>
                      <div className="text-right text-secondary">
                        <h5>عدد الاطباء</h5>
                        <h3>{data.doctors_count}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-secondary">
                    <i className="fas fa-sync mr-3"></i>
                    <span>تم التحديث الان</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 p-2">
                <div className="card card-common">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <i className="fas fa-chart-line fa-3x text-danger"></i>
                      <div className="text-right text-secondary">
                        <h5>عدد الصيدليات</h5>
                        <h3>{data.pharmacies_count}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-secondary">
                    <i className="fas fa-sync mr-3"></i>
                    <span>تم التحديث الان</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 p-2">
                <div className="card card-common">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <i className="fas fa-chart-line fa-3x text-danger"></i>
                      <div className="text-right text-secondary">
                        <h5>عدد الطلبيات</h5>
                        <h3>{data.orders_count}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-secondary">
                    <i className="fas fa-sync mr-3"></i>
                    <span>تم التحديث الان</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 p-2">
                <div className="card card-common">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <i className="fas fa-chart-line fa-3x text-danger"></i>
                      <div className="text-right text-secondary">
                        <h5>عدد التقارير</h5>
                        <h3>{data.reports_count}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-secondary">
                    <i className="fas fa-sync mr-3"></i>
                    <span>تم التحديث الان</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 p-2">
                <div className="card card-common">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <i className="fas fa-chart-line fa-3x text-danger"></i>
                      <div className="text-right text-secondary">
                        <h5>عدد المواد</h5>
                        <h3>{data.items_count}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-secondary">
                    <i className="fas fa-sync mr-3"></i>
                    <span>تم التحديث الان</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="row">
          <div className="col-xl-10 col-lg-9 col-md-9 mr-auto">
            <p className="text-white text-center">
              Copyright &copy; 2020 by SH inc.
            </p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}
export default withAuthenticationRequired(Owner, {
  onRedirecting: () => <Loading />,
});
