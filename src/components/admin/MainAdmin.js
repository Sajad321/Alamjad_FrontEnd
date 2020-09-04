import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const apiUrl = process.env.API_URL;

function MainAdmin() {
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState({
    users_count: "",
    doctors_count: "",
    pharmacies_count: "",
    reports_count: "",
    orders_count: "",
    items_count: "",
  });
  useEffect(() => {
    const getMain = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/main-admin`, {
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
    getMain();
  }, []);
  return (
    <section className="main">
      <div className="row">
        <div className="col-xl-10 col-lg-9 col-md-9 mr-auto">
          <div className="row pt-md-2 pr-2 pl-2 mt-md-3 mb-5">
            <div className="col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                    <div className="text-right text-secondary">
                      <h5>عدد المندوبين</h5>
                      <h3>{data.users_count}</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-secondary">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                    <div className="text-right text-secondary">
                      <h5>عدد الاطباء</h5>
                      <h3>{data.doctors_count}</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-secondary">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                    <div className="text-right text-secondary">
                      <h5>عدد الصيدليات</h5>
                      <h3>{data.pharmacies_count}</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-secondary">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                    <div className="text-right text-secondary">
                      <h5>عدد الطلبيات</h5>
                      <h3>{data.orders_count}</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-secondary">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                    <div className="text-right text-secondary">
                      <h5>عدد التقارير</h5>
                      <h3>{data.reports_count}</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-secondary">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                    <div className="text-right text-secondary">
                      <h5>عدد المواد</h5>
                      <h3>{data.items_count}</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-secondary">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainAdmin;
