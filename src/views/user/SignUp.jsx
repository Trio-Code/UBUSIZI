/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logo from '../../components/usage/Logo';
import SignupCover from '../../assets/images/signupCover.jpg';
import socialLoginAction from '../../redux/actions/user/socialLogin';
import signupAction from '../../redux/actions/user/signup';

const SignUp = ({
  signupAction: signup,
  socialLoginAction: socialAction,
  socialLogin,
  user,
}) => {
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isPasswordShown, setPasswordShow] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(false);
  const [disableSocial, setDisableSocial] = useState(false);
  const [disableLogin, setDisableLogin] = useState(false);
  const [logging, setLogging] = useState(false);

  const togglEye = isPasswordShown ? 'Hide' : 'Show';
  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyCmL4fytMo04MkUF4_m3rik34jcKVk41sE',
      authDomain: 'ubusizi-16418.firebaseapp.com',
      databaseURL: 'https://ubusizi-16418.firebaseio.com',
      projectId: 'ubusizi-16418',
      storageBucket: 'ubusizi-16418.appspot.com',
      messagingSenderId: '714626724464',
      appId: '1:714626724464:web:ab3b8fec58651cd07c7ab5',
      measurementId: 'G-Z6T4JZ9BQF',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    if (user.status === 'user_signup_success') {
      setSubmitting(false);
      setUserName('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setError('');
      setEmail('');
      return history.push('/user/success/?action=verify-account');
    }
    if (user.status === 'user_signup_error') {
      setSubmitting(false);
      return setError(user.error.message);
    }

    // SOCIAL LOGIN

    if (socialLogin.status === 'social_login_success') {
      setLogging(false);
      setDisableLogin(false);
      localStorage.setItem('UBUSIZI_USER_TOKEN', socialLogin.token);
      localStorage.setItem('UBUSIZI_USER_PIC', socialLogin.results.picture);
      localStorage.setItem('UBUSIZI_USER_ID', socialLogin.id);
      localStorage.setItem(
        'UBUSIZI_USER_DATA',
        JSON.stringify(socialLogin.results)
      );
      return window.location.replace('/');
    }

    if (socialLogin.status === 'social_login_error') {
      setLogging(false);
      setDisableLogin(false);
      return setError(socialLogin.error.message);
    }

    return undefined;
  });

  const showLoginPassword = () => {
    setPasswordShow(!isPasswordShown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstname: firstName,
      lastname: lastName,
      username: userName,
      email,
      password,
    };
    if (!checked) return setError('Check The box before Signing Up');

    if (!firstName || !lastName || !email || !userName || !password) {
      return setError('All Fields are required!');
    }
    setError('');
    setSubmitting(true);
    setDisableSocial(true);
    return signup(data);
  };

  // SOCIAL LOGIN
  const handleSocial = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const user = result.user;
        const firstname = user.displayName.slice(
          0,
          user.displayName.indexOf(' ')
        );
        const lastname = user.displayName.slice(
          user.displayName.indexOf(' ') + 1,
          user.displayName.length
        );
        const email = user.email;
        const fam =
          lastname.length <= 6
            ? lastname.replace(/\s/g, '_')
            : lastname.replace(/\s/g, '_').slice(0, 6);
        const giv =
          firstname.length <= 6
            ? firstname.replace(/\s/g, '_')
            : firstname.replace(/\s/g, '_').slice(0, 6);
        const data = {
          firstname: giv,
          lastname: fam,
          email,
        };

        setError('');
        setLogging(true);
        setDisableLogin(true);
        return socialAction(data);
      })
      .catch(function (error) {
        if (
          error.code === 'auth/popup-closed-by-user' ||
          error.code === 'auth/cancelled-popup-request'
        ) {
          return setError('Login popup closed!');
        }

        if (error.code === 'auth/popup-blocked') {
          return setError('Popup blocked by the browser!');
        }
        setError('Unexpected error occured, Please try again later!');
        setLogging(false);
        setDisableLogin(false);
      });
  };

  return (
    <div className="wrapper gradient_bg">
      <div className="container-fluid ">
        <div className="form-div gradient_bg">
          <div
            className="form-content "
            style={{ backgroundColor: '#fafafa', borderRadius: 20 }}
          >
            <div className="row centered">
              <div className="col-md-7 col-lg-7 col-12 col-sm-12">
                <Logo />
                <form className="user-form  px-5">
                  <span className=" text-font-4  lead font-weight-bolder ">
                    Sign Up
                  </span>
                  <div className="form-group mt-3">
                    <div className="row mb-1">
                      <div className="col col-sm-12 col-lg-6 centered col-12">
                        <span className="text-secondary text-font-15">
                          First Name
                        </span>
                        <input
                          type="text"
                          className="form-control no-shadow"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="col col-sm-12 col-lg-6 centered col-12">
                        <span className="text-secondary text-font-15">
                          Last Name
                        </span>
                        <input
                          type="text"
                          className="form-control no-shadow"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-1">
                      <div className="col col-sm-12 col-lg-6 centered col-12">
                        <span className="text-secondary text-font-15">
                          Email
                        </span>
                        <input
                          type="text"
                          className="form-control no-shadow"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="col col-sm-12 col-lg-6 centered col-12">
                        <span className="text-secondary text-font-15">
                          Username
                        </span>
                        <input
                          type="text"
                          className="form-control no-shadow"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-1">
                      <div className="col col-sm-12 col-lg-6 centered col-12">
                        <span className="text-secondary text-font-15">
                          Password
                        </span>
                        <div className="input-group">
                          <input
                            type={isPasswordShown ? 'text' : 'password'}
                            className="form-control no-shadow"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text append-style cursor-pointer font-weight-bold"
                              onClick={showLoginPassword}
                            >
                              {togglEye}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col col-sm-12 col-lg-6 centered col-12">
                        <div className="custom-control pt-4 custom-radio custom-control-inline">
                          <input
                            type="checkbox"
                            className="custom-control-input custom-signup-radio"
                            id="check"
                            name="textRadio"
                            onChange={() => {
                              if (checked === true) setChecked(false);
                              else setChecked(true);
                            }}
                          />
                          <label
                            className="custom-control-label custom-signup-label text-secondary d-block text-font-15"
                            htmlFor="check"
                          >
                            By signing up you agree to our terms and privacy
                            policy.
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {error ? (
                    <p className="text-danger text-center font-weight-bold text-font-15">
                      {error}
                    </p>
                  ) : null}
                  <div className="row mt-4">
                    <div className="col col-sm-12 col-12 col-lg-5 mr-2">
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
                            className="btn overflow-hidden btn-warning form-control py-1 font-weight-bold text-font-15"
                            type="button"
                            onClick={handleSubmit}
                            disabled={!!disableLogin}
                          >
                            Sign Up
                          </button>
                        )}
                      </div>
                    </div>
                    <span className=" or  pt-2 text-center text-secondary font-weight-bold text-font-15">
                      Or
                    </span>
                    <div className="mr  col col-sm-12  col-lg-6 col-12 mr-3">
                      <button
                        onClick={handleSocial}
                        className="pr btn google overflow-hidden btn-danger text-white font-weight-bold no-shadow smooth-transition text-font-15 form-control py-1"
                        disabled={!!disableSocial || logging}
                        type="button"
                      >
                        {logging ? (
                          <span className="spinner-border spinner-border-sm d-block mx-auto" />
                        ) : (
                          <>
                            <FontAwesomeIcon
                              icon={['fab', 'google']}
                              className="mr-2 google-icon"
                            />
                            Sign In with Google
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="mb-2 py-">
                    <span
                      className="text-dark font-weight-bold text-font-15 mr-2"
                      style={{ color: '#000000' }}
                    >
                      Have an account?
                    </span>
                    <Link
                      to="/accounts/login"
                      className="font-weight-bold text-warning text-font-15"
                    >
                      Log in
                    </Link>
                  </div>
                </form>
              </div>
              <div className="col-4 col-sm-12 col-md-5  cl-lg-4 hideimage">
                <img
                  src={SignupCover}
                  className={error ? 'signup' : 'signup-cover'}
                  alt="Signup Cover"
                  style={{ borderRadius: '0 20px 20px 0' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  socialLoginAction: PropTypes.func.isRequired,
  socialLogin: PropTypes.objectOf(PropTypes.any).isRequired,
  signupAction: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ user, socialLogin }) => ({ user, socialLogin });

export default connect(mapStateToProps, { signupAction, socialLoginAction })(
  SignUp
);
