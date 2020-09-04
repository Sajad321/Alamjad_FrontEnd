import React, { useState, Fragment, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../common/Loading";
import Admin from "../admin/Admin";
import Owner from "../owner/Owner";
import SalesmenHome from "../salesmen/SalesmenHome";
const apiUrl = process.env.API_URL;

const HomePage = (props) => {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [loading, setLoading] = useState(false);
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  const [role, setRole] = useState("");
  useEffect(() => {
    const callSecureApi = async () => {
      try {
        const [provider, user_id] = user.sub.split("|");
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/users/` + user_id, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();

        setLoading(false);
        setRole(responseData.role);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    if (isAuthenticated) {
      setLoading(true);
      callSecureApi();
    }
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Loading />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div>
        {!isAuthenticated && (
          <div className="jumbotron">
            <div className="row row-content justify-content-center">
              <div className="col-12 col-sm-4">
                <button
                  onClick={loginWithRedirect}
                  className="btn btn-primary btn-block btn-lg"
                >
                  <FontAwesomeIcon icon="sign-in-alt" /> Log in
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    if (role == "3") {
      return (
        <SalesmenHome
          logoutWithRedirect={logoutWithRedirect}
          isAuthenticated={isAuthenticated}
        />
      );
    } else if (role == "2") {
      return <Owner logoutWithRedirect={logoutWithRedirect} />;
    } else if (role == "1") {
      return <Admin logoutWithRedirect={logoutWithRedirect} />;
    } else {
      console.log(role);
      return (
        <div>
          Please Contact Your Owner To Add Your Details And Information So You
          Can Access The page
          <button
            id="logOutButton"
            onClick={logoutWithRedirect}
            className="nav-link btn btn-outline mt-5 mr-auto ml-auto"
          >
            <FontAwesomeIcon icon="power-off" /> تسجيل الخروج
          </button>
        </div>
      );
    }
  }
};
export default HomePage;
