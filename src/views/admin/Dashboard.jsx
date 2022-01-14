import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SideBar from '../../components/AdminSidebar';
import Card from '../../components/cards/ReportCard';

const Dashboard = () => {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('UBUSIZI_ADMIN_TOKEN')) {
      return history.push('/admin/login');
    }

    return undefined;
  });
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
            <div className="container-fluid text-light-icon p-2 rounded-bottom" style={{ backgroundColor: '#343a40' }}>
              <h1
                className=" font-weight-bold text-success"
                style={{ fontSize: 25 }}
              >
                Overview
              </h1>
              <p>View total of all reports</p>
            </div>
            <div className="container-fluid mt-5">
              <div className="row">
                <Card
                  title="All Posts Reported"
                  count={undefined}
                />
                <Card
                  title="All Accounts Reported"
                  count={undefined}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
