import React from "react";

function AddCompany() {
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
                    اسم الشركة
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-10 offset-1 col-sm-3 offset-sm-6 mt-3">
                    <button type="submit" className="btn btn-success btn-block">
                      حفظ الشركة
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

export default AddCompany;
