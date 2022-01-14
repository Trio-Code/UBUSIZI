import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <ul className="nav">
            <li className="nav-item">
              <Link
                className="nav-link text-uppercase font-weight-bold"
                to="/about"
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-uppercase font-weight-bold"
                to="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-uppercase font-weight-bold"
                to="/terms"
              >
                Terms
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-4 text-right">
          <p className="text-center text-secondary font-weight-bold pt-2">
            &copy;
            {`${new Date().getFullYear()} UBUSIZI FROM IMPERIUM RW.`}
          </p>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
