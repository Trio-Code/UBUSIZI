/* eslint-disable max-len */

/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import userAvat from '../../assets/images/avat1.png';
import followUserAction from '../../redux/actions/follow/follow';
import unfollowUserAction from '../../redux/actions/follow/unfollow';

const CommentCardActivity = ({
  data, follow, followUserAction: followAction, unfollow, unfollowUserAction: unfollowAction
}) => {
  const user = data.description.split(' ');
  const username = user[0];
  const [followingStatus, setFollowingStatus] = useState(false);
  const [addFollower, setAddFollower] = useState(false);
  const [reduceFollower, setReduceFollower] = useState(false);

  useEffect(() => {
    setAddFollower(false);
    setReduceFollower(false);
    if (follow.status === 'success') {
      return setAddFollower(true);
    }
    if (unfollow.status === 'success') {
      return setReduceFollower(true);
    }
    return undefined;
  }, [follow, unfollow]);
  return (
    <div className="card-display">
      <div className="text-font-15 user-sidebar-text-content cards-separator">
        <div className="d-flex justify-content-center align-items-center">
          <Link to={`/${username}`}>
            <span className="search-img-display">
              <span className="">
                <span
                  className="search-img"
                  style={{
                    backgroundImage: `url(${
                      data.userProfilePic
                        ? data.userProfilePic === 'none'
                          ? userAvat
                          : data.userProfilePic
                        : userAvat
                    })`,
                  }}
                />
              </span>
            </span>
          </Link>
        </div>
        <span className="ml-2 display-user-sb-content boarder py-3" style={{ width: 500 }}>
          <span className="text-light-dark text-left font-weight-bold">
            <Link to={`/${username}`} className="usernames">
              {username}
            </Link>
          </span>
          <span className="text-secondary text-left" style={{ fontSize: 13 }}>
            {data.description}
          </span>
          <span className="followbtn">
            <Link to={`/${username}`} className="usernames">
              <button
                type="button"
                className="mb-3 btn btn-outline-dark btn-sm edit-btn"
              >
                View Profile
              </button>
            </Link>

          </span>
        </span>

      </div>
    </div>
  );
};
CommentCardActivity.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  followUserAction: PropTypes.func.isRequired,
  follow: PropTypes.objectOf(PropTypes.any).isRequired,
  unfollowUserAction: PropTypes.func.isRequired,
  unfollow: PropTypes.objectOf(PropTypes.any).isRequired,

};
const mapStateToProps = ({ follow, unfollow }) => ({
  follow,
  unfollow
});

export default connect(mapStateToProps, { followUserAction, unfollowUserAction })(CommentCardActivity);
