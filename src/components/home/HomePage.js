import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { saveUser } from "../../api/courseApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomePage = () => {
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();

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
  return (
    <div className="jumbotron">
      <div className="row row-content justify-content-center">
        <div className="col-12 col-sm-4">
          {!isAuthenticated && (<button onClick={loginWithRedirect} className="btn btn-primary btn-block btn-lg">
            <FontAwesomeIcon icon="sign-in-alt" /> Log in</button>)}
          {isAuthenticated && (<button onClick={logoutWithRedirect} className="btn btn-primary btn-block btn-lg">
            <FontAwesomeIcon icon="power-off" /> Log out</button>)}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
