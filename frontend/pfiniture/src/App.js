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
import client from "../src/API/api"

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
      <BrowserRouter>
        <Navbar/>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/my-account" component={Dashboard}/>
      </BrowserRouter>
  )
}




export default App
