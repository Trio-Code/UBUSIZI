/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const SinglePostBody = ({ profile }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleMore = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className="card-body">
      <div className="row no-gutters">
        <div className="col-2 d-inline">
          <img
            src={profile.comments.user.profilePicture}
            alt="owner"
            className="d-inline my-pic1 rounded-circle border"
          />
        </div>
        <div className="col-10 d-inline">
          <span className="text-dark font-weight-bold pr-2" style={{ fontSize: 14 }}>{profile.comments.user.username.toUpperCase()}</span>
          <span>
            {profile.comments.comment.length <= 47
              ? profile.comments.comment
              : isCollapsed
                ? `${profile.comments.comment.slice(0, 47)}...`
                : profile.comments.comment.slice(0, 47)}
          </span>
          {profile.comments.comment.length >= 47 ? (
            <>
              <span
                className="post-footer-caption text-muted text-font-15 collapse"
                id="postCaption"
              >
                {`${profile.comments.comment.slice(49, profile.comments.comment.length)}`}
              </span>
              <span
                className="ml-2 text-font-15 text-secondary font-weight-bold cursor-pointer"
                data-toggle="collapse"
                data-target="#postCaption"
                onClick={toggleMore}
              >
                {isCollapsed ? 'more' : 'show less'}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </div>

  );
};
export default SinglePostBody;
