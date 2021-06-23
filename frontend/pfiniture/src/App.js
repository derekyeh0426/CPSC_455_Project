import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import LogInForm from './components/login/LogInForm'
import RegistrationForm from './components/registration/RegistrationForm'
import About from './components/about/About'
import { Nav } from 'react-bootstrap'
import React from 'react'
import Landing from './pages/Landing'
import Dashboard from "./components/my-account/Dashboard"
import Navbar from "./components/Navbar";

function App() {
  return (
      <div>
        <Navbar/>
        <LogInForm />
        <RegistrationForm />
        <About />
        <Landing />
        <Dashboard></Dashboard>
      </div>
  )
}

export default App
