/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserNavbar from '../../components/UserNavbar';
import Footer from '../../components/Footer';
import profile from '../../assets/images/avat1.png';
import pro from '../../assets/images/john-doe.jpg';
import Upload from '../../components/modals/Upload';
import EditProfileAction from '../../redux/actions/user/editProfile';
import Loader from '../../components/Loader';
import BottomNav from '../../components/BottomNav';

const EditProfile = ({ EditProfileAction: editAction, editProfile }) => {
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [result, setResults] = useState();
  const [error, setError] = useState('');
  const [loggedInData, setLoggedInData] = useState({});
  const [isPasswordShown, setPasswordShow] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('UBUSIZI_USER_TOKEN');
    const userData = localStorage.getItem('UBUSIZI_USER_DATA');

    if (!userToken || !userData) {
      return history.push('/accounts/login');
    }
    setLoggedInData(JSON.parse(userData));

    return undefined;
  }, []);

  const togglEye = isPasswordShown ? 'Hide' : 'Show';
  const [loggedInPic, setLoggedInPic] = useState('');
  const [status, setStatus] = useState('initial');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setmsg] = useState('');
  const [file, setFile] = useState(null);
  const [profilePic, setProfilePic] = useState('');
  const [photost, setPhotost] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  let files;
  let ubusizidata = {
    picture: '',
    username: '',
    fullname: '',
  };
  useEffect(() => {
    if (!localStorage.getItem('UBUSIZI_USER_TOKEN')) {
      return history.push('account/login');
    }

    if (status === 'initial') {
      editAction(null, null);
      if (editProfile.status === 'success') {
        setResults(editProfile.data);
        setFirstName(editProfile.data.firstname);
        setLastName(editProfile.data.lastname);
        setUserName(editProfile.data.username);
        setBio(editProfile.data.bio);
        setEmail(editProfile.data.email);
        setProfilePic(editProfile.data.profilePicture);
        setInstagram(typeof editProfile.data.socials !== 'undefined' ? editProfile.data.socials.instagram : '');
        setFacebook(typeof editProfile.data.socials !== 'undefined' ? editProfile.data.socials.facebook : '');
        setTwitter(typeof editProfile.data.socials !== 'undefined' ? editProfile.data.socials.twitter : '');
        if (editProfile.data.profilePicture === 'none') {
          setProfilePic(profile);
        }
        setStatus('fetched');
      }
    }
    if (editProfile.status === 'success') {
      if (status === 'submiting') {
        setStatus('success');
        setmsg('Successfully Updates');
        const full = `${editProfile.data.firstname} ${editProfile.data.lastname}`;
        ubusizidata = {
          ...ubusizidata,
          picture: editProfile.data.profilePicture,
          username: editProfile.data.username,
          fullname: full,
        };

        localStorage.setItem('UBUSIZI_USER_DATA', JSON.stringify(ubusizidata));
        setSubmitting(false);
        window.location.reload();
      }
    }
    if (photost === 'refetch') {
      setProfilePic(URL.createObjectURL(files));
      setPhotost('done');
    }
    if (editProfile.status === 'failed') {
      setStatus('fetched');
      setSubmitting(false);
      return setError([editProfile.error.message]);
    }
    return undefined;
  }, [editProfile]);
  const refetch = async (File) => {
    files = File;
    setFile(files);
    if (File === 'none') {
      setProfilePic(profile);
    } else {
      setProfilePic(URL.createObjectURL(files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstname = firstName;
    const lastname = lastName;
    const username = userName;
    let payload3 = null;
    let payload;
    const socials = {
      instagram,
      facebook,
      twitter,
    };
    if (username === editProfile.data.username) {
      payload = {
        firstname,
        lastname,
        socials,
        bio,
      };
    } else {
      payload = {
        firstname,
        lastname,
        username,
        socials,
        bio,
      };
    }
    if (file) {
      if (file === 'none') {
        payload3 = 'none';
      }
    }
    if (file) {
      if (payload3) {
        editAction(payload, payload3);
      } else {
        const payload1 = new FormData();
        payload1.append('photo', file);
        editAction(payload, payload1);
      }
    } else {
      editAction(payload, null);
    }

    setStatus('submiting');
    setError([]);
    return setSubmitting(true);
  };

  return (
    <div className="wrapper">
      <UserNavbar data={loggedInData} />
      <BottomNav data={loggedInData} />
      <div className="move-top">
        <div className="">
          <div
            className="signup-form-div"
            style={{ backgroundColor: '#fafafa' }}
          >
            <div className="edit-content py-3  ">
              <form className="user-form mt-3  px-5">
                {status === 'initial' ? (
                  <Loader title="Verifying..." marginTop="20" />
                ) : (
                  <div className="row">
                    <div className="col-12 ">
                      {status === 'success' ? (
                        <div className="alert alert-primary alert-dismissible mt-4 fade show">
                          <button
                            type="button"
                            className="close"
                            onClick={() => setStatus('fetched')}
                          >
                            &times;
                          </button>
                          <strong className="d-block">
                            <FontAwesomeIcon
                              icon={['fas', 'check-circle']}
                              className="mr-1"
                            />
                            Success!
                          </strong>
                          <span className="alert-txt mt-2">
                            Profile Edited Successfully!
                          </span>
                        </div>
                      ) : null}
                    </div>

                    <div className="col-3 ">
                      {photost === 'refetch' ? (
                        <Loader marginTop="20%" />
                      ) : (
                        <div className="estaff mt-3 float-right">
                          <div className="">
                            <div
                              className="eimg "
                              style={{ backgroundImage: `url(${profilePic})` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-9">
                      <div className="form-group mt-3">
                        <h4 className="name">{userName}</h4>
                        <Upload refetch={refetch} />
                      </div>
                    </div>

                    <div className="col-9 col-md-3 col-sm-9 ">
                      <div className=" mt-4 float-left float-sm-right float-md-right">
                        <h6 className="label">Firstname</h6>
                      </div>
                    </div>
                    <div className="col-12 col-md-7 col-sm-7">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control edit-input no-shadow"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                        />
                        <p className="ptext mt-2 text-secondary">
                          Help people discover your account by using the name
                          you're known by: either your full name, nickname, or
                          business name
                        </p>
                      </div>
                    </div>
                    <div className="col-9 col-md-3 col-sm-9 ">
                      <div className=" mt-4 float-left float-sm-right float-md-right">
                        <h6 className="label">Lastname</h6>
                      </div>
                    </div>
                    <div className="col-12 col-md-7 col-sm-7">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control edit-input no-shadow"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                        />
                        <p className="ptext  mt-2 text-secondary">
                          Help people discover your account by using the name
                          you're known by: either your full name, nickname, or
                          business name
                        </p>
                      </div>
                    </div>

                    <div className="col-9 col-md-3 col-sm-9 ">
                      <div className=" mt-4 float-left float-sm-right float-md-right">
                        <h6 className="label">Username</h6>
                      </div>
                    </div>
                    <div className="col-12 col-md-7 col-sm-7">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control edit-input no-shadow"
                          value={userName}
                          onChange={(e) => {
                            setUserName(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-9 col-md-3 col-sm-9 ">
                      <div className=" mt-4 float-left float-sm-right float-md-right">
                        <h6 className="label">Bio</h6>
                      </div>
                    </div>
                    <div className="col-12 col-md-7 col-sm-7">
                      <div className="form-group mt-3">
                        <textarea
                          type="text"
                          className="form-control edit-input no-shadow"
                          value={bio}
                          onChange={(e) => {
                            setBio(e.target.value);
                          }}
                        />
                        <p className="ptext  mt-2 text-secondary">
                          Provide your personal information, even if the account
                          is used for a business, a pet or something else. This
                          won't be a part of your public profile.
                        </p>
                      </div>
                    </div>

                    <div className="col-9 col-md-3 col-sm-9 ">
                      <div className=" mt-4 float-left float-sm-right float-md-right">
                        <h6 className="label">Instagram</h6>
                      </div>
                    </div>
                    <div className="col-12 col-md-7 col-sm-7">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control edit-input no-shadow"
                          value={instagram !== 'none' ? instagram : null}
                          onChange={(e) => {
                            setInstagram(e.target.value);
                          }}
                          placeholder="Instagram profile link"
                        />
                      </div>
                    </div>

                    <div className="col-9 col-md-3 col-sm-9 ">
                      <div className=" mt-4 float-left float-sm-right float-md-right">
                        <h6 className="label">Facebook</h6>
                      </div>
                    </div>
                    <div className="col-12 col-md-7 col-sm-7">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control edit-input no-shadow"
                          value={facebook !== 'none' ? facebook : null}
                          onChange={(e) => {
                            setFacebook(e.target.value);
                          }}
                          placeholder="Facebook profile link"
                        />
                      </div>
                    </div>

                    <div className="col-9 col-md-3 col-sm-9 ">
                      <div className=" mt-4 float-left float-sm-right float-md-right">
                        <h6 className="label">Twitter</h6>
                      </div>
                    </div>
                    <div className="col-12 col-md-7 col-sm-7">
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control edit-input no-shadow"
                          value={twitter !== 'none' ? twitter : null}
                          onChange={(e) => {
                            setTwitter(e.target.value);
                          }}
                          placeholder="Twitter profile link"
                        />
                      </div>
                    </div>

                    <div className="col-9 col-md-3 col-sm-9 ">
                      <div className=" mt-4 float-left float-sm-right float-md-right">
                        <h6 className="label">Email</h6>
                      </div>
                    </div>
                    <div className="col-12 col-md-7 col-sm-7">
                      <div className="form-group mt-3">
                        <input
                          type="email"
                          className="form-control edit-input no-shadow"
                          value={email}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-3 " />
                    <div className="col-12 col-md-7 col-sm-7">
                      {error ? (
                        <p className="text-danger text-center font-weight-bold text-font-15">
                          {error}
                        </p>
                      ) : null}
                    </div>

                    <div className="col-3 " />
                    <div className="col-12 col-md-7 col-sm-7">
                      <div className="form-group mt-3">
                        <div className="form-group">
                          {submitting ? (
                            <button
                              className="btn btn-warning form-control"
                              disabled
                              type="button"
                            >
                              <span className="spinner-border spinner-border-sm d-block mx-auto" />
                            </button>
                          ) : (
                            <button
                              className="btn btn-warning form-control py-1 font-weight-bold text-font-15"
                              type="button"
                              onClick={handleSubmit}
                            >
                              Submit
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  EditProfileAction: PropTypes.func.isRequired,
  editProfile: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = ({ editProfile }) => ({
  editProfile,
});
export default connect(mapStateToProps, { EditProfileAction })(EditProfile);
