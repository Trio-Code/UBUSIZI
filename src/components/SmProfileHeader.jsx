import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import defaultProfile from '../assets/images/avat1.png';
import generateNumberFormat from '../helpers/generateNumberFormat';

const ProfileHeader = ({ data }) => (
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
            <span className="text font-weight-bold">
              {`${data.lastname} ${data.firstname}`}
            </span>
          </div>
          <span className="ml-1">
            <Link
              to="/users/edit/profile"
              className="mb-3 btn btn-outline-dark btn-sm edit-btn"
            >
              Edit Profile
            </Link>
          </span>
          <Link className="ml-3 text-dark" to="/user/settings">
            <FontAwesomeIcon icon={['fas', 'cog']} className="cog" />
          </Link>
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
                {generateNumberFormat(data.followers)}
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
ProfileHeader.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
};
export default ProfileHeader;
