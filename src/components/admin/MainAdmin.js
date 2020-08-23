import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";

function MainAdmin({ data }) {
  return (
    <section className="main">
      <div className="row">
        <div className="col-xl-10 col-lg-9 col-md-9 mr-auto">
          <div className="row pt-md-2 pr-2 pl-2 mt-md-3 mb-5">
            <div className="col-xl-4 col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                    <div className="text-right text-secondary">
                      <h5>عدد المندوبين</h5>
                      <h3>45</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-secondary">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                    <div className="text-right text-secondary">
                      <h5>عدد الاطباء</h5>
                      <h3>120</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-secondary">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                    <div className="text-right text-secondary">
                      <h5>عدد الصيدليات</h5>
                      <h3>200</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-secondary">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                    <div className="text-right text-secondary">
                      <h5>عدد الطلبيات</h5>
                      <h3>1500</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-secondary">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                    <div className="text-right text-secondary">
                      <h5>عدد التقارير</h5>
                      <h3>2000</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-secondary">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <i className="fas fa-chart-line fa-3x text-danger"></i>
                    <div className="text-right text-secondary">
                      <h5>عدد المواد</h5>
                      <h3>3500</h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-secondary">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تم التحديث الان</span>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body">
                  {/* <div className="d-flex justify-content-between">
                    <FontAwesomeIcon
                      icon="shopping-cart"
                      className="text-warning "
                      size="3x"
                    />
                    <div className="text-right text-secondary">
                      <h5>Sales</h5>
                      <h3>$135,000</h3>
                    </div>
                  </div> */}
                  <Line data={data} />
                </div>
                <div className="card-footer text-secondary text-center">
                  <i className="fas fa-sync mr-3"></i>
                  <span>تفاعل المندوبين</span>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-sm-6 p-2">
              <div className="card card-common">
                <div className="card-body">
                  {/* <div className="d-flex justify-content-between">
                    <i className="fas fa-money-bill-alt fa-3x text-success"></i>
                    <div className="text-right text-secondary">
                      <h5>Expenses</h5>
                      <h3>$39,000</h3>
                    </div>
                  </div> */}

                  <Pie data={data} />
                </div>
                <div className="card-footer text-secondary text-center">
                  <i className="fas fa-sync mr-3"></i>
                  <span>التخصصات المتوفرة</span>
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
