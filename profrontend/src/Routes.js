import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import AdminRoutes from './auth/helper/AdminRoutes'
import PrivateRoutes from './auth/helper/PrivateRoutes'
import UserDashBoard from './user/UserDashBoard'
import AdminDashBoard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import ManageCategories from './admin/ManageCategories'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import Cart from './core/Cart'

const MyRoutes =() => {
    
  return (
    <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Home}/>
      <Route path='/signup' eact component={Signup}/>
      <Route path='/signin' exact component={Signin}/>
      <Route path='/cart' exact component={Cart}/>
      <PrivateRoutes path='/user/dashboard' exact component={UserDashBoard} />
      <AdminRoutes path='/admin/dashboard' exact component={AdminDashBoard} />
      <AdminRoutes path='/admin/create/category' exact component={AddCategory} />
      <AdminRoutes path='/admin/categories' exact component={ManageCategories} />
      <AdminRoutes path='/admin/create/product' exact component={AddProduct} />
      <AdminRoutes path='/admin/products' exact component={ManageProducts} />
      <AdminRoutes
       path='/admin/product/update/:productId' 
       exact 
       component={UpdateProduct} />
    </Switch>
    </BrowserRouter>
  )
}

export default MyRoutes