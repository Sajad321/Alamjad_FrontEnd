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
              <FontAwesomeIcon icon="user-circle" className=" shadow-icon" />
            </a>
            <p className="d-block admin-text">مرحبا</p>
            <ul className="navbar-nav d-block">
              <li className={"nav-item admin-list " + props.Main}>
                <a className="nav-link" onClick={props.MainButton}>
                  <i className="fa fa-home fa-lg"></i> احصائيات
                </a>
              </li>
              <li className={"nav-item admin-list " + props.Notifications}>
                <a className="nav-link" onClick={props.NotificationsButton}>
                  <i className="fa fa-info fa-lg"></i> الاشعارات
                </a>
              </li>
              <li className={"nav-item admin-list " + props.Orders}>
                <a className="nav-link" onClick={props.OrdersButton}>
                  <i className="fa fa-list fa-lg"></i> الطلبيات
                </a>
              </li>
              <li className={"nav-item admin-list " + props.Salesmen}>
                <a className="nav-link" onClick={props.SalesmenButton}>
                  <i className="fa fa-address-card fa-lg"></i> المندوبين
                </a>
              </li>
              <li className={"nav-item admin-list " + props.FinalReport}>
                <a className="nav-link" onClick={props.FinalReportButton}>
                  <i className="fa fa-address-card fa-lg"></i> تقرير ختامي
                </a>
              </li>
              <li className={"nav-item admin-list " + props.AddDoctor}>
                <a className="nav-link" onClick={props.AddDoctorButton}>
                  <i className="fa fa-address-card fa-lg"></i> اضافة طبيب
                </a>
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
