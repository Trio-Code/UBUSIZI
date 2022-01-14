/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import FollowersCard from './FollowersCard';

const FollowersModal = ({ data, id }) => {
  const closeModal = () => {
    $(`#followersModal-${id}`).modal('hide');
  };
  return (
    <>
      <div
        className="modal fade likers-modal with-liker"
        id={`followersModal-${id}`}
      >
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="mx-auto">
                <h3 className="">Followers</h3>
              </div>

              <button type="button" className="close" onClick={closeModal}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              {typeof data !== 'undefined' && typeof data.allFollowers !== 'undefined'
                ? data.allFollowers.map((like) => (
                  <FollowersCard
                    picture={like.profilePicture}
                    username={like.username}
                    firstname={like.firstname}
                    lastname={like.lastname}
                  />
                ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

FollowersModal.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FollowersModal;
