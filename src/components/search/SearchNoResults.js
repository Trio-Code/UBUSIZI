import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const SearchNoResults = ({ title }) => (
  <div className="no-results-content">
    <p className="text-center px-2 font-weight-bold">
      <FontAwesomeIcon icon={['fas', 'exclamation-circle']} className="mr-2" />
      {title}
    </p>
  </div>
);

SearchNoResults.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchNoResults;
