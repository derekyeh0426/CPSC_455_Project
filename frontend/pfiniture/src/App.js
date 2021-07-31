import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import About from './components/about/About'
import React from 'react'
import Landing from './pages/Landing'
import MyAccountDisplay from "./components/my-account/MyAccountDisplay"
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import { Provider } from 'react-redux'
import store from './redux/store'
import CheckOut from './components/payment/CheckOut'
import GoogleLogin from './components/login/GoogleLogIn'

export default function App() {
  return (
    <Provider store = {store}>
    <div>
      <BrowserRouter>
        <CheckOut/>
        <GoogleLogin/>
        <Navbar/>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/my-account" component={MyAccountDisplay}/>
      </BrowserRouter>
    </div>
    </Provider>
  )
}