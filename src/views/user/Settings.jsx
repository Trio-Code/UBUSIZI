import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Settings from '../../components/Settings';
import UserNavbar from '../../components/UserNavbar';
import BottomNav from '../../components/BottomNav';

const SettingsView = () => {
  const history = useHistory();
  const [loggedInData, setLoggedInData] = useState({});

  useEffect(() => {
    const userToken = localStorage.getItem('UBUSIZI_USER_TOKEN');
    const userData = localStorage.getItem('UBUSIZI_USER_DATA');

    if (!userToken || !userData) {
      return history.push('/accounts/login');
    }
    setLoggedInData(JSON.parse(userData));

    return undefined;
  }, []);

  return (
    <div className="wrapper">
      <div className="move-settings-top">
        <UserNavbar data={loggedInData} />
        <BottomNav data={loggedInData} />
        <div className="separator" />
        <div className="settings-wrapper row justify-content-center align-content-center settings-nav">
          <div className="row justify-content-center align-content-center">
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
