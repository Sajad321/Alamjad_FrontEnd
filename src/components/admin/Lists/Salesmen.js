import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth0 } from "@auth0/auth0-react";
const apiUrl = process.env.API_URL;

function Salesmen() {
  const { getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/users-detail`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        setUsers(responseData.users);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsers();
  }, []);

  const render_daily_report = (daily_report) => {
    if (daily_report == true) {
      return (
        <div className="col-2 p-0">
          <span className="circle bg-success d-block ml-4 mt-4"></span>
        </div>
      );
    } else if (daily_report == false) {
      return (
        <div className="col-2 p-0">
          <span className="circle bg-danger d-block ml-4 mt-4"></span>
        </div>
      );
    } else {
      return <div className="col-2 p-0"></div>;
    }
  };

  return (
    <section className="main">
      <div className="row">
        <div className="col-xl-10 col-lg-9 col-md-9 mr-auto">
          <div className="row pt-md-2 pr-2 pl-2 mt-md-3 mb-5">
            {users.map((user) => {
              return (
                <div className="col-sm-6 p-2" key={user.id}>
                  <div className="card card-common card-height">
                    <div className="card-body">
                      <div className="row">
                        {render_daily_report(user.daily_report)}
                        <div className="col-8 col-sm-9 text-right text-secondary">
                          <h5>{user.name}</h5>
                          <h7>{user.zone}</h7>
                          <br />
                          <h7>{user.phone_number}</h7>
                          <br />
                          <h7>{user.email}</h7>
                          <br />
                          <h7 className="ml-3">
                            عدد التقارير: {user.reports_count}
                          </h7>
                          <br />
                          <h7>تاريخ الانضمام: {user.date_of_joining}</h7>
                        </div>
                        <div className="col-2 col-sm-1 p-0 text-center text-secondary">
                          <FontAwesomeIcon icon="user" size="3x" />
                        </div>
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

export default Salesmen;
