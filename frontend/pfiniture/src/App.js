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
import client from "../src/API/api"
import GoogleLogIn from './components/login/GoogleLogIn'


// this is for testing endpoints from the api
function testFunction(){
  const test = {
    name: "dummy data",
    price: 1
  }

  const test2 = {
    id:2,
    name: 1,
    price: 1
  }

  const testUser = {
    name: "Derek",
    email: "derekyeh0426@gmail.com"
  }

  client.user.addUsers(testUser).then(res => {
    console.log(res.data);
  });
}

function App() {

  return (
    <div>
      <button onClick={testFunction}>Test API end points</button>
      <Navbar />
      <LogInForm />
      <GoogleLogIn/>
      <RegistrationForm />
      <About />
      <Landing />
      <Dashboard></Dashboard>
    </div>
  )
}




export default App
