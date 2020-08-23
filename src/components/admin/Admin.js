import React, { Fragment, useState } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../common/Loading";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminHeader from "./AdminHeader";
import MainAdmin from "./MainAdmin";
import Notifications from "./Notifications";
import Orders from "./Orders";
import Salesmen from "./Salesmen";
import FinalReport from "./FinalReport";
import AddDoctor from "./AddDoctor";
import { toast } from "react-toastify";

const data = {
  labels: [12, 19, 3, 5, 2, 3],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};
function Admin(props) {
  const [page, setPage] = useState("Main");
  const [approval, setApproval] = useState("0");
  const handleMainButton = () => {
    setPage("Main");
  };
  const handleNotificationsButton = () => {
    setPage("Notifications");
  };
  const handleOrdersButton = () => {
    setPage("Orders");
  };
  const handleSalesmenButton = () => {
    setPage("Salesmen");
  };
  const handleFinalReportButton = () => {
    setPage("FinalReport");
  };
  const handleAddDoctorButton = () => {
    setPage("AddDoctor");
  };
  const handleOrdersApprovalButton = () => {
    setApproval("1");
    toast.success("تمت الموافقة على الطلبية");
  };
  const handleOrdersDisapprovalButton = () => {
    setApproval("2");
    toast.error("تم رفض الطلبية");
  };
  if (page == "Main") {
    return (
      <Fragment>
        <AdminHeader
          logoutWithRedirect={props.logoutWithRedirect}
          Main="active"
          MainButton={handleMainButton}
          NotificationsButton={handleNotificationsButton}
          OrdersButton={handleOrdersButton}
          SalesmenButton={handleSalesmenButton}
          FinalReportButton={handleFinalReportButton}
          AddDoctorButton={handleAddDoctorButton}
        />
        {/* End of Navbar */}

        {/* Main */}
        <MainAdmin data={data} />
      </Fragment>
    );
  } else if (page == "Notifications") {
    return (
      <Fragment>
        <AdminHeader
          logoutWithRedirect={props.logoutWithRedirect}
          Notifications="active"
          MainButton={handleMainButton}
          NotificationsButton={handleNotificationsButton}
          OrdersButton={handleOrdersButton}
          SalesmenButton={handleSalesmenButton}
          FinalReportButton={handleFinalReportButton}
          AddDoctorButton={handleAddDoctorButton}
        />
        {/* End of Navbar */}
        {/* Notifications */}
        <Notifications />
      </Fragment>
    );
  } else if (page == "Orders") {
    return (
      <Fragment>
        <AdminHeader
          logoutWithRedirect={props.logoutWithRedirect}
          Orders="active"
          MainButton={handleMainButton}
          NotificationsButton={handleNotificationsButton}
          OrdersButton={handleOrdersButton}
          SalesmenButton={handleSalesmenButton}
          FinalReportButton={handleFinalReportButton}
          AddDoctorButton={handleAddDoctorButton}
        />
        {/* End of Navbar */}
        {/* Orders */}
        <Orders
          approval={approval}
          OrdersApprovalButton={handleOrdersApprovalButton}
          OrdersDisapprovalButton={handleOrdersDisapprovalButton}
        />
      </Fragment>
    );
  } else if (page == "Salesmen") {
    return (
      <Fragment>
        <AdminHeader
          logoutWithRedirect={props.logoutWithRedirect}
          Salesmen="active"
          MainButton={handleMainButton}
          NotificationsButton={handleNotificationsButton}
          OrdersButton={handleOrdersButton}
          SalesmenButton={handleSalesmenButton}
          FinalReportButton={handleFinalReportButton}
          AddDoctorButton={handleAddDoctorButton}
        />
        {/* End of Navbar */}
        {/* Salesmen */}
        <Salesmen />
      </Fragment>
    );
  } else if (page == "FinalReport") {
    return (
      <Fragment>
        <AdminHeader
          logoutWithRedirect={props.logoutWithRedirect}
          FinalReport="active"
          MainButton={handleMainButton}
          NotificationsButton={handleNotificationsButton}
          OrdersButton={handleOrdersButton}
          SalesmenButton={handleSalesmenButton}
          FinalReportButton={handleFinalReportButton}
          AddDoctorButton={handleAddDoctorButton}
        />
        {/* End of Navbar */}
        {/* FinalReport */}
        <FinalReport />
      </Fragment>
    );
  } else if (page == "AddDoctor") {
    return (
      <Fragment>
        <AdminHeader
          logoutWithRedirect={props.logoutWithRedirect}
          AddDoctor="active"
          MainButton={handleMainButton}
          NotificationsButton={handleNotificationsButton}
          OrdersButton={handleOrdersButton}
          SalesmenButton={handleSalesmenButton}
          FinalReportButton={handleFinalReportButton}
          AddDoctorButton={handleAddDoctorButton}
        />
        {/* End of Navbar */}
        {/* AddDoctor */}
        <AddDoctor />
      </Fragment>
    );
  }
}

export default withAuthenticationRequired(Admin, {
  onRedirecting: <Loading />,
});
