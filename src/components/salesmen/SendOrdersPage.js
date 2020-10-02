import React, { useState, useEffect, Fragment } from "react";
import OrderForm from "./OrderForm";
import { toast } from "react-toastify";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import Loading from "../common/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Header";
const apiUrl = process.env.API_URL;

function SendOrderPage({ history }) {
  const [data, setData] = useState({
    zones: [],
    doctors_pharmacies: [],
    pharmacies: [],
    companies: [],
    items: [],
  });
  const { user, getAccessTokenSilently } = useAuth0();
  const [saving, setSaving] = useState(false);
  const [choosenPharmacies, setChoosenPharmacies] = useState([]);
  const [choosenDoctors, setChoosenDoctors] = useState([]);
  const [choosenItems, setChoosenItems] = useState([]);
  const [items, setItems] = useState([
    { item_id: "", qty: 1, gift: "", bonus: "", price: "", item_name: "" },
  ]);
  const [allPrice, setAllPrice] = useState(0);
  const [dataToSend, setDataToSend] = useState({
    user_id: user.sub,
    user_name: user.name,
    doctor_id: "",
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
      } catch (error) {
        console.log(error.message);
      }
    };
    getReportsForm();
  }, []);
  const handleDateChange = (e) => {
    setDataToSend({ ...dataToSend, date_of_order: e.target.value });
  };
  const handleZoneChange = (e) => {
    setChoosenPharmacies(
      [...data.pharmacies].filter((p) => p.zone_id == e.target.value)
    );
    setDataToSend({
      ...dataToSend,
      zone_id: e.target.value,
      zone_name: data.zones.filter((zone) => zone.id == e.target.value)[0].zone,
    });
  };
  const handlePharmacyChange = (e) => {
    setChoosenDoctors(
      [...data.doctors_pharmacies].filter(
        (d) => d.pharmacy_id == e.target.value
      )
    );
    setDataToSend({
      ...dataToSend,
      pharmacy_id: e.target.value,
      pharmacy_name: data.pharmacies.filter(
        (pharmacy) => pharmacy.id == e.target.value
      )[0].name,
    });
  };
  const handleDoctorChange = (e) => {
    setDataToSend({
      ...dataToSend,
      doctor_id: e.target.value,
    });
  };
  const handleCompanyChange = (e) => {
    setChoosenItems(
      [...data.items].filter((i) => i.company_id == e.target.value)
    );
    setDataToSend({
      ...dataToSend,
      company_id: e.target.value,
      company_name: data.companies.filter(
        (company) => company.id == e.target.value
      )[0].name,
    });
  };
  // const findItem = (item_id) => items.findIndex((i) => i.id == item_id);
  const handleItemChange = (e, i) => {
    let nee = [...items];
    nee[i] = {
      ...nee[i],
      item_id: e.target.value,
      item_name: choosenItems.filter((item) => item.id == e.target.value)[0]
        .name,
      price: choosenItems.filter((item) => item.id == e.target.value)[0].price,
    };
    setItems(nee);
    setDataToSend({ ...dataToSend, items: nee });
  };
  const handleQtyChange = (e, index) => {
    let nee = [...items];
    nee[index] = { ...nee[index], qty: e.target.value };
    setItems(nee);
    setDataToSend({ ...dataToSend, items: nee });
  };
  const handleItemGiftChange = (e, index) => {
    let nee = [...items];
    nee[index] = { ...nee[index], gift: e.target.value };
    setItems(nee);
    setDataToSend({ ...dataToSend, items: nee });
  };
  const handleItemBonusChange = (e, index) => {
    let nee = [...items];
    nee[index] = { ...nee[index], bonus: e.target.value };
    setItems(nee);
    setDataToSend({ ...dataToSend, items: nee });
  };
  const handleAddItemButton = (e) => {
    setItems([
      ...items,
      { item_id: "", qty: 1, gift: "", bonus: "", item_name: "" },
    ]);
  };
  const handleRemoveItemButton = (e) => {
    const list = [...items];
    if (list.length > 1) {
      list.pop();
      setItems(list);
    }
  };
  // const handleAddQty = (e, i) => {
  //   const list = [...items];
  //   list[i].qty += 1;
  //   setItems(list);
  //   setDataToSend({ ...dataToSend, items: list });
  // };
  // const handleMinusQty = (e, i) => {
  //   const list = [...items];
  //   if (list[i].qty > 1) {
  //     list[i].qty -= 1;
  //     setItems(list);
  //     setDataToSend({ ...dataToSend, items: list });
  //   }
  // };
  const handleCommentChange = (e) =>
    setDataToSend({ ...dataToSend, comment: e.target.value });
  const allPriceButton = () => {
    let prices = 0;
    items.map((item) => (prices = prices + item.price * item.qty));
    setAllPrice(prices);
    setDataToSend({ ...dataToSend, price: prices });
  };
  const sendOrder = async () => {
    try {
      setSaving(true);
      const token = await getAccessTokenSilently();
      const response = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      const responseData = await response.json();

      toast.success("تم ارسال الطلبية");
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
      dataToSend.date_of_order == "" ||
      dataToSend.zone_id == undefined ||
      dataToSend.company_id == undefined ||
      dataToSend.pharmacy_id == undefined ||
      dataToSend.items == undefined ||
      dataToSend.price == undefined ||
      dataToSend.items[0].item_id == "" ||
      dataToSend.items[0].gift == "" ||
      dataToSend.items[0].bonus == ""
    ) {
      toast.error("املئ البيانات كاملةً");
    } else {
      sendOrder();
    }
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
            onClick={() => history.push("/")}
          >
            <FontAwesomeIcon icon="arrow-right" />
          </button>
        </div>
        <div className="row">
          <div className="col-12 col-md-9 offset-md-3">
            <OrderForm
              data={data}
              onSave={handleSubmit}
              handleDateChange={handleDateChange}
              handleZoneChange={handleZoneChange}
              handleCompanyChange={handleCompanyChange}
              handleDoctorChange={handleDoctorChange}
              handlePharmacyChange={handlePharmacyChange}
              handleItemChange={handleItemChange}
              handleQtyChange={handleQtyChange}
              handleItemGiftChange={handleItemGiftChange}
              handleItemBonusChange={handleItemBonusChange}
              handleCommentChange={handleCommentChange}
              handleAddItemButton={handleAddItemButton}
              handleRemoveItemButton={handleRemoveItemButton}
              companies={data.companies}
              doctors={choosenDoctors}
              pharmacies={choosenPharmacies}
              choosenItems={choosenItems}
              items={items}
              allPriceButton={allPriceButton}
              allPrice={allPrice}
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

export default withAuthenticationRequired(SendOrderPage, {
  onRedirecting: () => <Loading />,
});
