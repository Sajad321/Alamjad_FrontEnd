import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/logo.jpg";
function AdminHeader(props) {
  return (
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
              <li className={"nav-item admin-list " + props.Active.Main}>
                <a className="nav-link" onClick={props.MainButton}>
                  احصائيات
                </a>
              </li>
              <li
                className={"nav-item admin-list " + props.Active.Notifications}
              >
                <a className="nav-link" onClick={props.NotificationsButton}>
                  الاشعارات
                </a>
              </li>
              <li className={"nav-item admin-list " + props.Active.Orders}>
                <a className="nav-link" onClick={props.OrdersButton}>
                  الطلبيات
                </a>
              </li>
              <li className={"nav-item admin-list " + props.Active.FinalReport}>
                <a className="nav-link" onClick={props.FinalReportButton}>
                  التقارير
                </a>
              </li>
              <li className="nav-item dropdown admin-list top-dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarShow"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  بيانات
                </a>
                <div
                  className="dropdown-menu admin-dropdown-list"
                  aria-labelledby="navbarShow"
                >
                  <a
                    className={
                      "dropdown-item admin-dropdown-item " +
                      props.Active.Salesmen
                    }
                    onClick={props.SalesmenButton}
                    href="#"
                  >
                    المندوبين
                  </a>
                  <a
                    className={
                      "dropdown-item admin-dropdown-item " +
                      props.Active.Doctors
                    }
                    onClick={props.DoctorsButton}
                    href="#"
                  >
                    الاطباء
                  </a>
                  <a
                    className={
                      "dropdown-item admin-dropdown-item " +
                      props.Active.Pharmacies
                    }
                    onClick={props.PharmaciesButton}
                    href="#"
                  >
                    الصيدليات
                  </a>
                  <a
                    className={
                      "dropdown-item admin-dropdown-item " +
                      props.Active.Companies
                    }
                    onClick={props.CompaniesButton}
                    href="#"
                  >
                    الشركات
                  </a>
                  <a
                    className={
                      "dropdown-item admin-dropdown-item " + props.Active.Items
                    }
                    onClick={props.ItemsButton}
                    href="#"
                  >
                    المواد
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown admin-list below-dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarAdd"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  اضافة
                </a>
                <div
                  className="dropdown-menu admin-dropdown-list"
                  aria-labelledby="navbarAdd"
                >
                  <a
                    className={
                      "dropdown-item admin-dropdown-item " +
                      props.Active.AddDoctor
                    }
                    onClick={props.AddDoctorButton}
                    href="#"
                  >
                    طبيب
                  </a>
                  <a
                    className={
                      "dropdown-item admin-dropdown-item " +
                      props.Active.AddPharmacy
                    }
                    onClick={props.AddPharmacyButton}
                    href="#"
                  >
                    صيدلية
                  </a>
                  <a
                    className={
                      "dropdown-item admin-dropdown-item " +
                      props.Active.AddCompany
                    }
                    onClick={props.AddCompanyButton}
                    href="#"
                  >
                    شركة
                  </a>
                  <a
                    className={
                      "dropdown-item admin-dropdown-item " +
                      props.Active.AddItem
                    }
                    onClick={props.AddItemButton}
                    href="#"
                  >
                    مادة
                  </a>
                </div>
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
  );
}

export default AdminHeader;
