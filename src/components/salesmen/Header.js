import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.jpg";

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
