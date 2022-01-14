/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import NavBarSearch from './search/NavBarSearch';

const NavBar = () => (
  <nav className="navbar navbar-expand-lg bg-white navbar-light">
    <div className="container">
      <Link className="navbar-brand font-weight-bold mt-2" to="/">
        Ubusizi
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <FontAwesomeIcon icon={['fas', 'list']} className="" />
      </button>

      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <NavBarSearch />
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-3">
            <Link
              className="nav-link btn btn-warning px-3 text-white py-1 text-font-15 font-weight-bold mt-2"
              to="/accounts/login"
              exact
            >
              Log In
            </Link>
          </li>
          <li className="nav-item mr-3">
            <Link
              className="nav-link text-primary text-font-15 font-weight-bold mt-1"
              to="/accounts/login"
              exact
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavBar;
