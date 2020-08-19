import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently,
    loginWithRedirect,
  } = useAuth0();
  const { userMetadata, setUserMetadata } = useState(null);
  return (
    <div className="jumbotron">
      <h1>Courses Administration</h1>
      <p>React, Redux and React Router for ultra-responsive web apps.</p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn more
      </Link>
      {isAuthenticated && (
        <div>
          <h2>{user.name}</h2>
          <h3>User Metadata</h3>
          {userMetadata ? (
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
          ) : (
            "No User metadata defined"
          )}
        </div>
      )}
      <button onClick={loginWithRedirect}>Log</button>
    </div>
  );
};
export default HomePage;
