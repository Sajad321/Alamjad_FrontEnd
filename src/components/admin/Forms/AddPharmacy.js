import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
const apiUrl = process.env.API_URL;

function AddPharmacy({ page, dataToChange }) {
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState({
    zones: [],
  });
  const [dataToSend, setDataToSend] = useState({
    id: "",
    name: "",
    date_of_joining: "",
    phone_number: "",
    zone_id: "",
    address: "",
    support: "",
  });
  const handleNameChange = (e) =>
    setDataToSend({ ...dataToSend, name: e.target.value });
  const handleDateChange = (e) =>
    setDataToSend({ ...dataToSend, date_of_joining: e.target.value });
  const handlePhoneChange = (e) =>
    setDataToSend({ ...dataToSend, phone_number: e.target.value });
  const handleZoneChange = (e) =>
    setDataToSend({ ...dataToSend, zone_id: e.target.value });
  const handleAddressChange = (e) =>
    setDataToSend({ ...dataToSend, address: e.target.value });
  const handleSupportChange = (e) =>
    setDataToSend({ ...dataToSend, support: e.target.value });
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const getStuff = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/pharmacies-form`, {
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
    getStuff();
    if (Object.keys(dataToChange).length != 0) {
      setDataToSend(dataToChange);
    }
  }, []);
  const savePharmacy = async () => {
    try {
      setSaving(true);
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${apiUrl}/pharmacies` +
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

      toast.success("تم حفظ الصيدلية");
      page();
    } catch (error) {
      console.log(error.message);
      setSaving(false);
      toast.error("فشل الحفظ");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    savePharmacy();
  };
  return (
    <section className="main">
      <div className="row">
        <div className="col-xl-10 col-lg-9 col-md-8 mr-auto">
          <div className="row pt-md-3 pr-2 pl-2 mt-md-3 mb-5">
            <div className="col-sm-12 p-2">
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      id="date"
                      type="date"
                      className="form-control text"
                      onChange={handleDateChange}
                      value={dataToSend.date_of_joining}
                      required
                    ></input>
                  </div>
                  <label
                    htmlFor="date"
                    className="col-12 col-md-2 col-form-label text-center order-first order-md-last"
                  >
                    تاريخ الانضمام
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      id="pharmacy"
                      type="text"
                      placeholder="الاسم"
                      className="form-control text"
                      onChange={handleNameChange}
                      value={dataToSend.name}
                      required
                    ></input>
                  </div>
                  <label
                    htmlFor="pharmacy"
                    className="col-12 col-md-2 col-form-label text-center order-first order-md-last"
                  >
                    اسم الصيدلية
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      id="phone"
                      type="text"
                      placeholder="07XX-XXXXXXX"
                      className="form-control text"
                      onChange={handlePhoneChange}
                      value={dataToSend.phone_number}
                    ></input>
                  </div>
                  <label
                    htmlFor="phone"
                    className="col-12 col-md-2 col-form-label text-center order-first order-md-last"
                  >
                    رقم الهاتف
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <select
                      id="zone"
                      onChange={handleZoneChange}
                      value={dataToSend.zone_id}
                      className="form-control"
                      dir="rtl"
                      required
                    >
                      <option selected>اختر</option>
                      {data.zones.map((zone) => (
                        <option key={zone.id} value={zone.id}>
                          {zone.zone}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label
                    htmlFor="zone"
                    className="col-12 col-md-2 col-form-label text-center order-first order-md-last"
                  >
                    المنطقة
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      id="address"
                      type="text"
                      placeholder="العنوان"
                      className="form-control text"
                      onChange={handleAddressChange}
                      value={dataToSend.address}
                      required
                    ></input>
                  </div>
                  <label
                    htmlFor="address"
                    className="col-12 col-md-2 col-form-label text-center order-first order-md-last"
                  >
                    العنوان
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      id="support"
                      type="text"
                      placeholder="الدعم"
                      className="form-control text"
                      onChange={handleSupportChange}
                      value={dataToSend.support}
                      required
                    ></input>
                  </div>
                  <label
                    htmlFor="support"
                    className="col-12 col-md-2 col-form-label text-center order-first order-md-last"
                  >
                    الدعم
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-10 offset-1 col-sm-3 offset-sm-6 mt-3">
                    {!saving ? (
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                        حفظ الصيدلية
                      </button>
                    ) : (
                      <button disabled className="btn btn-success btn-block">
                        يتم الارسال
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddPharmacy;
