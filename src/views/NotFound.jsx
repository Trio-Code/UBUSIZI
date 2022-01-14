import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../components/usage/Logo';

const NotFound = () => (
  <div className="wrapper">
    <div className="not-found-div text-center">
      <Logo />
      <h1 className="text-secondary font-weight-bold mt-2">
        404, Page not Found!
      </h1>
      <p
        className="text-secondary mt-2 text-center font-italic"
        style={{ fontSize: 15 }}
      >
        Sorry, the page you are looking for was not found! make sure you type
        the right URL.
      </p>
      <Link
        className="mt-5 text-white btn btn-secondary px-5 font-weight-bold"
        to="/"
        exact
        style={{ borderRadius: 20 }}
      >
        Homepage
        <FontAwesomeIcon icon={['fas', 'home']} className="ml-2" />
      </Link>
    </div>
  </div>
);

export default NotFound;
