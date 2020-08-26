import React, { Fragment, useState } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../common/Loading";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminHeader from "./AdminHeader";
import MainAdmin from "./MainAdmin";
import Notifications from "./Notifications";
import Orders from "./Orders";
import Reports from "./Reports";
import Salesmen from "./Lists/Salesmen";
import Doctors from "./Lists/Doctors";
import Pharmacies from "./Lists/Pharmacies";
import Companies from "./Lists/Companies";
import Items from "./Lists/Items";
import AddDoctor from "./Forms/AddDoctor";
import AddPharmacy from "./Forms/AddPharmacy";
import AddCompany from "./Forms/AddCompany";
import AddItem from "./Forms/AddItem";
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

  const AdminHeaderFunction = (Act) => {
    return (
      <AdminHeader
        logoutWithRedirect={props.logoutWithRedirect}
        Active={Act}
        MainButton={handleMainButton}
        NotificationsButton={handleNotificationsButton}
        OrdersButton={handleOrdersButton}
        FinalReportButton={handleFinalReportButton}
        SalesmenButton={handleSalesmenButton}
        DoctorsButton={handleDoctorsButton}
        PharmaciesButton={handlePharmaciesButton}
        CompaniesButton={handleCompaniesButton}
        ItemsButton={handleItemsButton}
        AddDoctorButton={handleAddDoctorButton}
        AddPharmacyButton={handleAddPharmacyButton}
        AddCompanyButton={handleAddCompanyButton}
        AddItemButton={handleAddItemButton}
      />
    );
  };

  const handleNotificationsButton = () => {
    setPage("Notifications");
  };

  const handleOrdersButton = () => {
    setPage("Orders");
  };

  const handleFinalReportButton = () => {
    setPage("Reports");
  };

  const handleSalesmenButton = () => {
    setPage("Salesmen");
  };

  const handleDoctorsButton = () => {
    setPage("Doctors");
  };

  const handlePharmaciesButton = () => {
    setPage("Pharmacies");
  };

  const handleCompaniesButton = () => {
    setPage("Companies");
  };

  const handleItemsButton = () => {
    setPage("Items");
  };
  const handleAddDoctorButton = () => {
    setPage("AddDoctor");
  };

  const handleAddPharmacyButton = () => {
    setPage("AddPharmacy");
  };

  const handleAddCompanyButton = () => {
    setPage("AddCompany");
  };

  const handleAddItemButton = () => {
    setPage("AddItem");
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
        {AdminHeaderFunction({ Main: "active" })}
        {/* End of Navbar */}

        {/* Main */}
        <MainAdmin data={data} />
      </Fragment>
    );
  } else if (page == "Notifications") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Notifications: "active" })}
        {/* End of Navbar */}
        {/* Notifications */}
        <Notifications />
      </Fragment>
    );
  } else if (page == "Orders") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Orders: "active" })}
        {/* End of Navbar */}
        {/* Orders */}
        <Orders
          approval={approval}
          OrdersApprovalButton={handleOrdersApprovalButton}
          OrdersDisapprovalButton={handleOrdersDisapprovalButton}
        />
      </Fragment>
    );
  } else if (page == "Reports") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Reports: "active" })}
        {/* End of Navbar */}
        {/* Reports */}
        <Reports />
      </Fragment>
    );
  } else if (page == "Salesmen") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Salesmen: "active" })}
        {/* End of Navbar */}
        {/* Salesmen */}
        <Salesmen />
      </Fragment>
    );
  } else if (page == "Doctors") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Doctors: "active" })}
        {/* End of Navbar */}
        {/* Doctors */}
        <Doctors />
      </Fragment>
    );
  } else if (page == "Pharmacies") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Pharmacies: "active" })}
        {/* End of Navbar */}
        {/* Pharmacies */}
        <Pharmacies />
      </Fragment>
    );
  } else if (page == "Companies") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Companies: "active" })}
        {/* End of Navbar */}
        {/* Companies */}
        <Companies />
      </Fragment>
    );
  } else if (page == "Items") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Items: "active" })}
        {/* End of Navbar */}
        {/* Items */}
        <Items />
      </Fragment>
    );
  } else if (page == "AddDoctor") {
    return (
      <Fragment>
        {AdminHeaderFunction({ AddDoctor: "active" })}
        {/* End of Navbar */}
        {/* AddDoctor */}
        <AddDoctor />
      </Fragment>
    );
  } else if (page == "AddPharmacy") {
    return (
      <Fragment>
        {AdminHeaderFunction({ AddPharmacy: "active" })}
        {/* End of Navbar */}
        {/* AddPharmacy */}
        <AddPharmacy />
      </Fragment>
    );
  } else if (page == "AddCompany") {
    return (
      <Fragment>
        {AdminHeaderFunction({ AddCompany: "active" })}
        {/* End of Navbar */}
        {/* AddCompany */}
        <AddCompany />
      </Fragment>
    );
  } else if (page == "AddItem") {
    return (
      <Fragment>
        {AdminHeaderFunction({ AddItem: "active" })}
        {/* End of Navbar */}
        {/* AddItem */}
        <AddItem />
      </Fragment>
    );
  }
}

export default withAuthenticationRequired(Admin, {
  onRedirecting: <Loading />,
});
