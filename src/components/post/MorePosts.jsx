import React from 'react';
import PropTypes from 'prop-types';
import PostCard from '../cards/PostCard';

const SinglePostSm = ({ data, results }) => {
  let userInfo;
  if (results) {
    const { username, profilePicture } = results.owner;
    userInfo = { username, profilePicture };
  }
  let res = [];
  if (data) {
    res = data.map((post) => (
      <div className="col-md-6 col-lg-4">
        <div className="profile-post-card">
          <PostCard
            info={userInfo}
            data={post}
            results={results}
            type={post.type}
            profile="profile"
            page="more"
          />
        </div>
      </div>
    ));
  }
  return (
    <div className="more-posts-display-content pb-3">
      <p className="more-posts-par">
        <span className="more-posts-display-par mr-2 text-secondary font-weight-bold">
          More posts from
        </span>
        <span className="more-posts-display-name mr-2 font-weight-bold">
          {results.owner.username}
        </span>
      </p>
      {res.length > 0 ? (
        <div className="row">{res}</div>
      ) : (
          <p className="text-center font-weight-bold text-font-15">
            No other posts found!
          </p>
        )}
    </div>
  );
};
SinglePostSm.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SinglePostSm;
