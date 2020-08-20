import React from "react";

function SendReportsPage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-9 offset-md-3">
          <form>
            <div className="form-group row">
              <div className="col-md-5 offset-md-5 order-last order-md-first">
                <input
                  type="Date"
                  className="form-control text"
                  id="date"
                  name="date"
                />
              </div>
              <label
                htmlFor="date"
                className="col-12 col-md-2 col-form-label text order-first order-md-last"
              >
                التاريخ
              </label>
            </div>
            <div className="form-group row">
              <div className="col-md-5 offset-md-5 order-last order-md-first">
                <select id="inputState" className="form-control" dir="rtl">
                  <option selected>اختر</option>
                </select>
              </div>
              <label
                htmlFor="inputState"
                className="col-12 col-md-2 col-form-label text order-first order-md-last"
              >
                المنطقة
              </label>
            </div>
            <div className="form-group row">
              <label
                htmlFor="telnum"
                className="col-12 col-md-2 col-form-label"
              >
                Contact Tel.
              </label>
              <div className="col-5 col-md-3">
                <input
                  type="tel"
                  className="form-control"
                  id="areacode"
                  name="areacode"
                  placeholder="Area code"
                />
              </div>
              <div className="col-7 col-md-7">
                <input
                  type="tel"
                  className="form-control"
                  id="telnum"
                  name="telnum"
                  placeholder="Tel. number"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="emailid" className="col-md-2 col-form-label">
                Email
              </label>
              <div className="col-md-10">
                <input
                  type="email"
                  className="form-control"
                  id="emailid"
                  name="emailid"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-6 offset-md-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="approve"
                    id="approve"
                    value=""
                  />
                  <label htmlFor="approve" className="form-check-label">
                    <strong>May we contact you?</strong>
                  </label>
                </div>
              </div>
              <div className="col-md-3 offset-md-1">
                <select className="form-control">
                  <option>Tel.</option>
                  <option>Email</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="feedback" className="col-md-2 col-form-label">
                Your Feedback
              </label>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  id="feedback"
                  name="feedback"
                  rows="12"
                ></textarea>
              </div>
            </div>
            <div className="form-group row">
              <div className="offset-md-2 col-md-10">
                <button type="submit" className="btn btn-primary">
                  Send Feedback
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SendReportsPage;
