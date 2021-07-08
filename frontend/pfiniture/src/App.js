import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import LogInForm from './components/login/LogInForm'
import RegistrationForm from './components/registration/RegistrationForm'
import About from './components/about/About'
import React from 'react'
import Landing from './pages/Landing'
import Dashboard from "./components/my-account/Dashboard"
import MyFurnitures from "./components/my-account/MyFurnitures"
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {

  return (
    <Provider store = {store}>
    <div>
      <BrowserRouter>
        <Navbar/>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/my-account/dashboard" component={Dashboard}/>
        <Route exact path="/my-account/my-furnitures" component={MyFurnitures}/>
      </BrowserRouter>
    </div>
    </Provider>
  )
}




export default App
