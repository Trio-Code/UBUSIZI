/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import $ from 'jquery';
import DeletePostAction from '../../../redux/actions/post/deletePost';

const DeleteModal = ({
  DeletePostAction: deleteAction,
  deletePost,
  id,
  refetch, modalName
}) => {
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState('');
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    if (deletePost.status === 'success') {
      $(`#deletePostModal${id}`).modal('hide');
      $(modalName).modal('hide');
      setStatus('success');
      setErrors([]);
      if (trigger) {
        refetch(id);
        setTrigger(false);
      }
    }

    if (deletePost.status === 'error') {
      setStatus('');
      return setErrors([deletePost.error.message]);
    }

    return undefined;
  }, [deletePost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    deleteAction(id);

    setErrors([]);
    return setStatus('submitting');
  };

  return (
    <>
      <div
        className="modal fade"
        id={`deletePostModal${id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteAction"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content bg-white border-0">
            <div className="modal-header">
              <h4
                className="section-title p-0 mt-1 m-0 text-dark text-center mx-auto font-weight-bold"
                style={{ fontSize: 20.7 }}
              >
                Delete Post
              </h4>
              <button
                type="button"
                data-dismiss="modal"
                className="close-button cursor-pointer border-0 bg-white text-center text-dark"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-form-div">
                <div className="">
                  {errors.map((error, index) => (
                    <div className="modal-front-alert-div">
                      <div
                        className="alert alert-danger alert-dismissible py-2 fade show"
                        key={index}
                      >
                        <button
                          type="button"
                          className="close"
                          onClick={() => setErrors([])}
                        >
                          &times;
                        </button>
                        <strong className="d-block">
                          <FontAwesomeIcon
                            icon={['fas', 'times-circle']}
                            className="mr-1"
                          />
                          Error!
                        </strong>
                        <span className="alert-txt mt-2">{error}</span>
                      </div>
                    </div>
                  ))}
                  <div className="text-center">
                    Are you sure you want to delete this Post?
                  </div>
                  <div className="mt-4">
                    {status === 'submitting' ? (
                      <button
                        type="button"
                        className="text-white btn btn-secondary px-4 py-1 mt-2 cursor-disabled text-center"
                        disabled
                      >
                        Deleting
                      </button>
                    ) : (
                      <div className="text-center">
                        <button
                          type="button"
                          className="text-white btn btn-danger px-4 py-1 mt-2 mr-2"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="text-white btn btn-success px-4 py-1 mt-2"
                          onClick={handleSubmit}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DeleteModal.propTypes = {
  id: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  DeletePostAction: PropTypes.func.isRequired,
  deletePost: PropTypes.objectOf(PropTypes.any).isRequired,
  refetch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ deletePost }) => ({
  deletePost,
});

export default connect(mapStateToProps, { DeletePostAction })(DeleteModal);
