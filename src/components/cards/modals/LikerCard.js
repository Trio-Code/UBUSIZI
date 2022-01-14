import React from 'react';
import PropTypes from 'prop-types';
import PostPP from '../../../assets/images/avat1.png';

const LikerCard = ({
  size, picture, username, fullname
}) => (
  <div
    className={`liker-card-content mt-2 ${size === 'small' ? 'px-2' : 'px-3'
    }`}
  >
    <div className="row">
      <div className="col-7">
        <span className="text-font-15 font-weight-bold user-sidebar-text-content">
          <img src={picture === 'none' ? PostPP : picture} alt="profile-pic" />
          <span className="ml-3 display-user-sb-content">
            <a className="text-dark" onClick={() => window.location.reload()} href={`/${username}`}>{username}</a>
            <span className="text-secondary" style={{ fontSize: 13 }}>
              {fullname}
            </span>

          </span>
        </span>
      </div>
    </div>
  </div>
);

LikerCard.propTypes = {
  size: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
};

export default LikerCard;
