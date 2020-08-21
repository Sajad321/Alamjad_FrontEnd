import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../common/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SalesmenHome = (props) => {
  return (
    <Fragment>
      <div className="bg"></div>
      <div className="container-fluid">
        <div className="row content justify-content-center">
          <div className="col-12 col-sm-5">
            <Link
              to="/reports/send"
              className="mt-3 btn btn-primary btn-block btn-lg"
            >
              ارسال تقرير
            </Link>
          </div>
          <div className="col-12 col-sm-5">
            <Link
              to="/orders/send"
              className="mt-3 btn btn-primary btn-block btn-lg"
            >
              ارسال طلبية
            </Link>
          </div>
          <div className="col-12 col-sm-5">
            <Link
              to="/reports"
              className="mt-3 btn btn-primary btn-block btn-lg"
            >
              عرض التقارير السابقة
            </Link>
          </div>
          <div className="mt-3 col-12 col-sm-5">
            <button
              onClick={props.logoutWithRedirect}
              className="btn btn-danger btn-block btn-lg"
            >
              <FontAwesomeIcon icon="power-off" /> تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withAuthenticationRequired(SalesmenHome, {
  onRedirecting: <Loading />,
});
