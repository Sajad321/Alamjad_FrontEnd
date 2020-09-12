import React, { Fragment, useState, useEffect } from "react";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import Loading from "../common/Loading";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
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
const apiUrl = process.env.API_URL;

function Admin(props) {
  const [page, setPage] = useState("Main");
  const [dataToChange, setDataToChange] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [oldNotifications, setOldNotifications] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/notifications`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        if (oldNotifications.length == 0) {
          setOldNotifications(responseData.notifications);
        }
        setNotifications(responseData.notifications);
      } catch (error) {
        console.log(error.message);
      }
    };
    getNotifications();
    if (
      notifications.length != oldNotifications.length &&
      notifications.length != 0
    ) {
      toast.info(`${notifications[0].report} تم ارسال تقرير من قبل`);
      setOldNotifications(notifications);
    }
  }, []); // notifications
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

  const handleMainButton = () => {
    setPage("Main");
    setDataToChange({});
  };
  const handleNotificationsButton = () => {
    setPage("Notifications");
    setDataToChange({});
  };

  const handleOrdersButton = () => {
    setPage("Orders");
    setDataToChange({});
  };

  const handleFinalReportButton = () => {
    setPage("Reports");
    setDataToChange({});
  };

  const handleSalesmenButton = () => {
    setPage("Salesmen");
    setDataToChange({});
  };

  const handleDoctorsButton = () => {
    setPage("Doctors");
    setDataToChange({});
  };

  const handlePharmaciesButton = () => {
    setPage("Pharmacies");
    setDataToChange({});
  };

  const handleCompaniesButton = () => {
    setPage("Companies");
    setDataToChange({});
  };

  const handleItemsButton = () => {
    setPage("Items");
    setDataToChange({});
  };
  const handleAddDoctorButton = () => {
    setPage("AddDoctor");
    setDataToChange({});
  };

  const handleAddPharmacyButton = () => {
    setPage("AddPharmacy");
    setDataToChange({});
  };

  const handleAddCompanyButton = () => {
    setPage("AddCompany");
    setDataToChange({});
  };

  const handleAddItemButton = () => {
    setPage("AddItem");
    setDataToChange({});
  };

  const handleEditDoctorButton = (doctor) => {
    setDataToChange(doctor);
    setPage("AddDoctor");
  };
  const handleEditPharmacyButton = (pharmacy) => {
    setDataToChange(pharmacy);
    setPage("AddPharmacy");
  };
  const handleEditCompanyButton = (company) => {
    setDataToChange(company);
    setPage("AddCompany");
  };
  const handleEditItemButton = (item) => {
    setDataToChange(item);
    setPage("AddItem");
  };

  if (page == "Main") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Main: "active" })}
        {/* End of Navbar */}

        {/* Main */}
        <MainAdmin />
        <AdminFooter />
      </Fragment>
    );
  } else if (page == "Notifications") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Notifications: "active" })}
        {/* End of Navbar */}
        {/* Notifications */}
        <Notifications data={notifications} />
        <AdminFooter />
      </Fragment>
    );
  } else if (page == "Orders") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Orders: "active" })}
        {/* End of Navbar */}
        {/* Orders */}
        <Orders />
        <AdminFooter />
      </Fragment>
    );
  } else if (page == "Reports") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Reports: "active" })}
        {/* End of Navbar */}
        {/* Reports */}
        <Reports />
        <AdminFooter />
      </Fragment>
    );
  } else if (page == "Salesmen") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Salesmen: "active" })}
        {/* End of Navbar */}
        {/* Salesmen */}
        <Salesmen />
        <AdminFooter />
      </Fragment>
    );
  } else if (page == "Doctors") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Doctors: "active" })}
        {/* End of Navbar */}
        {/* Doctors */}
        <Doctors edit={handleEditDoctorButton} />
        <AdminFooter />
      </Fragment>
    );
  } else if (page == "Pharmacies") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Pharmacies: "active" })}
        {/* End of Navbar */}
        {/* Pharmacies */}
        <Pharmacies edit={handleEditPharmacyButton} />
        <AdminFooter />
      </Fragment>
    );
  } else if (page == "Companies") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Companies: "active" })}
        {/* End of Navbar */}
        {/* Companies */}
        <Companies edit={handleEditCompanyButton} />
        <AdminFooter />
      </Fragment>
    );
  } else if (page == "Items") {
    return (
      <Fragment>
        {AdminHeaderFunction({ Items: "active" })}
        {/* End of Navbar */}
        {/* Items */}
        <Items edit={handleEditItemButton} />
        <AdminFooter />
      </Fragment>
    );
  } else if (page == "AddDoctor") {
    return (
      <Fragment>
        {AdminHeaderFunction({ AddDoctor: "active" })}
        {/* End of Navbar */}
        {/* AddDoctor */}
        <AddDoctor page={handleMainButton} dataToChange={dataToChange} />
        <AdminFooter />
      </Fragment>
    );
  } else if (page == "AddPharmacy") {
    return (
      <Fragment>
        {AdminHeaderFunction({ AddPharmacy: "active" })}
        {/* End of Navbar */}
        {/* AddPharmacy */}
        <AddPharmacy page={handleMainButton} dataToChange={dataToChange} />
        <AdminFooter />
      </Fragment>
    );
  } else if (page == "AddCompany") {
    return (
      <Fragment>
        {AdminHeaderFunction({ AddCompany: "active" })}
        {/* End of Navbar */}
        {/* AddCompany */}
        <AddCompany page={handleMainButton} dataToChange={dataToChange} />
        <AdminFooter />
      </Fragment>
    );
  } else if (page == "AddItem") {
    return (
      <Fragment>
        {AdminHeaderFunction({ AddItem: "active" })}
        {/* End of Navbar */}
        {/* AddItem */}
        <AddItem page={handleMainButton} dataToChange={dataToChange} />
        <AdminFooter />
      </Fragment>
    );
  }
}

export default withAuthenticationRequired(Admin, {
  onRedirecting: () => <Loading />,
});
