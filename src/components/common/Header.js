import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const apiUrl = process.env.API_URL;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, getAccessTokenSilently, isAuthenticated, logout } = useAuth0();
  const { role, setRole } = useState("");
  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiUrl}/users/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setRole(responseData.user.role);
    } catch (error) {
      setRole(error.message);
    }
  };
  const activeStyle = { color: "#F15B2A", cursor: "default" };
  return (
    <Fragment>
      {isAuthenticated && (
        <nav>
          <NavLink to="/" activeStyle={activeStyle} exact>
            Home
          </NavLink>
          {" | "}
          <NavLink to="/courses" activeStyle={activeStyle}>
            Courses
          </NavLink>
          {" | "}
          <NavLink to="/about" activeStyle={activeStyle}>
            About
          </NavLink>
        </nav>
      )}
    </Fragment>
  );
};

export default Header;
