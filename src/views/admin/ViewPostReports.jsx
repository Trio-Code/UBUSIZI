import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideBar from '../../components/AdminSidebar';
import Card from '../../components/cards/PostReportCard';
import DisplayError from '../../components/DisplayError';
import Loader from '../../components/Loader';
import fetchPostReportAction from '../../redux/actions/admin/postReports';

const ViewPostReports = ({ fetchPostReportAction: reportAction, postReports }) => {
  const history = useHistory();
  const [resultData, setResultData] = useState([]);
  const [status, setStatus] = useState('initial');

  useEffect(() => {
    const adminToken = localStorage.getItem('UBUSIZI_ADMIN_TOKEN');

    if (!adminToken) {
      history.push('/admin/login');
    }
    if (status === 'initial') {
      reportAction();

      if (postReports.status === 'success') {
        setResultData(postReports.data);
        setStatus('success');
      }
    }

    if (postReports.status === 'error') {
      const { error } = postReports;
      if (error.status === 404) {
        return setStatus('no_data');
      }
      if (error.status === 500) {
        return setStatus('network_error');
      }
      setStatus('unknown_error');
    }
    return undefined;
  }, [postReports]);
  const DisplayData = ({ children }) => {
    let datas;
    switch (status) {
      case 'success':
        datas = <>{children}</>;
        break;
      case 'initial':
        datas = <Loader marginTop="20%" />;
        break;
      case 'no_data':
        datas = (
          <DisplayError
            title="No Data Found!"
            desc="No Post Report added to the database yet!"
            marginTop="20%"
          />
        );
        break;
      case 'network_error':
        datas = (
          <DisplayError
            title="No Internet Connection!"
            desc="Your network is slow / down, please try again later!"
            marginTop="20%"
          />
        );
        break;

      case 'unknown_error':
        datas = (
          <DisplayError
            title="Unexpected Error!"
            desc="Oops! Something unexpected occured, please try again later."
            marginTop="20%"
          />
        );
        break;

      default:
        datas = <Loader marginTop="20%" />;
        break;
    }
    return datas;
  };
  return (
    <div className="wrapper" style={{ backgroundColor: '#f6f5fa' }}>
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <main
            role="main"
            className="col-md-9 ml-sm-auto col-lg-10 main-content pb-4"
            style={{ backgroundColor: '#f6f5fa' }}
          >
            <h4 className=" font-weight-bold mt-4" style={{ fontSize: 18 }}>
              All Reported Posts
            </h4>
            <div className="container-fluid mt-5">
              <DisplayData>
                <Card data={resultData} />
              </DisplayData>

            </div>
          </main>
        </div>
      </div>
    </div>

  );
};
ViewPostReports.propTypes = {
  fetchPostReportAction: PropTypes.func.isRequired,
  postReports: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ postReports }) => ({ postReports });

export default connect(mapStateToProps, { fetchPostReportAction })(ViewPostReports);
