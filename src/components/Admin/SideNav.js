import React from 'react';
import './sidenav.css'
import { Link } from 'react-router-dom';
import AppsIcon from '@material-ui/icons/Apps';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const SideNav = () => {
    return (
        <div className="side-nav">
        <Link to="/admin" className="side-nav-item">
          <AppsIcon />  Manage Product
        </Link>
        <Link to="/addProduct" className="side-nav-item">
          <AddIcon />  Add Product
        </Link>
        <Link to="addAdmin" className="side-nav-item">
          <SupervisorAccountIcon />  Add Admin
        </Link>
        <Link to="#/" onClick={() => alert('Error its not write way')} className="side-nav-item">
          <EditIcon />  Edit Product
        </Link>
      </div>
    );
};

export default SideNav;