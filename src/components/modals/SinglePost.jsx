/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Card from '../cards/SinglePostCard';

const SinglePost = ({ post }) => (
  <>
    <button
      type="button"
      className=" btn text-primary link  "
      data-toggle="modal"
      data-target="#post"
    >
      {post}
    </button>
    <Card post={post} />
  </>
);
export default SinglePost;
