import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostPP from '../../../assets/images/avat1.png';

const FollowersCard = ({
  size, picture, username, firstname, lastname
}) => {
  const history = useHistory();
  return (
    <div
      className={`liker-card-content mt-2 ${
        size === 'small' ? 'px-2' : 'px-3'
      }`}
    >
      <div className="row">
        <div className="col-7">
          <span className="text-font-15 font-weight-bold user-sidebar-text-content">

            <Link
              to={username ? `/${username}` : '/username'}
              onClick={() => { history.push(`/${username}`); window.location.reload(); }}
              className="text-dark"
            >
              <img src={picture === 'none' ? PostPP : picture} alt="profile-pic" />
            </Link>
            <span className="ml-3 display-user-sb-content">
              <Link
                to={username ? `/${username}` : '/username'}
                onClick={() => { history.push(`/${username}`); window.location.reload(); }}
                className="text-dark"
              >
                {username}
              </Link>
              <span
                className="text-secondary"
                style={{ fontSize: 13 }}
              >
                {`${firstname} ${lastname}`}
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

FollowersCard.propTypes = {
  size: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
};

export default FollowersCard;
