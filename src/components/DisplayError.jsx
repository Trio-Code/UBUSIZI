import React from 'react';
import PropTypes from 'prop-types';

const DisplayError = ({ marginTop, title, desc }) => (
  <div className="col text-center" style={{ marginTop: marginTop || 15 }}>
    <h4
      className="font-weight-bold text-dark mt-3 text-center"
      style={{ fontSize: 23 }}
    >
      {title}
    </h4>
    <p className="text-dark mt-2 text-center" style={{ fontSize: 15 }}>
      {desc}
    </p>
  </div>
);

DisplayError.propTypes = {
  marginTop: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default DisplayError;
