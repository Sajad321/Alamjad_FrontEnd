import React from "react";

function AddItem() {
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
                    className="col-12 col-md-2 col-form-label text-center order-first order-md-last"
                  >
                    اسم المادة
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
                      <option value="1">الثقة</option>
                      <option value="2">النجاح</option>
                    </select>
                  </div>
                  <label
                    htmlFor="zone"
                    className="col-12 col-md-2 col-form-label text-center order-first order-md-last"
                  >
                    الشركة
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      type="text"
                      placeholder="$"
                      className="form-control text"
                    ></input>
                  </div>
                  <label
                    htmlFor="doctor"
                    className="col-12 col-md-2 col-form-label text-center order-first order-md-last"
                  >
                    السعر
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-md-4 offset-md-6 order-last order-md-first">
                    <input
                      type="Date"
                      className="form-control text"
                      id="date"
                      name="date"
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
                    <button type="submit" className="btn btn-success btn-block">
                      حفظ المادة
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

export default AddItem;
