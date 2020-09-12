import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
const apiUrl = process.env.API_URL;

function AddItem({ page, dataToChange }) {
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState({
    companies: [],
  });
  const [dataToSend, setDataToSend] = useState({
    id: "",
    name: "",
    company_id: "",
    price: "",
    expire_date: "",
  });
  const handleNameChange = (e) =>
    setDataToSend({ ...dataToSend, name: e.target.value });
  const handleCompanyChange = (e) =>
    setDataToSend({ ...dataToSend, company_id: e.target.value });
  const handlePriceChange = (e) =>
    setDataToSend({ ...dataToSend, price: e.target.value });
  const handleExpireChange = (e) =>
    setDataToSend({ ...dataToSend, expire_date: e.target.value });
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const getStuff = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/items-form`, {
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
  const saveItem = async () => {
    try {
      setSaving(true);
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${apiUrl}/items` + `${dataToSend.id != "" ? "/" + dataToSend.id : ""}`,
        {
          method: dataToSend.id != "" ? "PATCH" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const responseData = await response.json();

      toast.success("تم حفظ المادة");
      page();
    } catch (error) {
      console.log(error.message);
      setSaving(false);
      toast.error("فشل الحفظ");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    saveItem();
  };
  return (
    <section className="min-height">
      <div className="row main">
        <div className="col-xl-10 col-lg-9 col-md-8 mr-auto">
          <div className="row pt-md-3 pr-2 pl-2 mt-md-3 mb-5">
            <div className="col-sm-12 p-2">
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      type="text"
                      placeholder="الاسم"
                      className="form-control text"
                      onChange={handleNameChange}
                      value={dataToSend.name}
                      required
                    ></input>
                  </div>
                  <label
                    htmlFor="doctor"
                    className="col-12 col-md-2 col-form-label text-center order-first order-md-last"
                  >
                    اسم المادة
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <select
                      id="company"
                      className="form-control"
                      dir="rtl"
                      onChange={handleCompanyChange}
                      value={dataToSend.company_id}
                      required
                    >
                      <option>اختر</option>
                      {data.companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label
                    htmlFor="company"
                    className="col-12 col-md-2 col-form-label text-center order-first order-md-last"
                  >
                    الشركة
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      id="price"
                      type="number"
                      placeholder="$"
                      className="form-control text"
                      onChange={handlePriceChange}
                      value={dataToSend.price}
                      required
                    ></input>
                  </div>
                  <label
                    htmlFor="price"
                    className="col-12 col-md-2 col-form-label text-center order-first order-md-last"
                  >
                    السعر
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      id="date"
                      type="Date"
                      className="form-control text"
                      name="date"
                      onChange={handleExpireChange}
                      value={dataToSend.expire_date}
                      required
                    />
                  </div>
                  <label
                    htmlFor="date"
                    className="col-12 col-md-2 col-form-label text-center order-first order-md-last"
                  >
                    تاريخ الانتهاء
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-10 offset-1 col-sm-3 offset-sm-6 mt-3">
                    {!saving ? (
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                        حفظ المادة
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

export default AddItem;
