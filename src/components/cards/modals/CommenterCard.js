import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import defaultPic from '../../../assets/images/avat1.png';
import generatePostedAt from '../../../helpers/generatePostedAt';

const CommenterCard = ({
  user, username, picture, comment, ownerName, userPicture, caption, createdAt
}) => (
  <div className="comment-card-content px-2 mb-2">
    <div className="row">
      {user === 'owner' ? (
        <div className="col-8">
          <img src={userPicture === 'none' ? defaultPic : userPicture} alt="profile-pic" className="circle" />
          <Link
            className="ml-2 post-card-header-text text-font-15 text-dark font-weight-bold"
            to={`/${ownerName}`}
          >
            {ownerName}
          </Link>
        </div>
      ) : (
        <div className="col-8">
          <img src={picture === 'none' ? defaultPic : picture} alt="profile-pic" className="circle" />
          <Link
            className="ml-2 post-card-header-text text-font-15 text-dark font-weight-bold"
            onClick={() => window.location.reload()}
            to={`/${username}`}
          >
            {username}
          </Link>
        </div>
      )}
    </div>
    {user === 'owner' ? (
      <div className="comment-box-content">
        <p className="px-2">
          {typeof caption !== 'undefined' && caption !== 'undefined' ? caption : ''}
        </p>
      </div>
    ) : (
      <div className="comment-box-content">
        <p className="px-2">
          {comment}
        </p>
      </div>
    )}
    {user === 'owner' ? null : (
      <p className="text-secondary comment-date">
        {generatePostedAt(createdAt)}
      </p>
    )}
  </div>
);

CommenterCard.propTypes = {
  user: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  userPicture: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,

};

export default CommenterCard;
