/*
* Title: Fresh Valley Client
* Description: This is a very simple project. There are some common rest API & simple design. Given assignments from this  project programming hero team.
* Author: Munna Islam
* Date: 05/12/21
*/

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import ResponsiveDrawer from './components/Admin/Admin';
import SignIn from './components/Auth/Login/Login';
import SignUp from './components/Auth/SignUp/SignUp';
import { createContext, useEffect, useState } from 'react';
import Order from './components/Order/Order';
import User from './components/User/User';
import PrivateRoute from './components/Auth/PrivateRoute/PrivateRoute';
import AddProduct from './components/Admin/AddProduct';
import AddAdmin from './components/Admin/AddAdmin';
import EditProduct from './components/Admin/EditProduct';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})


  useEffect(() =>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if( userInfo ) {
      setLoggedInUser(userInfo)
    }
  }, [])

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <NavBar />
      <Switch>
        <Route exact  path="/">
          <Home />
        </Route>
        <PrivateRoute path="/admin">
          <ResponsiveDrawer />
        </PrivateRoute>
        <Route path="/login">
          <SignIn />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <PrivateRoute path="/order">
          <Order />
        </PrivateRoute>
        <PrivateRoute path="/user">
          <User />
        </PrivateRoute>
        <PrivateRoute path="/addProduct">
          <AddProduct />
        </PrivateRoute>
        <PrivateRoute path="/addAdmin">
          <AddAdmin />
        </PrivateRoute>
        <PrivateRoute path="/editProduct/:id">
          <EditProduct />
        </PrivateRoute>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
