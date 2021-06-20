import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import LogInForm from './components/login/LogInForm'
import RegistrationForm from './components/registration/RegistrationForm'
import About from './components/about/About'
import React from 'react'
import Landing from './pages/Landing'
import Dashboard from "./components/my-account/Dashboard"
import {BrowserRouter, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"

function App() {
  return (
      <BrowserRouter>
        <Navbar/>
        <Route path="/" component={LogInForm}/> 
        <Route path="/register" component={RegistrationForm}/>
        <Route path="/about" component={About}/>
        <Route path="/home" component={Landing}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/my-account" />
      </BrowserRouter>    
  )
}

export default App
