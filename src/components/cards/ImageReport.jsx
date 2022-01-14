/* eslint-disable react/prop-types */
import React from 'react';

const TextCardBody = ({ content }) => (
  <div className="">
    <img
      src={content}
      alt="post"
      // width="335"
      // height="180"
      className="mx-auto report-size d-block border mt-2 shadow-lg"
    />
  </div>
);
export default TextCardBody;
