import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DisplayError from '../../components/DisplayError';
import Loader from '../../components/Loader';
import Error from '../../components/usage/Error';
import VerifyAcountAction from '../../redux/actions/user/verify';

const Verify = ({ VerifyAcountAction: verifyAction, verify, location }) => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [status, setStatus] = useState('initial');
  useEffect(() => {
    const verifying = location.search.indexOf('?token') !== -1;
    const urlToken = location.search.slice(
      location.search.indexOf('?token=') + 7,
      location.search.length
    );
    if (!verifying) {
      return history.push('/accounts/login');
    }
    if (status === 'initial') {
      verifyAction(urlToken);
      setStatus('fetching');
    }
    if (verify.status === 'verify_account_success') {
      setStatus('success');
      setTitle(' Account verified ');
      setDescr('Your account was  Verified successfuly ');
    }
    if (verify.status === 'verify_account_error') {
      const { error } = verify;
      if (error.status === 400) {
        return setStatus('conflict error');
      }
      if (error.status === 500) {
        return setStatus('network_error');
      }
      setStatus('unknown_error');
    }
    return undefined;
  }, [verify]);
  const DisplayData = ({ children }) => {
    let data;
    switch (status) {
      case 'success':
        data = <>{children}</>;
        break;
      case 'no_data':
        data = (
          <DisplayError
            title="conflict error!"
            desc="Invalid Token"
            marginTop="20%"
          />
        );
        break;
      case 'fetching':
        data = (
          <>
            <Loader marginTop="35%" />
          </>
        );
        break;
      case 'network_error':
        data = (
          <DisplayError
            title="No Internet Connection!"
            desc="Your network is slow / down, please try again later!"
            marginTop="20%"
          />
        );
        break;
      case 'unknown_error':
        data = (
          <DisplayError
            title="Unexpected Error!"
            desc="Oops! Something unexpected occured, please try again later."
            marginTop="20%"
          />
        );
        break;
      default:
        data = <Loader marginTop="20%" />;
        break;
    }
    return data;
  };
  return (
    <div className="success-page">
      <DisplayData>
        <Error
          title={title}
          description={descr}
          icon="check-circle"
          marginTop="0"
        />
        <Link
          to="/accounts/login"
          className="btn btn-secondary font-weight-bold text-white mt-4 px-4"
          style={{ fontSize: 14, borderRadius: 20 }}
        >
          Go To Login
        </Link>
      </DisplayData>
    </div>
  );
};
Verify.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  VerifyAcountAction: PropTypes.func.isRequired,
  verify: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = ({ verify }) => ({ verify });
export default connect(mapStateToProps, { VerifyAcountAction })(Verify);
