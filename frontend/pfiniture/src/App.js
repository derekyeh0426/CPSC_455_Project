import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import About from './components/about/About'
import React from 'react'
import Landing from './pages/Landing'
import Cart from './pages/Cart'
import MyAccountDisplay from "./components/my-account/MyAccountDisplay"
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar'
import { Provider } from 'react-redux'
import store from './redux/store'
import {NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';

export default function App() {
  return (
    <Provider store = {store}>
    <div>
      <BrowserRouter>
        <Navbar/>
        <NotificationContainer/>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/my-account" component={MyAccountDisplay}/>
        <Route exact path="/cart" component={Cart} />
      </BrowserRouter>
    </div>
    </Provider>
  )
}