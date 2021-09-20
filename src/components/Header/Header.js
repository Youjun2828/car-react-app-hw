import React from 'react';
import {
 NavLink
} from "react-router-dom";
import './Header.css';

function Header(){
  return (
  <header className="page-header">
    <span className="logo">Cars App</span>
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/cars/add">Add Car</NavLink>
      <NavLink to="/drivers/add">Add Driver</NavLink>
      <NavLink to="/spectators">Spectators</NavLink>
      <NavLink to="/spectators/add">Add Spectators</NavLink>
    </nav>
  </header>
  );
}

export default Header;