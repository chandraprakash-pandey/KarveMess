import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route , RouterProvider } from "react-router-dom" 
import Layout from './Layout.jsx'
import Home from './Home/Home.jsx'
import Login from './Login/Login.jsx'
import Signup from './Signup/Signup.jsx'
import User from './User/User.jsx'
import Menu from './Menu/Menu.jsx'
import FoodForm from './FoodForm/FoodForm.jsx'
import EditItem from './EditItem/EditItem.jsx'
import Subs from './subscription/subs.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='Login' element={<Login/>}/>
      <Route path='Signup' element={<Signup/>}/>
      <Route path='User' element={<User/>}/>
      <Route path='foodform' element={<FoodForm/>}/>
      <Route path='Menu' element={<Menu/>}/>
      <Route path=':foodItemId' element={<EditItem/>}/>
      <Route path='subscription' element={<Subs/>}/>
      
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
