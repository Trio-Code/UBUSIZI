import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Error = ({
  title, description, icon, marginTop
}) => (
  <>
    <div
      className="success-error-page text-center"
      style={{ marginTop: marginTop || 30 }}
    >
      <span className="mt-5 " style={{ fontSize: 50 }}>
        <FontAwesomeIcon icon={['fas', icon]} className="text-success" />
      </span>
      <h3 className="mt-2 text-dark font-weight-bold">{title}</h3>

      <p
        className="text-dark font-smooth text-center px-2"
        style={{ fontSize: 15.5 }}
      >
        {description}
      </p>
    </div>
  </>
);

Error.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  marginTop: PropTypes.string.isRequired,
};

export default Error;
