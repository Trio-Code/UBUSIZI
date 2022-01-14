import React from 'react';
import PropTypes from 'prop-types';
import PostCard from '../cards/PostCard';

const SinglePostSm = ({ type, results }) => {
  return (
    <div className="sm-single-post-display-content d-none mt-4">
      <PostCard results={results} data={results} type={type} view="single" />
    </div>
  );
};

SinglePostSm.propTypes = {
  type: PropTypes.string.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SinglePostSm;
