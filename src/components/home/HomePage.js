import React, { useState, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { saveUser } from "../../api/courseApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Link } from "react-router-dom";
import Admin from "../admin/Admin";
import SalesmenHome from "../salesmen/SalesmenHome";

const HomePage = (props) => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  if (isAuthenticated) {
    saveUser(user)
      .then(console.log("Done"))
      .catch((e) => {
        console.log(e);
      });
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
    if (props.role === "5") {
      return (
        <SalesmenHome
          logoutWithRedirect={logoutWithRedirect}
          isAuthenticated={isAuthenticated}
        />
      );
    } else if (props.role == "1") {
      return <Admin />;
    } else {
      console.log(props.role);
      return <div>Hello</div>;
    }
  }
};
export default HomePage;
