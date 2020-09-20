import React from "react";

function ReportForm({
  zones,
  companies,
  onSave,
  handleHistoryChange,
  handleCompanyChange,
  handleZoneChange,
  handleDoctorChange,
  handlePharmacyChange,
  handleItemChange,
  handleAcceptanceChange,
  handleAcceptanceCommentChange,
  handleAvailabilityChange,
  saving,
  doctors,
  pharmacies,
  items,
  dataToSend,
}) {
  return (
    <form onSubmit={onSave}>
      <div className="form-group row">
        <div className="col-md-4 offset-md-6 order-last order-md-first">
          <input
            required
            type="Date"
            className="form-control text"
            onChange={handleHistoryChange}
            id="date"
            name="date"
            value={dataToSend.history}
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
            required
            id="zone"
            onChange={handleZoneChange}
            className="form-control"
            dir="rtl"
            value={dataToSend.zone_id}
          >
            <option defaultValue>اختر</option>
            {zones.map((zone) => (
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
            required
            id="pharmacy"
            className="form-control"
            dir="rtl"
            onChange={handlePharmacyChange}
            value={dataToSend.pharmacy_id}
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
            value={dataToSend.doctor_id}
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
          اسم الطبيب
        </label>
      </div>
      <div className="form-group row">
        <div className="col-md-4 order-md-0 order-3">
          <select
            required
            id="item"
            className="form-control"
            dir="rtl"
            onChange={handleItemChange}
            value={dataToSend.item_id}
          >
            <option selected>اختر</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <label
          htmlFor="item"
          className="col-12 col-md-2 col-form-label text order-md-1 order-2"
        >
          اسم المادة
        </label>
        <div className="col-md-4 order-md-2 order-1">
          <select
            required
            id="company"
            onChange={handleCompanyChange}
            className="form-control"
            dir="rtl"
            value={dataToSend.company_id}
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
          className="col-12 col-md-2 col-form-label text order-md-3 order-0"
        >
          الشركة المروج لها
        </label>
      </div>
      <div className="form-group row">
        <div className="col-md-4 order-md-0 order-3">
          <textarea
            required
            className="form-control text"
            dir="rtl"
            rows="4"
            onChange={handleAcceptanceCommentChange}
            value={dataToSend.acceptance_comment}
          ></textarea>
        </div>
        <label
          htmlFor="item"
          className="col-12 col-md-2 col-form-label text order-md-1 order-2"
        >
          التعليق
        </label>
        <div className="col-md-4 order-md-2 order-1">
          <select
            required
            id="Acceptance"
            className="form-control"
            dir="rtl"
            onChange={handleAcceptanceChange}
            value={dataToSend.acceptance}
          >
            <option selected>اختر</option>
            <option value="متابعة">متابعة</option>
            <option value="تجديد المادة">تجديد المادة</option>
            <option value="مادة جديدة">مادة جديدة</option>
          </select>
        </div>
        <label
          htmlFor="Acceptance"
          className="col-12 col-md-2 col-form-label text order-md-3 order-0"
        >
          اقتناع الطبيب بالمادة
        </label>
      </div>
      <div className="form-group row">
        <div className="col-md-4 offset-md-6 order-last order-md-first">
          <select
            id="available"
            required
            className="form-control"
            dir="rtl"
            onChange={handleAvailabilityChange}
            value={dataToSend.available}
          >
            <option selected>اختر</option>
            <option value={true}>نعم</option>
            <option value={false}>لا</option>
          </select>
        </div>
        <label
          htmlFor="available"
          className="col-12 col-md-2 col-form-label text order-first order-md-last"
        >
          توفر المادة بالصيدلية
        </label>
      </div>
      <div className="form-group row">
        <div className="col-10 offset-1 col-sm-5">
          {!saving ? (
            <button type="submit" className="btn btn-success btn-block">
              ارسال التقرير
            </button>
          ) : (
            <button disabled className="btn btn-success btn-block">
              يتم الارسال
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default ReportForm;
