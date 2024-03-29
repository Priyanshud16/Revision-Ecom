import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Products from '../pages/Products'
import ProductPage from '../pages/ProductPage'
import PrivateRoutes from './PrivateRoutes'
function AllRoutes() {
  return (
    <Routes>
    <Route path='/' element={ 
    <PrivateRoutes>
     <Home/>
    </PrivateRoutes>
    }/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/products' element={
    <PrivateRoutes>
    <Products/>
    </PrivateRoutes>
    }/>
    <Route path='/products/:product_id' element={
    <PrivateRoutes>
 <ProductPage/>
    </PrivateRoutes>
   }/>
   

    </Routes>
  )
}

export default AllRoutes