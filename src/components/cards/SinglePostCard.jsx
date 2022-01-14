/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types';
import React from 'react';
import Image from '../../assets/images/post-pic.png';
import Logo from '../../assets/images/avat1.png';
import CardBody from './SinglePostBody';
import CardFooter from './SinglePostFooter';

const Card = () => {
  const profile = {
    caption: 'hello world',
    content: Image,
    owner: {
      username: 'Rashford11',
      profilePicture: Logo
    },
    comments: {
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum animimagnam quidem id molestiae eius? dipisi Lorem ipsum dolor sit ametconsectetur adipisicing elit. Nostrum animi magnam quidem id molestiaeeius? dipisi Lorem ipsum dolor sit ameter five',
      user: {
        profilePicture: Logo,
        username: 'Khalid12'
      }
    },
    likes: {
      likesNo: 4500
    }
  };
  return (
    <div className="container">
      <div id="post" className="modal" role="dialog">
        <div className="modal-dialog  modal-lg">
          <div className="modal-content">
            <div className="row no-gutters">
              <div className="col-7">
                <img
                  src={profile.content}
                  alt="post"
                  className=""
                />
              </div>
              <div className="col-5">
                <div className="card overflow-auto rounded-0">
                  <div className="card-header card-header1">
                    <div className="row no-gutters">
                      <div className="col-2">
                        <img
                          src={profile.owner.profilePicture}
                          alt="owner"
                          className="d-inline my-pic1 rounded-circle border"
                        />
                      </div>
                      <div className="col-10">
                        <span className="text-dark font-weight-bold" style={{ fontSize: 14 }}>{profile.owner.username.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                  <CardBody profile={profile} />
                  <CardFooter profile={profile} />
                </div>
                <div>
                  <form action="" className="dash-form">
                    <div className="input">
                      <input
                        type="text"
                        id="comment"
                        className="form-control rounded-0 input-comment mb-0 no-shadow"
                        placeholder="Add a comment..."
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Card;
