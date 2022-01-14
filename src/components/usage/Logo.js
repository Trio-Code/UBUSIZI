import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ marginTop }) => (
  <div
    className="logo-content text-center text-dark"
    style={{ marginTop: marginTop || 30, marginBottom: 25 }}
  >
    <h4 className="font-weight-bold">Ubusizi</h4>
  </div>
);

Logo.propTypes = {
  marginTop: PropTypes.number.isRequired,
};

export default Logo;
