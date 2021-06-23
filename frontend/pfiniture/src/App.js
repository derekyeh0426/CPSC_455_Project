import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import LogInForm from './components/login/LogInForm'
import RegistrationForm from './components/registration/RegistrationForm'
import About from './components/about/About'
import React from 'react'
import Landing from './pages/Landing'
import Dashboard from "./components/my-account/Dashboard"
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"

function App() {
  return (
      <BrowserRouter>
        <Navbar/>
        <Route path="/" component={Landing}/>
        <Route path="/about" component={About}/>
        <Route path="/my-account" component={Dashboard}/>
      </BrowserRouter>
  )
}

export default App
