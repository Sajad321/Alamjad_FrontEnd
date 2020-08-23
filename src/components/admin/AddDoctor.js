import React from "react";

function AddDoctor() {
  return (
    <section className="min-height">
      <div className="row main">
        <div className="col-xl-10 col-lg-9 col-md-8 mr-auto">
          <div className="row pt-md-3 pr-2 pl-2 mt-md-3 mb-5">
            <div className="col-sm-12 p-2">
              <form>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      type="text"
                      placeholder="الاسم"
                      className="form-control text"
                    ></input>
                  </div>
                  <label
                    htmlFor="doctor"
                    className="col-12 col-md-2 col-form-label text order-first order-md-last"
                  >
                    اسم الطبيب
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <select
                      id="zone"
                      // onChange={handleZoneChange}
                      className="form-control"
                      dir="rtl"
                    >
                      <option selected>اختر</option>
                      <option value="1">بغداد</option>
                      <option value="2">كربلاء</option>
                    </select>
                  </div>
                  <label
                    htmlFor="zone"
                    className="col-12 col-md-2 col-form-label text order-first order-md-last"
                  >
                    المنطقة
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      type="text"
                      placeholder="07XX-XXXXXXX"
                      className="form-control text"
                    ></input>
                  </div>
                  <label
                    htmlFor="doctor"
                    className="col-12 col-md-2 col-form-label text order-first order-md-last"
                  >
                    رقم الهاتف
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      type="text"
                      placeholder="التخصص"
                      className="form-control text"
                    ></input>
                  </div>
                  <label
                    htmlFor="doctor"
                    className="col-12 col-md-2 col-form-label text order-first order-md-last"
                  >
                    التخصص
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <select id="pharmacy" className="form-control" dir="rtl">
                      <option selected>اختر</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>
                  <label
                    htmlFor="doctor"
                    className="col-12 col-md-2 col-form-label text order-first order-md-last"
                  >
                    الكلاس
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <select id="pharmacy" className="form-control" dir="rtl">
                      <option selected>اختر</option>
                      {/* {pharmacies.map((pharmacy) => (
              <option key={pharmacy.id} value={pharmacy.id}>
                {pharmacy.name}
              </option>
            ))} */}
                    </select>
                  </div>
                  <label
                    htmlFor="pharmacy"
                    className="col-12 col-md-2 col-form-label text order-first order-md-last"
                  >
                    اسم الصيدلية
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      type="text"
                      placeholder="الانتماء"
                      className="form-control text"
                    ></input>
                  </div>
                  <label
                    htmlFor="doctor"
                    className="col-12 col-md-2 col-form-label text order-first order-md-last"
                  >
                    الانتماء
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      type="text"
                      placeholder="الاسم"
                      className="form-control text"
                    ></input>
                  </div>
                  <label
                    htmlFor="الدعم"
                    className="col-12 col-md-2 col-form-label text order-first order-md-last"
                  >
                    الدعم
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-10 offset-1 col-sm-3 offset-sm-6 mt-3">
                    <button type="submit" className="btn btn-success btn-block">
                      حفظ الطبيب
                    </button>
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

export default AddDoctor;
