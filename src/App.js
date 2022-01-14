import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import store from './redux/store';
import AdminLogin from './views/admin/Login';
import Dashboard from './views/admin/Dashboard';
import FetchPostReport from './views/admin/ViewPostReports';
import FetchAccountReport from './views/admin/ViewAccountReports';
import Home from './views/user/Home';
import AddNewPost from './views/user/AddPost';
import ProceedTxt from './views/user/ProceedText';
import ProceedVid from './views/user/ProceedVideo';
import ProceedImage from './views/user/ProceedImg';
import Login from './views/user/Login';
import SignUp from './views/user/SignUp';
import ChangePassword from './views/user/ChangePassword';
import Search from './views/search/Search';
import EditProfile from './views/user/EditProfile';
import Profile from './views/user/Profile';
import ResetPassword from './views/user/ResetPassword';
import ForgotPassword from './views/user/ForgotPassword';
import SettingsView from './views/user/Settings';
import ViewPost from './views/user/ViewPost';
import Success from './views/Success';
import NotFound from './views/NotFound';
import Verify from './views/user/Verify';
import PostsReport from './views/report/ReportPost';
import AccountReport from './views/report/AccountReport';
import VerificationRequest from './views/user/VerificationRequest';
import SearchCategory from './views/search/SearchCategory';
import Activity from './views/user/Notification';

library.add(fab, fas);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {/* USERS */}
          <Route exact path="/" component={Home} />
          <Route exact path="/accounts/login" component={Login} />
          <Route exact path="/accounts/signup" component={SignUp} />
          <Route exact path="/add-post" component={AddNewPost} />
          <Route exact path="/add-post/proceed/text" component={ProceedTxt} />
          <Route exact path="/add-post/proceed/video" component={ProceedVid} />
          <Route
            exact
            path="/add-post/proceed/image"
            component={ProceedImage}
          />
          <Route exact path="/:username" component={Profile} />
          <Route exact path="/users/password/new" component={ResetPassword} />
          <Route
            exact
            path="/users/password/reset"
            component={ForgotPassword}
          />
          <Route
            exact
            path="/users/edit/change-password"
            component={ChangePassword}
          />
          <Route exact path="/users/edit/profile" component={EditProfile} />
          <Route exact path="/user/settings" component={SettingsView} />
          <Route
            exact
            path="/verification/request"
            component={VerificationRequest}
          />

          {/* Settings */}
          <Route
            exact
            path="/settings/change-password"
            component={ChangePassword}
          />
          <Route exact path="/settings/profile" component={EditProfile} />

          {/* SEARCH */}
          <Route exact path="/user/search" component={Search} />

          {/* Social */}
          <Route exact path="/account/activity" component={Activity} />
          {/* SUCCESS */}
          <Route exact path="/user/success" component={Success} />
          <Route exact path="/user/verify" component={Verify} />

          {/* ADMIN */}
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route exact path="/admin/home" component={Dashboard} />
          <Route
            exact
            path="/admin/reports/posts"
            component={FetchPostReport}
          />
          <Route
            exact
            path="/admin/reports/accounts"
            component={FetchAccountReport}
          />

          {/* POST */}
          <Route exact path="/post/:postId" component={ViewPost} />

          {/* REPORT */}
          <Route
            exact
            path="/report/account/:userId"
            component={AccountReport}
          />

          {/* REPORT */}
          <Route exact path="/post/:postId/report" component={PostsReport} />

          {/* SEARCH BY CATEGORY */}
          <Route exact path="/posts/categories" component={SearchCategory} />

          {/* 404 */}
          <Route exact path="/*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
