import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OrderForm({
  data,
  onSave,
  handleDateChange,
  handleZoneChange,
  handlePharmacyChange,
  handleDoctorChange,
  handleCompanyChange,
  handleItemChange,
  handleItemGiftChange,
  handleItemBonusChange,
  handleCommentChange,
  handleAddItemButton,
  handleRemoveItemButton,
  handleQtyChange,
  doctors,
  companies,
  pharmacies,
  choosenItems,
  items,
  allPrice,
  allPriceButton,
  saving,
}) {
  return (
    <form onSubmit={onSave}>
      <div className="form-group row">
        <div className="col-md-4 offset-md-6 order-last order-md-first">
          <input
            type="Date"
            className="form-control text"
            id="date"
            name="date"
            onChange={handleDateChange}
            required
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
        <div className="col-md-4 offset-md-6 order-last order-md-first">
          <select
            id="zone"
            onChange={handleZoneChange}
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
          className="col-12 col-md-2 col-form-label text order-first order-md-last"
        >
          المنطقة
        </label>
      </div>
      <div className="form-group row">
        <div className="col-md-4 offset-md-6 order-last order-md-first">
          <select
            id="pharmacy"
            onChange={handlePharmacyChange}
            className="form-control"
            dir="rtl"
            required
          >
            <option selected>اختر</option>
            {pharmacies.map((pharmacy) => (
              <option key={pharmacy.id} value={pharmacy.id}>
                {pharmacy.name}
              </option>
            ))}
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
          <select
            required
            id="doctor"
            className="form-control"
            dir="rtl"
            onChange={handleDoctorChange}
          >
            <option selected>اختر</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.doctor_id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        <label
          htmlFor="doctor"
          className="col-12 col-md-2 col-form-label text order-first order-md-last"
        >
          الاطباء قرب الصيدلية
        </label>
      </div>
      <div className="form-group row">
        <div className="col-md-4 offset-md-6 order-last order-md-first">
          <select
            id="company"
            onChange={handleCompanyChange}
            className="form-control"
            dir="rtl"
            required
          >
            <option selected>اختر</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <label
          htmlFor="company"
          className="col-12 col-md-2 col-form-label text order-first order-md-last"
        >
          الشركة
        </label>
      </div>
      {items.map((itemA, index) => {
        return (
          <div key={index}>
            <div className="form-group row">
              <div className="col-5 col-md-2 offset-7 offset-md-3 order-md-0 order-3">
                {/* <div className="row">
                  <div
                    className="col-2 offset-3 btn-group btn-group-sm"
                    role="group"
                  >
                    <button
                      onClick={(e) => handleMinusQty(e, index)}
                      type="button"
                      className="btn btn-secondary minus btn-sm"
                    >
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <button
                      onClick={(e) => handleAddQty(e, index)}
                      type="button"
                      className="btn btn-secondary plus btn-sm"
                    >
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div> */}
                {/* <div className="col-6 offset-1"> */}
                <input
                  type="number"
                  min="1"
                  onChange={(e) => handleQtyChange(e, index)}
                  value={itemA.qty}
                  className="form-control text"
                  required
                ></input>
                {/* </div> */}
                {/* </div> */}
              </div>
              <label
                htmlFor="item"
                className="col-12 col-md-1 col-form-label text order-md-1 order-2"
              >
                الكمية
              </label>
              <div className="col-md-4 order-md-2 order-1">
                <select
                  id="item"
                  onChange={(e) => handleItemChange(e, index)}
                  className="form-control"
                  dir="rtl"
                  required
                >
                  <option selected>اختر</option>
                  {choosenItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <label
                htmlFor="item"
                className="col-12 col-md-2 col-form-label text order-md-3 order-0"
              >
                اسم المادة
              </label>
            </div>
            <div className="form-group row">
              <div className="col-4 offset-8 col-md-2 offset-md-3 order-3 order-md-0">
                <input
                  type="number"
                  placeholder="%"
                  id="bonus"
                  min="0"
                  className="form-control text"
                  onChange={(e) => handleItemBonusChange(e, index)}
                  required
                ></input>
              </div>
              <label
                htmlFor="bonus"
                className="col-12 col-md-1 col-form-label text order-2 order-md-1"
              >
                البونس
              </label>
              <div className="col-4 offset-8 col-md-2 offset-md-2 order-1 order-md-2">
                <select
                  id="gift"
                  onChange={(e) => handleItemGiftChange(e, index)}
                  className="form-control"
                  dir="rtl"
                  required
                >
                  <option selected>اختر</option>
                  <option value="true">نعم</option>
                  <option value="false">لا</option>
                </select>
              </div>
              <label
                htmlFor="gift"
                className="col-12 col-md-2 col-form-label text order-0 order-md-3"
              >
                الهدية
              </label>
            </div>
          </div>
        );
      })}

      <div className="form-group row">
        <div
          className="col-10 offset-2 col-md-4 offset-md-6 btn-group"
          role="group"
        >
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleRemoveItemButton}
          >
            حذف مادة
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddItemButton}
          >
            اضافة مادة
          </button>
        </div>
      </div>
      <div className="form-group row">
        <div className="col-md-5 order-md-0 order-3">
          <textarea
            className="form-control text"
            dir="rtl"
            rows="4"
            onChange={handleCommentChange}
            required
          ></textarea>
        </div>
        <label
          htmlFor="item"
          className="col-12 col-md-1 col-form-label text order-md-1 order-2"
        >
          التعليق
        </label>
        <div className="col-4 offset-7 offset-md-0 order-md-2 order-1">
          <p id="all" className="form-control text">
            {allPrice}
          </p>
        </div>
        <label
          htmlFor="all"
          className="col-12 col-md-2 col-form-label text order-md-3 order-0"
        >
          المبلغ الكلي
        </label>
      </div>
      <div className="form-group row">
        <div className="col-10 offset-1 col-sm-5 order-sm-first order-last">
          {!saving ? (
            <button type="submit" className="btn btn-success btn-block">
              ارسال الطلبية
            </button>
          ) : (
            <button disabled className="btn btn-success btn-block">
              يتم الارسال
            </button>
          )}
        </div>
        <div className="col-6 offset-5 offset-sm-1 col-sm-3 order-sm-last order-first mb-2">
          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={allPriceButton}
          >
            حساب المبلغ الكلي
          </button>
        </div>
      </div>
    </form>
  );
}

export default OrderForm;
