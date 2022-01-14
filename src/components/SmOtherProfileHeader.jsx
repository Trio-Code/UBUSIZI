/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import generateNumberFormat from '../helpers/generateNumberFormat';
import defaultProfile from '../assets/images/avat1.png';
import followUserAction from '../redux/actions/follow/follow';
import unfollowUserAction from '../redux/actions/follow/unfollow';

const ProfileHeader = ({
  data,
  follow,
  followUserAction: followAction,
  unfollow,
  unfollowUserAction: unfollowAction,
}) => {
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
  const handleUnFollow = (e) => {
    e.preventDefault();
    unfollowAction(data._id);
    setFollowingStatus(false);
    setAddFollower(false);
  };
  const handleFollow = (e) => {
    e.preventDefault();
    followAction(data._id);
    setFollowingStatus(true);
    setReduceFollower(false);
  };
  return (
    <div className="my-profile-header-sm">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-4">
            <div className="staff">
              <div className="">
                {data.profilePicture === 'none' ? (
                  <div
                    className="img"
                    style={{ backgroundImage: `url(${defaultProfile})` }}
                  />
                ) : (
                  <div
                    className="img"
                    style={{ backgroundImage: `url(${data.profilePicture})` }}
                  />
                )}
              </div>
            </div>
            <div className="mt-3 full-name-div">
              <span className="text font-weight-bold">{`${data.lastname} ${data.firstname}`}</span>
            </div>
            <span className="ml-1">
              {data.isFollowing || followingStatus ? (
                <button
                  type="button"
                  className="mb-3 btn btn-outline-dark btn-sm edit-btn"
                  onClick={handleUnFollow}
                >
                  Following
                </button>
              ) : (
                <button
                  type="button"
                  className="mb-3 btn btn-warning no-shadow btn-sm text-dark mt-2 font-weight-bold text-font-15"
                  onClick={handleFollow}
                >
                  + Follow
                </button>
              )}
            </span>
          </div>

          <div className="col-8">
            <div className="follow-content-div">
              <span className="follow-span">
                <span className="font-weight-bold content-head">
                  {generateNumberFormat(data.totalposts)}
                </span>
                <span className="text-gray content-par">posts</span>
              </span>
              <span className="follow-span">
                <span className=" font-weight-bold content-head">
                  {addFollower ? (
                    <span className=" font-weight-bold mr-1">
                      {generateNumberFormat(data.followers + 1)}
                    </span>
                  ) : reduceFollower ? (
                    <span className=" font-weight-bold mr-1">
                      {generateNumberFormat(data.followers)}
                    </span>
                  ) : (
                    <span className=" font-weight-bold mr-1">
                      {generateNumberFormat(data.followers)}
                    </span>
                  )}
                </span>
                <span className="text-gray content-par">followers</span>
              </span>
              <span className="follow-span">
                <span className="font-weight-bold content-head">
                  {generateNumberFormat(data.following)}
                </span>
                <span className="text-gray content-par">following</span>
              </span>
            </div>
            <span className="text-secondary d-block sm-username">
              {data.username}
            </span>
            <div className="mt-1 bio-content">
              <span className="bio-header">Bio</span>
              <span className="text mt-1">{data.bio}</span>
            </div>
            <div className="social-div-content">
              <span className="font-weight-bolder mt-2 d-block">
                Social Media
              </span>
              <span className="follow">
                {data.socials ? (
                  data.socials.instagram ? (
                    <a
                      href={data.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="foot-icon ig"
                      title="Instagram"
                    >
                      <FontAwesomeIcon icon={['fab', 'instagram']} />
                    </a>
                  ) : null
                ) : null}
                {data.socials ? (
                  data.socials.facebook ? (
                    <a
                      href={data.socials.facebook}
                      className="foot-icon fb"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Facebook"
                    >
                      <FontAwesomeIcon icon={['fab', 'facebook-square']} />
                    </a>
                  ) : null
                ) : null}

                {data.socials ? (
                  data.socials.twitter ? (
                    <a
                      href={data.socials.twitter}
                      className="foot-icon tw"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Twitter"
                    >
                      <FontAwesomeIcon icon={['fab', 'twitter']} />
                    </a>
                  ) : null
                ) : null}
              </span>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
ProfileHeader.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
  followUserAction: PropTypes.func.isRequired,
  follow: PropTypes.objectOf(PropTypes.any).isRequired,
  unfollowUserAction: PropTypes.func.isRequired,
  unfollow: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = ({ follow, unfollow }) => ({
  follow,
  unfollow,
});
export default connect(mapStateToProps, {
  followUserAction,
  unfollowUserAction,
})(ProfileHeader);
