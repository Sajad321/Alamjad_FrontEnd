import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth0 } from "@auth0/auth0-react";
const apiUrl = process.env.API_URL;

function Notifications() {
  const [data, setData] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/notifications`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        setData(responseData.notifications);
      } catch (error) {
        console.log(error.message);
      }
    };
    getNotifications();
  }, [data]);
  return (
    <section className="main">
      <div className="row">
        <div className="col-xl-10 col-lg-9 col-md-9 mr-auto">
          <div className="row pt-md-2 pr-2 pl-2 mt-md-3 mb-5">
            {data.map((notification) => {
              return (
                <div className="col-sm-12 p-2" key={notification.id}>
                  <div className="card card-common card-height">
                    <div className="card-body">
                      <div className="text-right text-secondary">
                        <h5>{notification.report} تم ارسال تقرير من قبل</h5>
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
