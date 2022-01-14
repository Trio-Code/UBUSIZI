/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideBar from '../../components/AdminSidebar';
import Table from '../../components/tables/AccountReports';
import DisplayError from '../../components/DisplayError';
import Loader from '../../components/Loader';
import fetchAcoutReportAction from '../../redux/actions/admin/fetchAcountReports';

const ViewAccountReports = ({ fetchAcoutReportAction: reportAction, fetchAcountReports }) => {
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

      if (fetchAcountReports.status === 'success') {
        setResultData(fetchAcountReports.data);
        setStatus('success');
      }
    }

    if (fetchAcountReports.status === 'error') {
      const { error } = fetchAcountReports;
      if (error.status === 404) {
        return setStatus('no_data');
      }
      if (error.status === 500) {
        return setStatus('network_error');
      }
      setStatus('unknown_error');
    }
    return undefined;
  }, [fetchAcountReports]);

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
            desc="No  Account Report added to the database yet!"
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
              All Reported Accounts
            </h4>
            <div className="container-fluid mt-5">
              <DisplayData>
                <Table data={resultData} />
              </DisplayData>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
ViewAccountReports.propTypes = {
  fetchAcoutReportAction: PropTypes.func.isRequired,
  fetchAcountReports: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ fetchAcountReports }) => ({ fetchAcountReports });

export default connect(mapStateToProps, { fetchAcoutReportAction })(ViewAccountReports);
