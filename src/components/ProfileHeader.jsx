import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import defaultProfile from '../assets/images/avat1.png';
import generateNumberFormat from '../helpers/generateNumberFormat';
import FollowingModal from './cards/modals/FollowingModal';
import FollowersModal from './cards/modals/FollowersModal';

const ProfileHeader = ({ data }) => (
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
            {data.followers === 0 || typeof data.followers === 'undefined' ?
            (
              <span className="col cursor-pointer">
                <span className=" font-weight-bolder mr-1">
                  {generateNumberFormat(data.followers)}
                </span>
                Followers
              </span>
            ) : (
              <span
              className="col cursor-pointer"
              data-toggle="modal"
              data-target={`#followersModal-${data._id}`}
            >
              <span className=" font-weight-bolder mr-1">
                {generateNumberFormat(data.followers)}
              </span>
              Followers
            </span>
            )
          }
            <FollowersModal data={data} id={data._id} />
            {data.following === 0 || typeof data.following === 'undefined' ? 
            (
              <span className="col cursor-pointer">
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
            )
          }
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
                <Link
                  to="/users/edit/profile"
                  className="mb-3 mt-2 font-weight-bolder btn btn-outline-dark btn-sm"
                >
                  Edit Profile
                </Link>
                <Link className="ml-3 text-dark" to="/user/settings">
                  <FontAwesomeIcon icon={['fas', 'cog']} className="cog" />
                </Link>
              </span>
            </div>
            <div className="col">
              <span className="font-weight-bolder  mt-2 d-block">
                Social Media
              </span>
              <span className="follow mt-1">
                {data.socials ? (
                  data.socials.instagram && data.socials.instagram !== 'none' ? (
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
                  data.socials.facebook && data.socials.facebook!== 'none' ? (
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
                  data.socials.twitter && data.socials.twitter !== 'none' ? (
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
ProfileHeader.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
};
export default ProfileHeader;
