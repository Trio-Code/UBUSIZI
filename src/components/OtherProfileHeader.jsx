/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import generateNumberFormat from '../helpers/generateNumberFormat';
import defaultProfile from '../assets/images/avat1.png';
import followUserAction from '../redux/actions/follow/follow';
import unfollowUserAction from '../redux/actions/follow/unfollow';
import FollowingModal from './cards/modals/FollowingModal';
import FollowersModal from './cards/modals/FollowersModal';

const OtherProfileHeader = ({
  data,
  follow,
  followUserAction: followAction,
  unfollow,
  unfollowUserAction: unfollowAction,
}) => {
  const [followingStatus, setFollowingStatus] = useState(data.isFollowing);
  const [addFollower, setAddFollower] = useState(false);
  const [reduceFollower, setReduceFollower] = useState(false);

  useEffect(() => {
    if (follow.status === 'success') {
      return setAddFollower(true);
    }
    if (unfollow.status === 'success') {
      return setReduceFollower(true);
    }
    return undefined;
  }, [follow, unfollow]);

  const closeModal = () => {
    $('#unFollowModal').modal('hide');
  };

  const handleUnFollow = (e) => {
    e.preventDefault();
    unfollowAction(data._id);
    setFollowingStatus(false);
    setAddFollower(false);
    return $('#unFollowModal').modal('hide');
  };
  const handleFollow = (e) => {
    e.preventDefault();
    followAction(data._id);
    setFollowingStatus(true);
    setReduceFollower(false);
  };
  return (
    <div className="my-profile-header">
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="row">
              <div className="col-12 staff">
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
              <div className="col-12">
                <div className="my-2 full-name-div">
                  <span className="text text-center lead d-block font-weight-bolder">{`${data.lastname} ${data.firstname}`}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="row mb-3">
              <span className="col">
                <span className=" font-weight-bolder mr-1">
                  {generateNumberFormat(data.totalposts)}
                </span>
                Poems
              </span>
              {typeof data.followers === 'undefined' || data.followers === 0 ?
              (
                <span className="col cursor-pointer">
                  {addFollower ? (
                  <span className=" font-weight-bolder mr-1">
                    {generateNumberFormat(data.followers + 1)}
                  </span>
                ) : reduceFollower ? (
                  <span className=" font-weight-bolder mr-1">
                    {generateNumberFormat(data.followers)}
                  </span>
                ) : (
                  <span className=" font-weight-bolder mr-1">
                    {generateNumberFormat(data.followers)}
                  </span>
                )}
                  Followers
                </span>
              ) : (
                <span
                className="col cursor-pointer"
                data-toggle="modal"
                data-target={`#followersModal-${data._id}`}
              >
                {addFollower ? (
                  <span className=" font-weight-bolder mr-1">
                    {generateNumberFormat(data.followers + 1)}
                  </span>
                ) : reduceFollower ? (
                  <span className=" font-weight-bolder mr-1">
                    {generateNumberFormat(data.followers)}
                  </span>
                ) : (
                  <span className=" font-weight-bolder mr-1">
                    {generateNumberFormat(data.followers)}
                  </span>
                )}
                Followers
              </span>
              )
              }
              <FollowersModal data={data} id={data._id} />
              {typeof data.following === 'undefined' || data.following === 0 ?
                (
                  <span
                className="col cursor-pointer"
              >
                <span className=" font-weight-bolder mr-1">
                  {generateNumberFormat(data.following)}
                </span>
                Following
              </span>
                ) : (
                <span
                className="col cursor-pointer"
                data-toggle="modal"
                data-target={`#followingModal-${data._id}`}
              >
                <span className=" font-weight-bolder mr-1">
                  {generateNumberFormat(data.following)}
                </span>
                Following
              </span>
              )}
              
              <FollowingModal data={data} id={data._id} />
            </div>
            <div className="row">
              <div className="col">
                <span className="username mb-2 d-block">{data.username}</span>
                <div className="mt-1 mb-2 bio-content">
                  <span className="font-weight-bolder d-block lead">Bio</span>
                  <span className="text mt-1">{data.bio}</span>
                </div>
                <span className="">
                  {followingStatus || addFollower ? (
                    <button
                      type="button"
                      className="mb-3 mt-2 font-weight-bolder btn btn-outline-dark btn-sm edit-btn"
                      data-toggle="modal"
                      data-target="#unFollowModal"
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="mb-3 mt-2 font-weight-bolder btn btn-warning no-shadow btn-sm px-4 text-font-15"
                      onClick={handleFollow}
                    >
                      + Follow
                    </button>
                  )}
                  <div
                    className="modal fade unfollow-modal with-liker"
                    id="unFollowModal"
                  >
                    <div className="modal-dialog modal-sm modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <div className="pl-3">
                            <h3 className="font-size-15 font-weight-bold">{`Are you sure you want to unfollow @${data.username}`}</h3>
                          </div>
                          <button
                            type="button"
                            className="close"
                            onClick={closeModal}
                          >
                            &times;
                          </button>
                        </div>
                        <div className="modal-body text-center">
                          <span
                            className="text-danger font-weight-bold mx-auto my-2 cursor-pointer"
                            onClick={handleUnFollow}
                          >
                            Unfollow
                          </span>
                          <hr />
                          <span
                            className="text-dark font-weight-bold mx-auto my-2 cursor-pointer"
                            onClick={closeModal}
                          >
                            Cancel
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown d-inline ml-3">
                    <span
                      className="mr-2 drop-icon cursor-pointer"
                      data-toggle="dropdown"
                    >
                      <FontAwesomeIcon icon={['fas', 'ellipsis-v']} />
                    </span>
                    <div className="dropdown-menu post-card-drop-menu pt-0 dropdown-menu-left">
                      <Link
                        to={`/report/account/${data._id}`}
                        exact
                        className="dropdown-item text-danger font-weight-bold text-font-15 border-bottom-secondary py-2"
                      >
                        Report
                      </Link>
                    </div>
                  </div>
                </span>
              </div>
              <div className="col">
                <span className="font-weight-bolder  mt-2 d-block">
                  Social Media
                </span>
                <span className="follow mt-1">
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
        </div>
      </div>
    </div>
  );
};
OtherProfileHeader.propTypes = {
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
})(OtherProfileHeader);
