import React, { useState, useEffect } from 'react';
import UserNavbar from '../../components/UserNavbar';
import NavBar from '../../components/NavBar';
import ChangePassword from '../../components/ChangePassword';

const ChangePasswordView = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loggedInData, setLoggedInData] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('UBUSIZI_USER_TOKEN');
    const userData = JSON.parse(localStorage.getItem('UBUSIZI_USER_DATA'));
    if (!userToken || !userData) {
      setIsLoggedIn(false);
    } else {
      setLoggedInData(userData);
    }
    return undefined;
  }, []);

  return (
    <div className="wrapper bg-white">
      {isLoggedIn ? <UserNavbar data={loggedInData} /> : <NavBar />}
      <div className="container container-fluid change-cont">
        <div className="body-content row align-items-center justify-content-center">
          <div className="col-md-8 bg-white">
            <div className="separator" />
            <ChangePassword info={loggedInData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordView;
