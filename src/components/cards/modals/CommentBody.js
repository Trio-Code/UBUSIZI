/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import CommenterCard from './CommenterCard';

const CommentBody = ({
  modal, results, data, newComment
}) => (
  <div className="profile-modal-comment-body-content px-2 py-3">
    <div className="post-owner-div">
      {modal === 'modal' ? (
        <CommenterCard
          user="owner"
          userPicture={typeof data !== 'undefined' && typeof data.owner !== 'undefined' ? data.owner.profilePicture : null}
          ownerName={typeof data !== 'undefined' && typeof data.owner !== 'undefined' ? data.owner.username : null}
          caption={typeof data !== 'undefined' ? data.caption : null}
        />
      ) : (
        <CommenterCard
          user="owner"
          userPicture={typeof results !== 'undefined' && typeof results.owner !== 'undefined' ? results.owner.profilePicture : null}
          ownerName={typeof results !== 'undefined' && typeof results.owner !== 'undefined' ? results.owner.username : null}
          caption={typeof results !== 'undefined' ? results.caption : null}
        />
      )}
    </div>
    {modal === 'modal' ? (
      <div className="other-commenters-div">
        {typeof data !== 'undefined' && typeof data.comments !== 'undefined' && data.comments !== 'none' ? (data.comments.length > 0 ? (
          data.comments.map((comment) => (
            <CommenterCard
              comment={comment.comment}
              username={comment.user.username}
              picture={comment.user.profilePicture}
              createdAt={comment.createdAt}
            />
          ))
        ) : <p className="text-center text-dark text-weight-bold" style={{ fontSize: 14 }}>No Comments added yet!</p>) : null}
      </div>
    ) : (
      <div className="other-commenters-div">
        {typeof results !== 'undefined' ? (results.comments.length > 0 && results.comments !== 'none' ? (
          results.comments.map((comment) => (
            <CommenterCard
              comment={comment.comment}
              username={comment.user.username}
              picture={comment.user.profilePicture}
              createdAt={comment.createdAt}
            />
          ))
        ) : <p className="text-center text-dark text-weight-bold" style={{ fontSize: 14 }}>No Comments added yet!</p>) : null}
      </div>
    )}
  </div>
);

CommentBody.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  modal: PropTypes.objectOf(PropTypes.any).isRequired,
  newComment: PropTypes.string.isRequired,
};

export default CommentBody;
