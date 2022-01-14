/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/void-dom-elements-no-children */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const SearchBox = ({
  handleSubmit,
  clearQuery,
  handleChange,
  disableButton,
  query,
  currentQuery,
  showLoader,
}) => (
  <form className="mt-4 search-page-form">
    <div className="input-group">
      <input
        className="form-control gray-input gray-search-input no-shadow"
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange}
      />
      <div className="input-group-append">
        {showLoader ? (
          <button className="btn btn-success search-nav-btn" type="button">
            <span
              className="spinner-border spinner-border-sm text-secondary mt-0"
              style={{ display: 'inline-block' }}
            />
          </button>
        ) : query && query === currentQuery && disableButton ? (
          <button
            className="btn btn-success search-nav-btn"
            type="button"
            onClick={clearQuery}
          >
            <FontAwesomeIcon icon={['fas', 'times-circle']} />
          </button>
        ) : (
          <button
            className="btn btn-success search-nav-btn"
            type="button"
            onClick={handleSubmit}
            disabled={!!(!query || disableButton)}
          >
            <FontAwesomeIcon icon={['fas', 'search']} />
          </button>
        )}
      </div>
    </div>
  </form>
);

SearchBox.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  clearQuery: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  disableButton: PropTypes.bool.isRequired,
  showLoader: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  currentQuery: PropTypes.string.isRequired,
};

export default SearchBox;
