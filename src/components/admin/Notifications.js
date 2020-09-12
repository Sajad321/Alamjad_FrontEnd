import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth0 } from "@auth0/auth0-react";
const apiUrl = process.env.API_URL;

function Notifications(props) {
  return (
    <section className="main">
      <div className="row">
        <div className="col-xl-10 col-lg-9 col-md-9 mr-auto">
          <div className="row pt-md-2 pr-2 pl-2 mt-md-3 mb-5">
            {props.data.map((notification) => {
              return (
                <div className="col-sm-12 p-2" key={notification.id}>
                  <div className="card card-common card-height">
                    <div className="card-body">
                      <div className="text-right text-secondary">
                        <h5>تم ارسال تقرير من قبل {notification.report}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Notifications;
