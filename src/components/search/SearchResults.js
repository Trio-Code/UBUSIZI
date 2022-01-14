import React from 'react';
import PropTypes from 'prop-types';
import SearchResultCard from '../cards/SearchResultCard';

const SearchResults = ({ type, data = [] }) => (
  <div className="mt-3 pt-2 pb-3 search-results-content bg-white">
    {type !== 'navbar' ? (
      <h4 className="font-weight-bold results-heading mt-2 pl-2">
        Results retrieved
      </h4>
    ) : null}
    <div className="mt-3 mb-1 pl-2">
      {data.map((user) => (
        <div className="px-3 tooltip-card-div" key={user._id}>
          <SearchResultCard user={user} id={user._id} />
        </div>
      ))}
    </div>
  </div>
);
SearchResults.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    )
  ).isRequired,
};
export default SearchResults;
