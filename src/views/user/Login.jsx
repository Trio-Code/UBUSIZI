/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../components/usage/Logo';
import loginAction from '../../redux/actions/user/login';
import socialLoginAction from '../../redux/actions/user/socialLogin';
import loginCover from '../../assets/images/loginCover.jpg';

const Login = ({
  loginAction: signin,
  socialLoginAction: socialAction,
  socialLogin,
  login,
}) => {
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setPasswordShow] = useState(false);
  const [disableSocial, setDisableSocial] = useState(false);
  const [disableLogin, setDisableLogin] = useState(false);
  const [logging, setLogging] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('UBUSIZI_USER_TOKEN')) {
      return history.push('/');
    }

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

    if (login.status === 'user_login_success') {
      setSubmitting(false);
      setUsername('');
      setPassword('');
      localStorage.setItem('UBUSIZI_USER_TOKEN', login.token);
      localStorage.setItem('UBUSIZI_USER_PIC', login.results.picture);
      localStorage.setItem('UBUSIZI_USER_ID', login.id);
      localStorage.setItem('UBUSIZI_USER_DATA', JSON.stringify(login.results));
      return window.location.replace('/');
    }

    if (login.status === 'user_login_error') {
      setSubmitting(false);
      setDisableSocial(false);
      return setError(login.error.message);
    }

    // SOCIAL LOGIN

    if (socialLogin.status === 'social_login_success') {
      setLogging(false);
      setDisableLogin(false);
      setUsername('');
      setPassword('');
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
  }, [login, socialLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      account: username,
      password,
    };

    if (!username || !password) {
      return setError('All fields are Required');
    }

    setError('');
    setSubmitting(true);
    setDisableSocial(true);
    return signin(data);
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

        const data = {
          firstname,
          lastname,
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

  const togglEye = isPasswordShown ? 'Hide' : 'Show';

  const showLoginPassword = () => {
    setPasswordShow(!isPasswordShown);
  };

  return (
    <div className="wrapper gradient_bg">
      <div className="container-fluid ">
        <div className="form-div gradient_bg">
          <div
            className="form-content mtop "
            style={{ backgroundColor: '#fafafa', borderRadius: 20 }}
          >
            <div className="row centered">
              <div className="col-md-7 col-lg-7 col-12 col-sm-12 py-3">
                <Logo />

                <form className="user-form mt-4 px-5">
                  <span className=" btnmargin pl- text-font-4 ml-md-  mt-5 lead font-weight-bolder ">
                    Log In
                  </span>
                  <div className="form-group mt-3">
                    <div className="row">
                      <div className="col col-sm-12 col-lg-6 centered col-12">
                        <span className="text-secondary text-center centered text-font-15">
                          Username or E-mail
                        </span>
                        <input
                          type="text"
                          className="form-control no-shadow"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="col col-sm-12 centered col-lg-6 col-12">
                        <span className="text-secondary centered text-font-15">
                          Password
                        </span>
                        <div className="input-group">
                          <input
                            type={isPasswordShown ? 'text' : 'password'}
                            className="form-control no-shadow"
                            onChange={(e) => setPassword(e.target.value)}
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
                    </div>
                  </div>
                  {error ? (
                    <p className="text-danger text-center font-weight-bold text-font-15">
                      {error}
                    </p>
                  ) : null}
                  <div className="row mt-4 centered ">
                    <div className="col col-sm-12 col-12 col-lg-5 btnmargin  mr-md-2">
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
                            className="btn btn-warning overflow-hidden text-white form-control font-weight-bold text-font-15"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={!!disableLogin}
                          >
                            Log In
                          </button>
                        )}
                      </div>
                    </div>
                    <span className=" or  pt-2  text-center text-secondary font-weight-bold text-font-15">
                      Or
                    </span>
                    <div className=" mr  col col-sm-12  col-lg-6 col-12 btnmargin  mr-lg-3 mr-md-3">
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
                  <Link
                    to="/users/password/reset"
                    className=" text-secondary centered  text-font-15 forgot-pass-link"
                  >
                    Forgot Password?
                  </Link>
                  <div className=" py-3 centered  mt-3">
                    <span
                      className="text-dark font-weight-bold text-font-15 mr-2"
                      style={{ color: '#000000' }}
                    >
                      Don&#39;t have an account?
                    </span>
                    <Link
                      to="/accounts/signup"
                      className="font-weight-bold block text-warning text-font-15"
                    >
                      Sign up here
                    </Link>
                  </div>
                </form>
                <div className="mb-5" />
              </div>
              <div className="col-4 col-sm-12 col-md-5  cl-lg-4 hideimage">
                <img
                  src={loginCover}
                  className={error ? 'login-cover-long' : 'login-cover'}
                  alt="Login Cover"
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

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  login: PropTypes.objectOf(PropTypes.any).isRequired,
  socialLoginAction: PropTypes.func.isRequired,
  socialLogin: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ login, socialLogin }) => ({ login, socialLogin });

export default connect(mapStateToProps, { loginAction, socialLoginAction })(
  Login
);
