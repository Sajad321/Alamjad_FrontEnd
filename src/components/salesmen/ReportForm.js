import React from "react";

function ReportForm({
  data,
  onSave,
  handleCompanyChange,
  handleZoneChange,
  doctors,
  pharmacies,
  items,
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
          <select id="doctor" className="form-control" dir="rtl">
            <option selected>اختر</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
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
        <div className="col-md-4 offset-md-6 order-last order-md-first">
          <select id="pharmacy" className="form-control" dir="rtl">
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
        <div className="col-md-4 order-md-0 order-3">
          <select id="item" className="form-control" dir="rtl">
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
            id="company"
            onChange={handleCompanyChange}
            className="form-control"
            dir="rtl"
          >
            <option selected>اختر</option>
            <option value="1">Al</option>
            <option value="2">BL</option>
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
          <textarea className="form-control text" dir="rtl" rows="4"></textarea>
        </div>
        <label
          htmlFor="item"
          className="col-12 col-md-2 col-form-label text order-md-1 order-2"
        >
          التعليق
        </label>
        <div className="col-md-4 order-md-2 order-1">
          <select id="Acceptance" className="form-control" dir="rtl">
            <option selected>اختر</option>
            <option value="1">متابعة</option>
            <option value="2">تجديد المادة</option>
            <option value="3">مادة جديدة</option>
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
          <select id="available" className="form-control" dir="rtl">
            <option selected>اختر</option>
            <option value="1">نعم</option>
            <option value="0">لا</option>
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
          <button type="submit" className="btn btn-success btn-block">
            ارسال التقرير
          </button>
        </div>
      </div>
    </form>
  );
}

export default ReportForm;
