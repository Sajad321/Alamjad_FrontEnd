import React, { useState, Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../../assets/logo.jpg";
const apiUrl = process.env.API_URL;

const Header = () => {
  const salesmenstyle = { color: "white" };

  return (
    <div className="row justify-content-center" style={salesmenstyle}>
      <div className="col-auto">
        <NavLink to="/">
          <img src={Logo} className="navbar-brand img align-self-center" />
        </NavLink>
      </div>
    </div>
  );
};
export default Header;
