import React, { useState, Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../../assets/logo.jpg";
const apiUrl = process.env.API_URL;

const Header = (props) => {
  const adminstyle = { color: "#6B66E2" };
  const salesmenstyle = { color: "white" };

  if (props.role == "5") {
    return (
      <div className="row justify-content-center" style={salesmenstyle}>
        <div className="col-auto">
          <NavLink Link="/">
            <img src={Logo} className="navbar-brand img align-self-center" />
          </NavLink>
        </div>
      </div>
    );
  }
};

export default Header;
