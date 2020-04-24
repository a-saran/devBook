import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './styles/style.scss';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import PrivateRoute from './components/routing/PrivateRoute';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Alert />
          <Switch>
            <Route exact path='/login' component={withContainer(Login)} />
            <Route exact path='/register' component={withContainer(Register)} />
            <Route exact path='/profiles' component={withContainer(Profiles)} />
            <Route exact path='/profile/:id' component={withContainer(Profile)} />
            <PrivateRoute exact path='/my-profile' component={withContainer(Dashboard)} />
            <PrivateRoute exact path='/create-profile' component={withContainer(CreateProfile)} />
            <PrivateRoute exact path='/edit-profile' component={withContainer(EditProfile)} />
            <PrivateRoute exact path='/add-experience' component={withContainer(AddExperience)} />
            <PrivateRoute exact path='/add-education' component={withContainer(AddEducation)} />
            <PrivateRoute exact path='/posts' component={withContainer(Posts)} />
            <PrivateRoute exact path='/post/:id' component={withContainer(Post)} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}


const withContainer = (Comp) => {
  const newComp = () => (
    <section className="container">
      <Comp />
    </section>
  )
  return newComp
}

export default App;
