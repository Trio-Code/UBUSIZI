import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Card = ({
  count, title
}) => (
  <div className="col-4">
    <div className="card-div px-3 py-2">
      <div className="row">
        <div className="col-9">
          <div className="card-content">
            <span className="d-block card-title ">{title}</span>
            <span className="d-block card-data font-weight-bold ">
              {typeof count === 'undefined' ? '-' : count.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="col-3 text-left">
          <span className="card-icon">
            <FontAwesomeIcon icon={['fas', 'flag']} aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default Card;
