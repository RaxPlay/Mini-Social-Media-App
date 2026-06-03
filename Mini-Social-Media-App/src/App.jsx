import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import axios from 'axios'
import { NavBar } from './components/v-navbar'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Signup } from './pages/signup'
import { Profile } from './pages/other-profiles'

axios.defaults.withCredentials = true;

export const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const getUser = async() => {
      try {
        const res = await axios.get("/api/auth/me");
        setUser(res.data);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false)
      }
    }

    getUser();
  }, [])

  if(isLoading){
    return <div className="text-center">Loading</div>
  }

  return (
    <Router>

      <NavBar user={user} setUser={setUser}/>

      <Routes>
        <Route path='/home' element={<Home user={user} setUser={setUser}/>}/>
        <Route path='/profile/:user_name' element={<Profile/>}/>
        <Route path='/login' element={<Login user={user} setUser={setUser}/>}/>
        <Route path='/signup' element={<Signup user={user} setUser={setUser}/>}/>
        <Route path="/*" element={<Navigate to="/home"/>}></Route>  
      </Routes>
    </Router>
  )
}
