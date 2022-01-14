/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { connect } from 'react-redux';

const Upload = ({ refetch }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [img, setImg] = useState();
  const [close, setClose] = useState('');

  useEffect(() => {
    if (status === 'success') {
      $('#upload').modal('hide');
    }
    return undefined;
  },);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      refetch(file);
    } else {
      setImg(null);
    }
    setStatus('success');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    refetch('none');
    setStatus('success');
  };

  return (

    <>
      <button
        type="button"
        className=" btn  px-2 py-1 text-primary link  "
        data-toggle="modal"
        data-target="#upload"
      >
        <span>Change Profile Photo</span>
      </button>
      <div
        style={{ margin: ' 0 auto' }}
        className="modal fade"
        id="upload"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="upload"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content border-0 artist-modal">
            <div className="modal-header">
              <h4
                className="section-title p-0 m-0 text-dark text-center mx-auto font-weight-bold"
                style={{ fontSize: 20.7 }}
              >
                Upload Photo
              </h4>
              <span
                data-dismiss="modal"
                className="close-button cursor-pointer text-center text-dark"
              >
                &times;
              </span>
            </div>
            <div className="modal-body">
              <input
                type="file"
                id="postImg"
                name="user[image]"
                multiple={false}
                required
                onChange={handleFileChange}
                accept=".png,.jpg"
              />
              <label
                htmlFor="postImg"
                className="file-label mt-2 text-white text-font-15 cursor-pointer bg-primary"
              >
                Upload Photo
              </label>
              <hr />
              <button
                type="button"
                onClick={handleSubmit}
                className=" btn btn-danger btn-label  mt-2 text-white text-font-15 cursor-pointer bg-danger"
              >
                Remove Current Photo
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
Upload.propTypes = {
  refetch: PropTypes.func.isRequired,

};

export default Upload;
