import React from 'react'
import Base from '../core/Base'
import { isauthenticate } from '../auth/helper'
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {
  const {
    user : {name,email,role}
  } = isauthenticate();

const adminleftside = () => {
  return(
    <div className="card">
      <div class="card-body">
       <h4 className="card-title bg-dark text-white">
        Admin
      </h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link 
          to='/admin/create/category'
          className='nav-link text-success'>
            Create Categories
          </Link>
          </li>
          <li className="list-group-item">
          <Link 
          to='/admin/categories'
          className='nav-link text-success'>
            Manage Categories
          </Link>
          </li>
          <li className="list-group-item">
          <Link 
          to='/admin/create/product'
          className='nav-link text-success'>
            Create Product
          </Link>
          </li>
          <li className="list-group-item">
          <Link 
          to='/admin/products'
          className='nav-link text-success'>
            Manage Product
          </Link>
          </li>
          <li className="list-group-item">
          <Link 
          to='/admin/orders'
          className='nav-link text-success'>
            Manage Orders
          </Link>
          </li> 
      </ul>
      </div>
    </div>
  )
}

const adminrightside = () => {
  return(
   <div className="card mb-7">
    <div class="card-body">
    <h4 className="card-title">Admin Info</h4>
    <ul className="list-group">
      <li className="list-group-item">
       <span className="badge bg-success mr-2">Name:</span>
         <span >  {name}</span> 
      </li>
      <li className="list-group-item">
       <span className="badge bg-success mr-2">Email:</span>
       <span>  {email}</span> 
      </li>
      <li className="list-group-item">
       <span className="badge bg-danger mr-2">Admin Area</span>
      </li>
    </ul>
   </div>
   </div>
  )
}

  return (
    <Base title='Welcome to admin dashboard'
    className='container bg-success p-4'>
    <div className="row">
      <div className="col-3"> {adminleftside()}</div>
      <div className="col-9"> {adminrightside()}</div>
    </div>
   </Base>
  )
}

export default AdminDashBoard