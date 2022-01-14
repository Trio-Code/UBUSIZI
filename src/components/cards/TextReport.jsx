/* eslint-disable react/prop-types */
import React from 'react';

const TextCardBody = ({ content }) => (
  <div
    className="text-card-body-content post-bg-green text-white font-weight-bold mx-auto d-block border mt-2 shadow-lg"
  >
    <p
      className="text-center txtwarp rtxt"
      style={{ width: 335, }}
    >
      {content}
    </p>
  </div>
);
export default TextCardBody;
