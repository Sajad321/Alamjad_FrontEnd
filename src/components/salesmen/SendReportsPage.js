import React, { useState, Fragment, useEffect } from "react";
import ReportForm from "./ReportForm";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import Loading from "../common/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Header";
const apiUrl = process.env.API_URL;

function SendReportsPage({ history, match }) {
  const [data, setData] = useState({
    zones: [],
    doctors_pharmacies: [],
    pharmacies: [],
    companies: [],
    items: [],
  });
  const { user, getAccessTokenSilently } = useAuth0();
  const [saving, setSaving] = useState(false);
  const [dataToSend, setDataToSend] = useState({
    id: "",
    user_id: user.sub,
    history: "",
  });
  useEffect(() => {
    const getReportsForm = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/reports-form`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        setData(responseData);
        setChoosenDoctors(responseData.doctors_pharmacies);
        setChoosenPharmacies(responseData.pharmacies);
        setChoosenItems(responseData.items);
      } catch (error) {
        console.log(error.message);
      }
    };
    if ((match.params.report != undefined) & (match.params.report != String)) {
      const getReportData = async () => {
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch(
            `${apiUrl}/reports-form/` + match.params.report,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const responseData = await response.json();
          setDataToSend(responseData.report[0]);
        } catch (error) {
          console.log(error.message);
        }
      };
      getReportData();
      getReportsForm();
    } else {
      getReportsForm();
    }
  }, []);
  const [choosenDoctors, setChoosenDoctors] = useState([]);
  const [choosenPharmacies, setChoosenPharmacies] = useState([]);
  const [choosenItems, setChoosenItems] = useState([]);
  const handleHistoryChange = (e) => {
    setDataToSend({ ...dataToSend, history: e.target.value });
  };
  const handleZoneChange = (e) => {
    setChoosenPharmacies(
      [...data.pharmacies].filter((p) => p.zone_id == e.target.value)
    );
    setDataToSend({ ...dataToSend, zone_id: e.target.value });
  };
  const handleCompanyChange = (e) => {
    setChoosenItems(
      [...data.items].filter((i) => i.company_id == e.target.value)
    );
    setDataToSend({ ...dataToSend, company_id: e.target.value });
  };
  const handlePharmacyChange = (e) => {
    setChoosenDoctors(
      [...data.doctors_pharmacies].filter(
        (d) => d.pharmacy_id == e.target.value
      )
    );
    setDataToSend({ ...dataToSend, pharmacy_id: e.target.value });
  };
  const handleDoctorChange = (e) => {
    setDataToSend({ ...dataToSend, doctor_id: e.target.value });
  };
  const handleItemChange = (e) => {
    setDataToSend({ ...dataToSend, item_id: e.target.value });
  };
  const handleAcceptanceChange = (e) => {
    setDataToSend({ ...dataToSend, acceptance: e.target.value });
  };
  const handleAcceptanceCommentChange = (e) => {
    setDataToSend({ ...dataToSend, acceptance_comment: e.target.value });
  };
  const handleAvailabilityChange = (e) => {
    setDataToSend({ ...dataToSend, available: e.target.value });
  };
  const sendReport = async () => {
    try {
      setSaving(true);
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${apiUrl}/reports` +
          `${dataToSend.id != "" ? "/" + dataToSend.id : ""}`,
        {
          method: dataToSend.id != "" ? "PATCH" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const responseData = await response.json();

      toast.success("تم ارسال التقرير");
      history.push("/");
    } catch (error) {
      console.log(error.message);
      setSaving(false);
      toast.error("فشل الارسال");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      dataToSend.history == "" ||
      dataToSend.zone_id == undefined ||
      dataToSend.company_id == undefined ||
      dataToSend.pharmacy_id == undefined ||
      dataToSend.doctor_id == undefined ||
      dataToSend.item_id == undefined ||
      dataToSend.acceptance == undefined ||
      dataToSend.acceptance_comment == undefined ||
      dataToSend.available == undefined
    ) {
      toast.error("املئ البيانات كاملةً");
    } else {
      sendReport();
    }
  };
  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 col-sm-3 page-header head text-justify text-center">
            التقرير
          </div>
          <button
            className="btn btn-danger icon"
            onClick={() => history.push("/")}
          >
            <FontAwesomeIcon icon="arrow-right" />
          </button>
        </div>
        <div className="row">
          <div className="col-12 col-md-9 offset-md-3">
            <ReportForm
              zones={data.zones}
              companies={data.companies}
              onSave={handleSubmit}
              handleHistoryChange={handleHistoryChange}
              handleCompanyChange={handleCompanyChange}
              handleZoneChange={handleZoneChange}
              handlePharmacyChange={handlePharmacyChange}
              handleDoctorChange={handleDoctorChange}
              handleItemChange={handleItemChange}
              handleAcceptanceChange={handleAcceptanceChange}
              handleAcceptanceCommentChange={handleAcceptanceCommentChange}
              handleAvailabilityChange={handleAvailabilityChange}
              doctors={choosenDoctors}
              pharmacies={choosenPharmacies}
              items={choosenItems}
              dataToSend={dataToSend}
              saving={saving}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto mt-5 mb-3">
          Copyright &copy; 2020 by SH inc.
        </div>
      </div>
    </Fragment>
  );
}
export default withAuthenticationRequired(SendReportsPage, {
  onRedirecting: () => <Loading />,
});
