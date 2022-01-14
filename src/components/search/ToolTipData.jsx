/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable operator-linebreak */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import SearchResultCard from '../cards/SearchResultCard';

const ToolTipData = ({
  showToolTip,
  data = [],
  error,
  page,
  loadMore,
  fetchMore,
  allUsersLoaded,
}) => {
  const [collapseDiv, setcollapseDiv] = useState(false);
  const collapseToolTip = () => {
    setcollapseDiv(true);
  };
  if (collapseDiv && !showToolTip) {
    setcollapseDiv(false);
  }
  return (
    <div
      className={`my-tooltip-content ${
        showToolTip
          ? collapseDiv
            ? 'hide-tooltip'
            : 'show-tooltip'
          : 'hide-tooltip'
      }`}
    >
      <span className="my-tool-icon">
        <FontAwesomeIcon icon={['fas', 'caret-up']} />
      </span>
      <div className="my-tooltip-text pt-2">
        <span
          className="text-right text-secondary close-tool-tip-btn mr-2 cursor-pointer"
          onClick={collapseToolTip}
        >
          <FontAwesomeIcon icon={['fas', 'times-circle']} />
        </span>
        {error === 500 && page === 1 ? (
          <p className="text-center text-dark text-font-15 font-weight-bold px-2 mt-5">
            <FontAwesomeIcon icon={['fas', 'info-circle']} className="mr-2" />
            Ooops! Your internet connection is inactive, please try again later.
          </p>
        ) : error === 404 && page === 1 ? (
          <p className="text-center text-dark text-font-15 font-weight-bold px-2 mt-5">
            <FontAwesomeIcon icon={['fas', 'info-circle']} className="mr-2" />
            No Search results found!
          </p>
        ) : (
          data.map((user) => (
            <div className="px-3 tooltip-card-div" key={user._id}>
              <SearchResultCard user={user} id={user._id} />
            </div>
          ))
        )}
        {allUsersLoaded ||
        (error === 400 && page === 1) ||
        (error === 400 && page !== 1) ||
        (data.length < 2 && page === 1) ? null : fetchMore ? (
          <span className="text-center px-2 text-font-15 font-weight-bold">
            <span className="spinner-border spinner-border-sm text-dark mr-2 mt-2" />
            Loading More...
          </span>
        ) : (
          <button
            className="btn btn-warning font-weight-bold mt-2 text-white px-3 py-1 text-font-15"
            type="button"
            onClick={loadMore}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};
ToolTipData.propTypes = {
  showToolTip: PropTypes.bool.isRequired,
  error: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
  fetchMore: PropTypes.bool.isRequired,
  allUsersLoaded: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    )
  ).isRequired,
};

export default ToolTipData;
