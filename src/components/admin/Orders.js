import React from "react";

function Orders(props) {
  const order = () => {
    if (props.approval == "0") {
      return (
        <div className="col-sm-12 p-2">
          <div className="card card-common">
            <div className="card-body">
              <div className="row">
                <div
                  className="col-2 btn-group btn-group-justified"
                  role="group"
                >
                  <button
                    onClick={props.OrdersDisapprovalButton}
                    className="btn btn-danger btn-sm"
                  >
                    رفض
                  </button>
                  <button
                    onClick={props.OrdersApprovalButton}
                    className="btn btn-success btn-sm "
                  >
                    موافقة
                  </button>
                </div>
                <div className="col-10 text-right text-secondary">
                  <h5>Sales</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (props.approval == "2") {
      return (
        <div className="col-sm-12 p-2">
          <div className="card card-common">
            <div className="card-body">
              <div className="row">
                <p className="col-2 btn btn-danger btn-sm btn-width">
                  غير موافق عليها
                </p>
                <div className="col-10 text-right text-secondary">
                  <h5>Sales</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (props.approval == "1") {
      return;
    }
  };
  return (
    <section className="main">
      <div className="row min-height">
        <div className="col-xl-10 col-lg-9 col-md-9 mr-auto">
          <div className="row pt-md-3 pr-2 pl-2 mt-md-3 mb-5">
            {order()}
            <div className="col-sm-12 p-2">
              <div className="card card-common">
                <div className="card-body">
                  <div className="row">
                    <div className="col-2 btn-group" role="group">
                      <button className="btn btn-danger btn-sm btn-width">
                        رفض
                      </button>
                      <button className="btn btn-success btn-sm btn-width">
                        موافقة
                      </button>
                    </div>
                    <div className="col-10 text-right text-secondary">
                      <h5>Sales</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 p-2">
              <div className="card card-common">
                <div className="card-body">
                  <div className="row">
                    <div className="col-2 btn-group" role="group">
                      <button className="btn btn-danger btn-sm btn-width">
                        رفض
                      </button>
                      <button className="btn btn-success btn-sm btn-width">
                        موافقة
                      </button>
                    </div>
                    <div className="col-10 text-right text-secondary">
                      <h5>Sales</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 p-2">
              <div className="card card-common">
                <div className="card-body">
                  <div className="row">
                    <div className="col-2 btn-group" role="group">
                      <button className="btn btn-danger btn-sm btn-width">
                        رفض
                      </button>
                      <button className="btn btn-success btn-sm btn-width">
                        موافقة
                      </button>
                    </div>
                    <div className="col-10 text-right text-secondary">
                      <h5>Sales</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Orders;
