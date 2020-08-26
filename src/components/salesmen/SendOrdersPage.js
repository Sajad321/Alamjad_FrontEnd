import React, { useState, Fragment } from "react";
import OrderForm from "./OrderForm";
import { toast } from "react-toastify";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../common/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Header";

function SendOrderPage() {
  const [data, setData] = useState({
    zones: [],
    doctors: [
      { id: "1", name: "سجاد", pharmacy: "1" },
      { id: "2", name: "sسجاد", pharmacy: "1" },
      { id: "3", name: "sسجاد", pharmacy: "2" },
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
  const [items, setItems] = useState([{ item: "", qty: 0 }]);
  const [allPrice, setAllPrice] = useState(0);
  const handleZoneChange = (e) => {
    setChoosenPharmacies(
      [...data.pharmacies].filter((p) => p.zone == e.target.value)
    );
  };
  const handlePharmacyChange = (e) => {
    setChoosenDoctors(
      [...data.doctors].filter((d) => d.pharmacy == e.target.value)
    );
  };
  const handleCompanyChange = (e) => {
    setChoosenItems([...data.items].filter((i) => i.company == e.target.value));
  };
  const handleAddItemButton = (e) => {
    setItems([...items, { item: "", qty: 0 }]);
  };
  const handleRemoveItemButton = (e) => {
    const list = [...items];
    if (list.length > 1) {
      list.pop();
      setItems(list);
    }
  };
  const handleAddQty = (e, i) => {
    const list = [...items];
    list[i].qty += 1;
    setItems(list);
  };
  const handleMinusQty = (e, i) => {
    const list = [...items];
    if (list[i].qty > 0) {
      list[i].qty -= 1;
      setItems(list);
    }
  };
  const handleSubmit = (e) => {
    event.preventDefault();
    // if (!formIsValid()) return;
    // setSaving(true);
    // saveCourse(course)
    //   .then(() => {
    console.log(e);
    toast.success("تم ارسال الطلبية");
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
            الطلبية
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
            <OrderForm
              data={data}
              onSave={handleSubmit}
              handleZoneChange={handleZoneChange}
              handleCompanyChange={handleCompanyChange}
              handlePharmacyChange={handlePharmacyChange}
              handleAddItemButton={handleAddItemButton}
              handleRemoveItemButton={handleRemoveItemButton}
              handleAddQty={handleAddQty}
              handleMinusQty={handleMinusQty}
              companies={data.companies}
              doctors={choosenDoctors}
              pharmacies={choosenPharmacies}
              choosenItems={choosenItems}
              items={items}
              allPrice={allPrice}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default withAuthenticationRequired(SendOrderPage, {
  onRedirecting: <Loading />,
});
