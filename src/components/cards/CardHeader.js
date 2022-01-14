/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PostPP from '../../assets/images/avat1.png';

const CardHeader = ({ results, view }) => (
  <div className="post-card-header-content bg-white p-2">
    <div className="row">
      <div className="col-8">
        <img
          className="circle owner-feed-pp"
          src={
            results.owner
              ? results.owner.profilePicture !== 'none'
                ? results.owner.profilePicture
                : PostPP
              : PostPP
          }
          alt="profile-pic"
        />
        <Link
          className="ml-2 post-card-header-text text-font-15 text-dark font-weight-bold"
          to={
            results
              ? results.owner
                ? `/${results.owner.username}`
                : '/john_doe'
              : '/john_doe'
          }
        >
          {results
            ? results.owner
              ? results.owner.username
              : 'john_doe'
            : 'john_doe'}
        </Link>
      </div>
      <div className="col-4 text-right">
        <div className="dropdown">
          <span
            className="mr-2 mt-1 drop-icon cursor-pointer"
            data-toggle="dropdown"
          >
            <FontAwesomeIcon icon={['fas', 'ellipsis-v']} />
          </span>
          <div className="dropdown-menu post-card-drop-menu pt-0 dropdown-menu-right">
            <Link
              to={`/post/${results._id}/report`}
              exact
              className="dropdown-item text-danger font-weight-bold text-font-15 border-bottom-secondary py-2"
            >
              Report
            </Link>
            {view === 'single' ? null : (
              <Link
                to={`/post/${results._id}`}
                exact
                className="dropdown-item text-secondary text-font-15 py-2"
              >
                Go To Post
              </Link>
            )}
            <Link
              to={
                results.owner
                  ? `/${results.owner.username}`
                  : 'user/userId'
              }
              exact
              className="dropdown-item text-secondary text-font-15 py-2"
            >
              Go To User
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
CardHeader.propTypes = {
  results: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
};

export default CardHeader;
