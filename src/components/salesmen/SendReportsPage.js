import React, { useState, Fragment } from "react";
import ReportForm from "./ReportForm";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import Loading from "../common/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Header";

function SendReportsPage() {
  const [data, setData] = useState({
    zones: [],
    doctors: [
      { id: "1", name: "سجاد", zone: "1" },
      { id: "2", name: "sسجاد", zone: "2" },
    ],
    pharmacies: [
      { id: "1", name: "سجاد", zone: "1" },
      { id: "2", name: "sسجاد", zone: "2" },
    ],
    companies: [],
    items: [
      { id: "1", name: "سجاد", company: "1" },
      { id: "2", name: "sسجاد", company: "2" },
    ],
  });
  const [choosenDoctors, setChoosenDoctors] = useState([]);
  const [choosenPharmacies, setChoosenPharmacies] = useState([]);
  const [choosenItems, setChoosenItems] = useState([]);
  const handleZoneChange = (e) => {
    setChoosenDoctors(
      [...data.doctors].filter((d) => d.zone == e.target.value)
    );
    setChoosenPharmacies(
      [...data.pharmacies].filter((p) => p.zone == e.target.value)
    );
  };
  const handleCompanyChange = (e) => {
    setChoosenItems([...data.items].filter((i) => i.company == e.target.value));
  };
  const handleSubmit = (e) => {
    event.preventDefault();
    // if (!formIsValid()) return;
    // setSaving(true);
    // saveCourse(course)
    //   .then(() => {
    console.log(e);
    toast.success("تم ارسال التقرير");
    // history.push("/courses");
    //   })
    //   .catch((error) => {
    //     setSaving(false);
    //     setErrors({ onSave: error.message });
    //   });
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
            onClick={() => history.back()}
          >
            <FontAwesomeIcon icon="arrow-right" />
          </button>
        </div>
        <div className="row">
          <div className="col-12 col-md-9 offset-md-3">
            <ReportForm
              data={data}
              onSave={handleSubmit}
              handleCompanyChange={handleCompanyChange}
              handleZoneChange={handleZoneChange}
              doctors={choosenDoctors}
              pharmacies={choosenPharmacies}
              items={choosenItems}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default withAuthenticationRequired(SendReportsPage, {
  onRedirecting: <Loading />,
});
