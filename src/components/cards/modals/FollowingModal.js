/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import FollowingCard from './FollowingCard';

const FollowingModal = ({ data, id }) => {
  const closeModal = () => {
    $(`#followingModal-${id}`).modal('hide');
  };

  return (
    <>
      <div
        className="modal fade likers-modal with-liker"
        id={`followingModal-${id}`}
      >
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="mx-auto">
                <h3 className="">Following</h3>
              </div>

              <button type="button" className="close" onClick={closeModal}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              {typeof data !== 'undefined'
                ? typeof data.allFollowing !== 'undefined' && data.allFollowing.length > 0
                  ? data.allFollowing.map((like) => (
                    <FollowingCard
                      picture={like.profilePicture}
                      username={like.username}
                      firstname={like.firstname}
                      lastname={like.lastname}
                    />
                  ))
                  : ''
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

FollowingModal.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FollowingModal;
